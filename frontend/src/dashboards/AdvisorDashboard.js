import { useState, useEffect } from "react";
import api from "../api/api";
import "./Dashboard.css";

function AdvisorDashboard() {
  const [formData, setFormData] = useState({
    vehicleType: "2W",
    vehicleNumber: "",
    customerName: "",
    customerPhone: "",
    reportedIssues: ""
  });
  const [jobCards, setJobCards] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assignTechId, setAssignTechId] = useState("");

  useEffect(() => {
    fetchJobCards();
    fetchTechnicians();
  }, []);

  const fetchJobCards = async () => {
    try {
      const res = await api.get("/jobcards");
      setJobCards(res.data);
    } catch (err) {
      console.error("Error fetching job cards:", err);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const res = await api.get("/manager/technicians");
      setTechnicians(res.data);
    } catch (err) {
      console.error("Error fetching technicians:", err);
    }
  };

  const fetchJobDetails = async (jobId) => {
    try {
      const [updatesRes, summaryRes] = await Promise.all([
        api.get(`/technician/updates/${jobId}`).catch(() => ({ data: [] })),
        api.get(`/technician/summary/${jobId}`).catch(() => ({ data: null }))
      ]);
      
      setJobDetails({
        updates: updatesRes.data,
        summary: summaryRes.data
      });
    } catch (err) {
      console.error("Error fetching job details:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createJobCard = async (e) => {
   
    if (!formData.vehicleNumber || !formData.customerName || !formData.customerPhone || !formData.reportedIssues) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/jobcards", formData);
      alert("Job Card Created Successfully!");
      
      setFormData({
        vehicleType: "2W",
        vehicleNumber: "",
        customerName: "",
        customerPhone: "",
        reportedIssues: ""
      });
      
      fetchJobCards();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job card");
    } finally {
      setLoading(false);
    }
  };

  const assignTechnician = async (jobId) => {
    if (!assignTechId) {
      alert("Please select a technician");
      return;
    }

    try {
      await api.patch(`/technician/assign/${jobId}`, {
        technicianId: assignTechId
      });
      alert("Technician Assigned Successfully!");
      setAssignTechId("");
      fetchJobCards();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign technician");
    }
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    fetchJobDetails(job._id);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setJobDetails(null);
  };

  return (
    <div className="dashboard">
      <h2>Service Advisor Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Create New Job Card</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={createJobCard} className="job-card-form">
          <div className="form-row">
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                <option value="2W">Two Wheeler (2W)</option>
                <option value="4W">Four Wheeler (4W)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="e.g., KA01AB1234"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Customer Phone</label>
              <input
                type="tel"
                name="customerPhone"
                placeholder="Enter phone number"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Reported Issues</label>
            <textarea
              name="reportedIssues"
              placeholder="Describe the issues reported by customer"
              value={formData.reportedIssues}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Job Card"}
          </button>
        </form>
      </div>

      <div className="dashboard-section">
        <h3>Job Cards</h3>
        <div className="job-cards-list">
          {jobCards.length === 0 ? (
            <p className="no-data">No job cards found</p>
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
                  <p><strong>Customer:</strong> {job.customerName} ({job.customerPhone})</p>
                  <p><strong>Issues:</strong> {job.reportedIssues}</p>
                  {job.technicianId && (
                    <p><strong>Assigned to:</strong> {job.technicianId.name}</p>
                  )}
                  
                  <div className="job-actions">
                    {job.status === "CREATED" && !job.technicianId && (
                      <div className="assign-technician">
                        <select 
                          value={assignTechId} 
                          onChange={(e) => setAssignTechId(e.target.value)}
                          className="tech-select"
                        >
                          <option value="">Select Technician</option>
                          {technicians.map(tech => (
                            <option key={tech._id} value={tech._id}>{tech.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => assignTechnician(job._id)}
                          className="btn-primary btn-small"
                        >
                          Assign
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => viewJobDetails(job)}
                      className="btn-secondary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <h3>Job Details - {selectedJob.jobCardNumber}</h3>
            
            <div className="job-detail-section">
              <h4>Vehicle Information</h4>
              <p><strong>Type:</strong> {selectedJob.vehicleType}</p>
              <p><strong>Number:</strong> {selectedJob.vehicleNumber}</p>
              <p><strong>Customer:</strong> {selectedJob.customerName} ({selectedJob.customerPhone})</p>
              <p><strong>Reported Issues:</strong> {selectedJob.reportedIssues}</p>
              <p><strong>Status:</strong> <span className={`status-badge status-${selectedJob.status.toLowerCase()}`}>{selectedJob.status}</span></p>
            </div>

            {jobDetails && jobDetails.updates && jobDetails.updates.length > 0 && (
              <div className="job-detail-section">
                <h4>Technician Updates</h4>
                {jobDetails.updates.filter(u => u.criticalIssue).length > 0 && (
                  <div className="critical-alert">
                    ⚠️ <strong>CRITICAL ISSUES REPORTED!</strong> Customer authorization required.
                  </div>
                )}
                {jobDetails.updates.map((update, idx) => (
                  <div key={idx} className={`update-item ${update.criticalIssue ? 'critical' : ''}`}>
                    <p><strong>Technician:</strong> {update.technicianId?.name}</p>
                    <p><strong>Message:</strong> {update.statusMessage}</p>
                    {update.criticalIssue && (
                      <p className="critical-text"><strong>⚠️ Critical Issue:</strong> {update.issueDescription || "Requires immediate attention"}</p>
                    )}
                    <p className="timestamp">{new Date(update.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {jobDetails && jobDetails.summary && (
              <div className="job-detail-section">
                <h4>📋 Service Completion Summary (For Customer Delivery)</h4>
                <div className="summary-box">
                  <p><strong>Work Done:</strong></p>
                  <p>{jobDetails.summary.workDone}</p>
                  
                  <p><strong>Next Service Advice:</strong></p>
                  <p>{jobDetails.summary.nextServiceAdvice}</p>
                  
                  <p><strong>Prevention Tips:</strong></p>
                  <p>{jobDetails.summary.preventionTips}</p>
                  
                  <p className="timestamp">Completed by: {jobDetails.summary.technicianId?.name} on {new Date(jobDetails.summary.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button onClick={closeModal} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvisorDashboard;