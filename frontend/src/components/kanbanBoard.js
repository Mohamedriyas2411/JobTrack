import "./KanbanBoard.css";

function KanbanBoard({ data }) {
  const columns = [
    { key: "CREATED", title: "Created", color: "#3498db" },
    { key: "IN_PROGRESS", title: "In Progress", color: "#f39c12" },
    { key: "DONE", title: "Done", color: "#2ecc71" },
    { key: "BILLED", title: "Billed", color: "#9b59b6" }
  ];

  return (
    <div className="kanban-board">
      <h3>Job Status Board</h3>
      <div className="kanban-columns">
        {columns.map((column) => (
          <div key={column.key} className="kanban-column">
            <div
              className="kanban-column-header"
              style={{ backgroundColor: column.color }}
            >
              <h4>{column.title}</h4>
              <span className="count">
                {data[column.key]?.length || 0}
              </span>
            </div>
            <div className="kanban-cards">
                <div key={job._id} className="kanban-card">
                  <div className="kanban-card-header">
                    <span className="job-number">{job.jobCardNumber}</span>
                  </div>
                  <p><strong>Vehicle:</strong> {job.vehicleNumber}</p>
                  <p className="job-issues">{job.reportedIssues}</p>
                  {job.technicianId && (
                    <p className="technician">👤 {job.technicianId.name}</p>
                  )}
                </div>
              )) || <p className="no-jobs">No jobs</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;