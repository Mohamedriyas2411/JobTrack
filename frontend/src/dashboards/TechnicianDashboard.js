import api from "../api/api";

function TechnicianDashboard() {
  const updateJob = async () => {
    await api.post("/technician/update/JOB_CARD_ID", {
      statusMessage: "Work in progress",
      criticalIssue: false
    });
    alert("Job Updated");
  };

  return (
    <div>
      <h2>Technician Dashboard</h2>
      <button onClick={updateJob}>Update Job</button>
    </div>
  );
}

export default TechnicianDashboard;
