import { useEffect, useState } from "react";
import api from "../api/api";
import KanbanBoard from "../components/KanbanBoard";
import "./Dashboard.css";

function ManagerDashboard() {
  const [kanban, setKanban] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [kanbanRes, statsRes] = await Promise.all([
        api.get("/manager/kanban"),
        api.get("/manager/stats")
      ]);
      setKanban(kanbanRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard">
      <h2>Manager Dashboard</h2>
      
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.totalJobs || 0}</h3>
            <p>Total Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{stats.inProgress || 0}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card">
            <h3>{stats.completed || 0}</h3>
            <p>Completed</p>
          </div>
          <div className="stat-card">
            <h3>{stats.billed || 0}</h3>
            <p>Billed</p>
          </div>
        </div>
      )}

      {kanban && <KanbanBoard data={kanban} />}
    </div>
  );
}

export default ManagerDashboard;