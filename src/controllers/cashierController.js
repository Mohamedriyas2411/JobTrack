const Bill = require("../models/Bill");
const JobCard = require("../models/JobCard");
const { getPartPrice } = require("../services/inventoryService");

exports.generateBill = async (req, res) => {
  const { parts, services } = req.body;

  let totalAmount = 0;

  // Calculate parts cost
  const processedParts = parts.map(p => {
    const price = getPartPrice(p.partName);
    const cost = price * p.quantity;
    totalAmount += cost;
    return {
      ...p,
      price
    };
  });

  // Calculate services cost
  services.forEach(s => {
    totalAmount += s.price;
  });

  const bill = await Bill.create({
    jobCardId: req.params.id,
    parts: processedParts,
    services,
    totalAmount
  });

  await JobCard.findByIdAndUpdate(req.params.id, {
    status: "BILLED"
  });

  res.status(201).json(bill);
};
