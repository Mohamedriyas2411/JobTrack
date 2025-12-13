import { useEffect, useState } from "react";
import api from "../api/api";
import KanbanBoard from "../components/KanbanBoard";

function ManagerDashboard() {
  const [kanban, setKanban] = useState(null);

  useEffect(() => {
    api.get("/manager/kanban").then(res => setKanban(res.data));
  }, []);

  return (
    <div>
      <h2>Manager Dashboard</h2>
      {kanban && <KanbanBoard data={kanban} />}
    </div>
  );
}

export default ManagerDashboard;
