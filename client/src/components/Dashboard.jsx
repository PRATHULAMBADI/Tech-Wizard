import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PieChart from "./Piechart";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 70%;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  text-align: center;
  font-size: 18px;
  color: cadetblue;
`;

const AdditionalInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 20px;
`;

const AdditionalInfoItem = styled.div`
  text-align: center;
  font-size: 18px;
  color: darkgoldenrod;
`;

const Dashboard = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/programCounts"
        );
        console.log("Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Count:", error);
        setError("Error fetching Count. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DashboardContainer>
      <InfoContainer>
        <InfoItem>Workshop: {data.workshopCount || 0}</InfoItem>
        <InfoItem>Seminar: {data.seminarCount || 0}</InfoItem>
        <InfoItem>Bootcamp: {data.bootcampCount || 0}</InfoItem>
      </InfoContainer>
      <PieChart data={data} />
      <AdditionalInfoContainer>
        <AdditionalInfoItem>Users: {data.usersCount || 0}</AdditionalInfoItem>
        <AdditionalInfoItem>
          Organizers: {data.organizerCount || 0}
        </AdditionalInfoItem>
        <AdditionalInfoItem>
          Live Programs:{" "}
          {data.workshopCount + data.seminarCount + data.bootcampCount || 0}
        </AdditionalInfoItem>
      </AdditionalInfoContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
