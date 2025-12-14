import { useState, useEffect } from "react";
import api from "../api/api";
import "./Dashboard.css";

function TechnicianDashboard() {
  const
    nextServiceAdvice: "",
    preventionTips: ""
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

  const handleCompletionChange = (e) => {
    setCompletionData({
      ...completionData,
      [e.target.name]: e.target.value
    });
  };

  const updateJob = async (e) => {
    e.preventDefault();
    
    if (!updateData.statusMessage) {
      alert("Please enter a status message");
      return;
    }

    if (updateData.criticalIssue && !updateData.issueDescription) {
      alert("Please describe the critical issue");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/technician/update/${selectedJob._id}`, updateData);
      
      if (updateData.criticalIssue) {
        alert("⚠️ Critical Issue Reported! Service Advisor has been notified for customer authorization.");
      } else {
        alert("Job Updated Successfully!");
      }
      
      setUpdateData({ statusMessage: "", criticalIssue: false, issueDescription: "" });
      setSelectedJob(null);
      setUpdateMode("progress");
      
      fetchAssignedJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  const completeJob = async (e) => {
    e.preventDefault();
    
    if (!completionData.workDone || !completionData.nextServiceAdvice || !completionData.preventionTips) {
      alert("Please fill in all completion summary fields");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/technician/complete/${selectedJob._id}`, completionData);
      alert("Job Completed Successfully! Service summary has been created for the advisor.");
      
      setCompletionData({ workDone: "", nextServiceAdvice: "", preventionTips: "" });
      setSelectedJob(null);
      setUpdateMode("progress");
      
      fetchAssignedJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to complete job");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (job, mode) => {
    setSelectedJob(job);
    setUpdateMode(mode);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setUpdateMode("progress");
    setUpdateData({ statusMessage: "", criticalIssue: false, issueDescription: "" });
    setCompletionData({ workDone: "", nextServiceAdvice: "", preventionTips: "" });
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
                  
                  <div className="job-actions">
                    {job.status === "IN_PROGRESS" && (
                      <>
                        <button
                          onClick={() => openModal(job, "progress")}
                          className="btn-secondary"
                        >
                          Update Progress
                        </button>
                        <button
                          onClick={() => openModal(job, "complete")}
                          className="btn-primary"
                        >
                          Complete Job
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Update Progress Modal */}
      {selectedJob && updateMode === "progress" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Job Status</h3>
            <p><strong>Job:</strong> {selectedJob.jobCardNumber}</p>
            <p><strong>Vehicle:</strong> {selectedJob.vehicleNumber}</p>
            
            <form onSubmit={updateJob}>
              <div className="form-group">
                <label>Status Message *</label>
                <textarea
                  name="statusMessage"
                  placeholder="Enter work progress (e.g., 'Completed oil change, starting brake inspection')"
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
                  ⚠️ Mark as Critical Issue (Requires Customer Authorization)
                </label>
              </div>

              {updateData.criticalIssue && (
                <div className="form-group">
                  <label>Critical Issue Description *</label>
                  <textarea
                    name="issueDescription"
                    placeholder="Describe the critical issue in detail for customer authorization"
                    value={updateData.issueDescription}
                    onChange={handleUpdateChange}
                    rows="3"
                    required
                  />
                </div>
              )}

              <div className="modal-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Submit Update"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complete Job Modal */}
      {selectedJob && updateMode === "complete" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <h3>Complete Job - Service Summary</h3>
            <p><strong>Job:</strong> {selectedJob.jobCardNumber}</p>
            <p><strong>Vehicle:</strong> {selectedJob.vehicleNumber}</p>
            
            <form onSubmit={completeJob}>
              <div className="form-group">
                <label>Work Done *</label>
                <textarea
                  name="workDone"
                  placeholder="Describe all work completed (e.g., 'Replaced engine oil and oil filter, inspected brakes and cleaned air filter')"
                  value={completionData.workDone}
                  onChange={handleCompletionChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Next Service Advice *</label>
                <textarea
                  name="nextServiceAdvice"
                  placeholder="Provide maintenance recommendations for next service (e.g., 'Next oil change in 3000 km, brake pad replacement recommended')"
                  value={completionData.nextServiceAdvice}
                  onChange={handleCompletionChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Prevention Tips *</label>
                <textarea
                  name="preventionTips"
                  placeholder="Suggest ways to prevent recurring issues (e.g., 'Avoid sudden braking, check tire pressure monthly')"
                  value={completionData.preventionTips}
                  onChange={handleCompletionChange}
                  rows="3"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Completing..." : "Complete Job"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
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