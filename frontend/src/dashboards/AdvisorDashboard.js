import { useState } from "react";
import api from "../api/api";

function AdvisorDashboard() {
  const [vehicleNumber, setVehicleNumber] = useState("");

  const createJobCard = async () => {
    await api.post("/jobcards", {
      vehicleType: "4W",
      vehicleNumber,
      customerName: "Test Customer",
      customerPhone: "9999999999",
      reportedIssues: "General Service"
    });
    alert("Job Card Created");
  };

  return (
    <div>
      <h2>Advisor Dashboard</h2>
      <input
        placeholder="Vehicle Number"
        onChange={e => setVehicleNumber(e.target.value)}
      />
      <button onClick={createJobCard}>Create Job Card</button>
    </div>
  );
}

export default AdvisorDashboard;
