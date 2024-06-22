import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Label,
  ButtonContainer,
  Container,
  Input,
  ProgramInputContainer,
  BackgroundContainer,
  ContainerHeading,
  Select,
  IconsContainer,
  IconsHolder,
  IconLabel,
  StyledHomeIcon,
  IconsHolderStyledHomeIcon,
} from "./styles";

const ProgramEditForm = () => {
  const [programData, setProgramData] = useState({});
  const [poster, setPoster] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/program-edit/${id}`
        );
        const program = response.data;
        setProgramData({
          programType: program.programType,
          name: program.name,
          conductingPerson: program.conductingPerson,
          date: program.dateTime.split("T")[0],
          time: program.dateTime.split("T")[1].slice(0, 5),
          venue: program.venue,
          duration: program.duration,
          classLink: program.classLink,
          otherLinks: {
            website: program.otherLinks?.website || "",
            facebook: program.otherLinks?.facebook || "",
            instagram: program.otherLinks?.instagram || "",
          },
        });
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };
    fetchProgramData();
  }, [id]);

  const handleUpdateProgram = async (e) => {
    e.preventDefault();

    const {
      programType,
      name,
      conductingPerson,
      date,
      time,
      venue,
      duration,
    } = programData;

    // Validation checks
    if (!programType) {
      setErrorMessage("Program type is required");
      return;
    }
    if (!name) {
      setErrorMessage("Name is required");
      return;
    }
    if (!poster) {
      setErrorMessage("Poster Image is required");
      return;
    }
    if (!conductingPerson) {
      setErrorMessage("Conducting person is required");
      return;
    }
    if (!venue) {
      setErrorMessage("Venue is required");
      return;
    }
    if (!date || !time) {
      setErrorMessage("Date and time are required");
      return;
    }
    const dateTime = new Date(`${date}T${time}`);
    const currentDate = new Date();
    if (isNaN(dateTime.getTime())) {
      setErrorMessage("Invalid date and time format");
      return;
    }
    if (dateTime <= currentDate) {
      setErrorMessage("Enter a valid date");
      return;
    }
    if (!duration) {
      setErrorMessage("Duration is required");
      return;
    }

    const formData = new FormData();
    Object.keys(programData).forEach((key) => {
      if (key === "otherLinks") {
        formData.append("website", programData.otherLinks.website);
        formData.append("facebook", programData.otherLinks.facebook);
        formData.append("instagram", programData.otherLinks.instagram);
      } else {
        formData.append(key, programData[key]);
      }
    });
    if (poster) {
      formData.append("poster", poster);
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `http://localhost:3000/program-edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Program updated successfully");
      navigate("/organizer-home");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
          "An error occurred while updating the program"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <BackgroundContainer>
      <IconsContainer>
        <IconsHolder>
          <IconsHolderStyledHomeIcon onClick={handleGoToHome}>
            <StyledHomeIcon title="Go to Home" />
            <IconLabel>HOME</IconLabel>
          </IconsHolderStyledHomeIcon>
        </IconsHolder>
      </IconsContainer>
      <Container
        onSubmit={handleUpdateProgram}
        method="POST"
        encType="multipart/form-data"
      >
        <ContainerHeading>EDIT PROGRAM</ContainerHeading>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <ProgramInputContainer>
          <Label>Type:</Label>
          <Select
            name="type"
            value={programData.type || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Program Type</option>
            <option value="Bootcamp">Bootcamp</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
          </Select>
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={programData.name || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Poster:</Label>
          <Input type="file" name="poster" onChange={handleFileChange} />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Conducting Person:</Label>
          <Input
            type="text"
            name="conductingPerson"
            value={programData.conductingPerson || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Venue:</Label>
          <Input
            type="text"
            name="venue"
            value={programData.venue || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Date:</Label>
          <Input
            type="date"
            name="date"
            value={programData.date || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Time:</Label>
          <Input
            type="time"
            name="time"
            value={programData.time || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Duration:</Label>
          <Input
            type="text"
            name="duration"
            value={programData.duration || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Class:</Label>
          <Input
            type="text"
            name="classLink"
            value={programData.classLink || ""}
            onChange={handleChange}
            required
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Website:</Label>
          <Input
            type="url"
            name="website"
            value={programData.otherLinks?.website || ""}
            onChange={handleChange}
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Facebook:</Label>
          <Input
            type="url"
            name="facebook"
            value={programData.otherLinks?.facebook || ""}
            onChange={handleChange}
          />
        </ProgramInputContainer>
        <ProgramInputContainer>
          <Label>Instagram:</Label>
          <Input
            type="url"
            name="instagram"
            value={programData.otherLinks?.instagram || ""}
            onChange={handleChange}
          />
        </ProgramInputContainer>
        <ButtonContainer>
          <Button type="submit">Update Program</Button>
          <Button type="button" onClick={() => navigate("/organizer-home")}>
            Cancel
          </Button>
        </ButtonContainer>
      </Container>
    </BackgroundContainer>
  );
};

export default ProgramEditForm;
