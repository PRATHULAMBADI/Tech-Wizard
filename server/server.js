require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const BootcampWorkshopUser = require("./models/BootcampWorkshopUser");
const BootcampWorkshopOrganizer = require("./models/BootcampWorkshopOrganizer");
const BootcampWorkshopProgram = require("./models/BootcampWorkshopProgram");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const url =
  "mongodb+srv://iamprathul:6ccjcZTZkrch88pw@cluster0.vybziis.mongodb.net/bootcamp-workshop-database";
const multer = require("multer");
const path = require("path");
const authenticateToken = require("./middleware/authenticateToken");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const PORT = 3000;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/", express.static("uploads"));

// Mongoose configuration
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// NodeMailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "secoundarymailid@gmail.com",
    pass: "qout sqqy pmsu iljk",
  },
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("WelcomePage");
});

//----------------------------------------------Chart------------------------------------//

app.get("/api/programCounts", async (req, res) => {
  try {
    // Fetch program counts from the database
    const seminarCount = await BootcampWorkshopProgram.countDocuments({
      programType: "Seminar",
    });
    const workshopCount = await BootcampWorkshopProgram.countDocuments({
      programType: "Workshop",
    });
    const bootcampCount = await BootcampWorkshopProgram.countDocuments({
      programType: "Bootcamp",
    });

    const usersCount = await BootcampWorkshopUser.countDocuments({});
    const organizerCount = await BootcampWorkshopOrganizer.countDocuments({});

    console.log(usersCount);
    console.log(organizerCount);

    // Send the program counts as JSON response with correct content type header
    res.setHeader("Content-Type", "application/json");
    res.json({
      seminarCount,
      workshopCount,
      bootcampCount,
      usersCount,
      organizerCount,
    });
  } catch (error) {
    console.error("Error fetching program counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//----------------------------------------------Users------------------------------------//

app.get("/user-getData", async (req, res) => {
  const userDetails = await BootcampWorkshopUser.find();
  res.status(200).json(userDetails);
});
app.post("/user-login", async (req, res) => {
  try {
    const user = await BootcampWorkshopUser.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ auth: false, message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ auth: false, message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, jwtSecret, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ auth: true, token: token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/user-logout", (req, res) => {
  res.redirect("/login");
});

app.post("/user-signup", async (req, res) => {
  try {
    const existingOrganizerEmail = await BootcampWorkshopUser.findOne({
      email: req.body.email,
    });
    const existingOrganizerMobile = await BootcampWorkshopUser.findOne({
      mobile: req.body.mobile,
    });
    if (existingOrganizerEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingOrganizerMobile) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newBootcampWorkshopUser = new BootcampWorkshopUser({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: hashedPassword,
    });
    await newBootcampWorkshopUser.save();
    res.status(200).json({ errorMessage: "User registered successfully" });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/user-resetPasswordRequest", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await BootcampWorkshopUser.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    const resetLink = `http://localhost:5173/user-resetPassword/${resetToken}/${encodeURIComponent(
      email
    )}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    return res.status(200).json({
      waitmessage: "Request is processing, Please wait.",
      message: "Password reset link sent successfully. Check your Email. ",
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({ error: "Failed to process request" });
  }
});

app.post("/user-resetPassword/:token/:email", async (req, res) => {
  const { token, email } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!token || !email || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    if (!token || !email) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await BootcampWorkshopUser.findOneAndUpdate(
      { resetToken: token, email: email },
      {
        password: hashedPassword,
        resetToken: undefined,
        resetTokenExpiration: undefined,
      }
    );

    if (!user) {
      console.error("User not found or token expired");
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Failed to update password" });
  }
});

app.use("/user-home", authenticateToken);
app.get("/user-home", authenticateToken, async (req, res) => {
  try {
    console.log(req.user);
    const programs = await BootcampWorkshopProgram.find();
    res.json(programs);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.post("/user-dashboard/:programId", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { programId } = req.params;

  try {
    const user = await BootcampWorkshopUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const program = await BootcampWorkshopProgram.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    if (!user.BootcampWorkshopProgram.includes(programId)) {
      user.BootcampWorkshopProgram.push(programId);
      await user.save();
    }

    res.status(200).json({ message: "Successfully registered to the program" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering to the program", error });
  }
});

app.get("/user-dashboard", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await BootcampWorkshopUser.findById(userId).populate(
      "BootcampWorkshopProgram"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ registeredPrograms: user.BootcampWorkshopProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching registered programs", error });
  }
});
app.post("/user-unregister", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { programId } = req.body;

  try {
    const user = await BootcampWorkshopUser.findByIdAndUpdate(
      userId,
      { $pull: { BootcampWorkshopProgram: programId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Program unregistered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error unregistering program", error });
  }
});
app.get("/user-registered-programs", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await BootcampWorkshopUser.findById(userId).populate(
      "BootcampWorkshopProgram"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ registeredPrograms: user.BootcampWorkshopProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching registered programs", error });
  }
});

//----------------------------------------------Organizers------------------------------------//

app.get("/organizer-getData", async (req, res) => {
  const organizerDetails = await BootcampWorkshopOrganizer.find();
  res.status(200).json(organizerDetails);
});


app.post("/organizer-login", async (req, res) => {
  try {
    const organizer = await BootcampWorkshopOrganizer.findOne({
      email: req.body.email,
    });
    if (!organizer) {
      return res
        .status(401)
        .json({ auth: false, message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      organizer.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ auth: false, message: "Invalid username or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: organizer._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ auth: true, token: token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/organizer-logout", (req, res) => {
  res.redirect("/login");
});

app.post("/organizer-signup", async (req, res) => {
  try {
    const existingOrganizerEmail = await BootcampWorkshopOrganizer.findOne({
      email: req.body.email,
    });
    const existingOrganizerPhone = await BootcampWorkshopOrganizer.findOne({
      phone: req.body.phone,
    });
    if (existingOrganizerEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingOrganizerPhone) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newBootcampWorkshopOrganizer = new BootcampWorkshopOrganizer({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      organization: req.body.organization,
    });
    await newBootcampWorkshopOrganizer.save();
    res.status(200).json({ message: "organizer registered successfully" });
  } catch (error) {
    console.error("Error creating organizer:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/organizer-resetPasswordRequest", async (req, res) => {
  const { email } = req.body;
  try {
    const organizer = await BootcampWorkshopOrganizer.findOne({ email: email });
    if (!organizer) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    organizer.resetToken = resetToken;
    organizer.resetTokenExpiration = Date.now() + 3600000;
    await organizer.save();
    const resetLink = `http://localhost:5173/organizer-resetPassword/${resetToken}/${encodeURIComponent(
      email
    )}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    return res.status(200).json({
      waitmessage: "Request is processing, Please wait.",
      message: "Password reset link sent successfully. Check your Email. ",
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({ error: "Failed to process request" });
  }
});

app.post("/organizer-resetPassword/:token/:email", async (req, res) => {
  const { token, email } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!token || !email || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    if (!token || !email) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(token, email, newPassword, confirmPassword);
    const organizer = await BootcampWorkshopOrganizer.findOneAndUpdate(
      { resetToken: token, email: email },
      {
        password: hashedPassword,
        resetToken: undefined,
        resetTokenExpiration: undefined,
      }
    );

    if (!organizer) {
      console.log(organizer);
      console.error("Organizer not found or token expired");
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Failed to update password" });
  }
});

app.use("/organizer-home", authenticateToken);

app.get("/organizer-home", authenticateToken, async (req, res) => {
  try {
    console.log(req.organizer);
    const programs = await BootcampWorkshopProgram.find({
      organizerId: req.organizer._id,
    });
    res.json(programs);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//---------------------------------------------- Programs ------------------------------------//

app.post(
  "/program-addNew",
  authenticateToken,
  upload.single("poster"),
  async (req, res) => {
    try {
      const {
        programType,
        name,
        conductingPerson,
        date,
        time,
        venue,
        duration,
        classLink,
        website,
        facebook,
        instagram,
      } = req.body;

      const dateTime = new Date(`${date}T${time}`);
      console.log(req.organizer._id._id);

      const existingProgram = await BootcampWorkshopProgram.findOne({
        name,
        conductingPerson,
        dateTime,
      });

      if (existingProgram) {
        return res.status(400).json({
          message:
            "Program with the same name, conducting person, and date/time already exists",
        });
      }

      const posterFileName = path.basename(req.file.path);
      const newBootcampWorkshopProgram = new BootcampWorkshopProgram({
        programType,
        name,
        posterUrl: `http://localhost:3000/${posterFileName}`,
        conductingPerson,
        venue,
        dateTime,
        duration,
        classLink,
        website,
        facebook,
        instagram,
        organizerId: req.organizer._id,
      });

      await newBootcampWorkshopProgram.save();
      res.status(200).json({ message: "Program added successfully" });
    } catch (error) {
      console.error("Error creating program:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get("/program-edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const program = await BootcampWorkshopProgram.findById(id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    console.error("Error fetching program:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post(
  "/program-edit/:id",
  authenticateToken,
  upload.single("poster"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        programType,
        name,
        conductingPerson,
        date,
        time,
        venue,
        duration,
        classLink,
        website,
        facebook,
        instagram,
      } = req.body;

      const dateTime = new Date(`${date}T${time}`);
      const updateData = {
        programType: programType,
        name,
        conductingPerson,
        venue,
        dateTime,
        duration,
        classLink,
        otherLinks: { website, facebook, instagram },
      };

      console.log(updateData);
      console.log(
        "==========================---------------------------+++++++++++++++++++++"
      );

      if (req.file) {
        const posterFileName = path.basename(req.file.path);
        updateData.posterUrl = "http://localhost:3000/" + posterFileName;
      }

      const updatedProgram = await BootcampWorkshopProgram.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      if (!updatedProgram) {
        return res.status(404).json({ message: "Program not found" });
      }

      res.status(200).json({
        message: "Program updated successfully",
        program: updatedProgram,
      });
    } catch (error) {
      console.error("Error updating program:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.delete("/program-delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await BootcampWorkshopProgram.findByIdAndDelete(id);
    res.status(204).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting program", error });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`server is running sucessfully on  port : ${PORT}`);
});
