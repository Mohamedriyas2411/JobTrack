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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobCards();
  }, []);

  const fetchJobCards = async () => {
    try {
      const res = await api.get("/jobcards");
      setJobCards(res.data);
    } catch (err) {
      console.error("Error fetching job cards:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createJobCard = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
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
        <h3>Recent Job Cards</h3>
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvisorDashboard;