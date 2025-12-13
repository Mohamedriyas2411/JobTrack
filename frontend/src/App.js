import { useState } from "react";
import Login from "./auth/Login";
import AdvisorDashboard from "./dashboards/AdvisorDashboard";
import TechnicianDashboard from "./dashboards/TechnicianDashboard";
import CashierDashboard from "./dashboards/CashierDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";

function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <Login setRole={setRole} />;
  }

  if (role === "advisor") return <AdvisorDashboard />;
  if (role === "technician") return <TechnicianDashboard />;
  if (role === "cashier") return <CashierDashboard />;
  if (role === "manager") return <ManagerDashboard />;

  return null;
}

export default App;
