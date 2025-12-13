import api from "../api/api";

function CashierDashboard() {
  const generateBill = async () => {
    await api.post("/cashier/bill/JOB_CARD_ID", {
      parts: [{ partName: "Engine Oil", quantity: 1 }],
      services: [{ serviceName: "Service Charge", price: 500 }]
    });
    alert("Bill Generated");
  };

  return (
    <div>
      <h2>Cashier Dashboard</h2>
      <button onClick={generateBill}>Generate Bill</button>
    </div>
  );
}

export default CashierDashboard;
