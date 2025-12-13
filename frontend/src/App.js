import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdvisorDashboard from "./dashboards/AdvisorDashboard";
import TechnicianDashboard from "./dashboards/TechnicianDashboard";
import CashierDashboard from "./dashboards/CashierDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null);
  };

  if (!role) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login setRole={setRole} onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ServiceFlow Management</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>
      
      <main className="app-main">
        {role === "advisor" && <AdvisorDashboard />}
        {role === "technician" && <TechnicianDashboard />}
        {role === "cashier" && <CashierDashboard />}
        {role === "manager" && <ManagerDashboard />}
      </main>
    </div>
  );
}

export default App;