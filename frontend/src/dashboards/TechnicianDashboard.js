import { useState, useEffect } from "react";
import api from "../api/api";
import "./Dashboard.css";

function TechnicianDashboard() {
  const [jobCards, setJobCards] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [updateData, setUpdateData] = useState({
    statusMessage: "",
    criticalIssue: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignedJobs();
  }, []);

  const fetchAssignedJobs = async () => {
    try {
      const res = await api.get("/technician/jobs");
      setJobCards(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleUpdateChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUpdateData({
      ...updateData,
      [e.target.name]: value
    });
  };

  const updateJob = async (e) => {
    e.preventDefault();
    
    if (!updateData.statusMessage) {
      alert("Please enter a status message");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/technician/update/${selectedJob._id}`, updateData);
      alert("Job Updated Successfully!");
      
      setUpdateData({ statusMessage: "", criticalIssue: false });
      setSelectedJob(null);
      
      fetchAssignedJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Technician Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Assigned Jobs</h3>
        <div className="job-cards-list">
          {jobCards.length === 0 ? (
            <p className="no-data">No jobs assigned</p>
          ) : (
            jobCards.map((job) => (
              <div key={job._id} className="job-card-item">
                <div className="job-card-header">
                  <span className="job-number">{job.jobCardNumber}</span>
                  <span className={`status-badge status-${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>
                <div className="job-card-details">
                  <p><strong>Vehicle:</strong> {job.vehicleType} - {job.vehicleNumber}</p>
                  <p><strong>Customer:</strong> {job.customerName}</p>
                  <p><strong>Issues:</strong> {job.reportedIssues}</p>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn-secondary"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Job Status</h3>
            <p><strong>Job:</strong> {selectedJob.jobCardNumber}</p>
            <p><strong>Vehicle:</strong> {selectedJob.vehicleNumber}</p>
            
            <form onSubmit={updateJob}>
              <div className="form-group">
                <label>Status Message</label>
                <textarea
                  name="statusMessage"
                  placeholder="Enter work progress or completion message"
                  value={updateData.statusMessage}
                  onChange={handleUpdateChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="criticalIssue"
                    checked={updateData.criticalIssue}
                    onChange={handleUpdateChange}
                  />
                  Mark as Critical Issue
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Submit Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicianDashboard;