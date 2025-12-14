import { useState, useEffect } from "react";
import api from "../api/api";
import "./Dashboard.css";

function CashierDashboard() {
  const [jobCards, setJobCards] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [parts, setParts] = useState([{ partName: "", quantity: 1, price: 0 }]);
  const [services, setServices] = useState([{ serviceName: "", price: 0 }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompletedJobs();
  }, []);

  const fetchCompletedJobs = async () => {
    
  };

  const addPart = () => {
    setParts([...parts, { partName: "", quantity: 1, price: 0 }]);
  };

  const removePart = (index) => {
    setParts(parts.filter((_, i) => i !== index));
  };

  const updatePart = (index, field, value) => {
    const newParts = [...parts];
    newParts[index][field] = value;
    setParts(newParts);
  };

  const addService = () => {
    setServices([...services, { serviceName: "", price: 0 }]);
  };
east one part or service");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/cashier/bill/${selectedJob._id}`, {
        parts: validParts,
        services: validServices
      });
      alert("✅ Bill Generated Successfully!\n📧 Notification sent to customer: " + selectedJob.customerName);
      
      // Reset
      setSelectedJob(null);
      set
    <div className="dashboard">
      <h2>Cashier Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Completed Jobs (Ready for Billing)</h3>
        <div className="job-cards-list">
          {jobCards.length === 0 ? (
            <p className="no-data">No jobs ready for billing</p>
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
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn-primary"
                  >
                    Generate Bill
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content billing-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Generate Bill</h3>
            <p><strong>Job:</strong> {selectedJob.jobCardNumber}</p>
            <p><strong>Customer:</strong> {selectedJob.customerName}</p>
            
            <form onSubmit={generateBill}>
              <div className="billing-section">
                <h4>Parts Used</h4>
                {parts.map((part, index) => (
                  <div key={index} className="billing-item">
                    <input
                      type="text"
                      placeholder="Part name"
                      value={part.partName}
                      onChange={(e) => updatePart(index, "partName", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      value={part.quantity}
                      onChange={(e) => updatePart(index, "quantity", Number(e.target.value))}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      value={part.price}
                      onChange={(e) => updatePart(index, "price", Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => removePart(index)}
                      className="btn-remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addPart} className="btn-secondary">
                  + Add Part
                </button>
              </div>

              <div className="billing-section">
                <h4>Services</h4>
                {services.map((service, index) => (
                  <div key={index} className="billing-item">
                    <input
                      type="text"
                      placeholder="Service name"
                      value={service.serviceName}
                      onChange={(e) => updateService(index, "serviceName", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      value={service.price}
                      onChange={(e) => updateService(index, "price", Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="btn-remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addService} className="btn-secondary">
                  + Add Service
                </button>
              </div>

              <div className="billing-total">
                <h4>Total Amount: ₹{calculateTotal().toFixed(2)}</h4>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Generating..." : "Generate Bill"}
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

export default CashierDashboard;