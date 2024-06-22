import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "./Piechart";
import {
  DashboardContainer,
  InfoContainer,
  InfoItem,
  AdditionalInfoContainer,
  AdditionalInfoItem

}from './DashboardStyles'

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
