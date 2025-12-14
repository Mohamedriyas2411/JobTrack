const Bill = require("../models/Bill");
const JobCard = require("../models/JobCard");
const { getPartPrice } = require("../services/inventoryService");

exports.getCompletedJobs = async (req, res) => {
  try {
    const jobCards = await JobCard.find({ 
      status: "DONE" 
    }).sort({ updatedAt: -1 });
    
    res.json(jobCards);
  } catch (error) {
  }
};

exports.generateBill = async (req, res) => {
  try {
    const { parts, services } = req.body;

    // Validate that job is in DONE status
    if (!jobCard) {
      return res.status(404).json({ message: "Job card not found" });
    }
    
    if (jobCard.status !== "DONE") {
      return res.status(400).json({ message: "Job must be completed before billing" });
    }

    let totalAmount = 0;

    // Calculate parts cost - use provided price or inventory price
    const processedParts = parts.map(p => {
      const price = p.price || getPartPrice(p.partName);
      const cost = price * p.quantity;
      totalAmount += cost;
      return {
        partName: p.partName,
        quantity: p.quantity,
        price: price
      };
    });

    // Calculate services cost
    services.forEach(s => {
      totalAmount += Number(s.price);
    });

      jobCardId: req.params.id,
      parts: processedParts,
      services,
      totalAmount,
      notificationSent: true,
      notificationDate: new Date()
    });

    await JobCard.findByIdAndUpdate(req.params.id, {
      status: "BILLED"
    });

    // Log notification (in real app, send SMS/email here)
    console.log(`📧 Notification sent to customer: ${jobCard.customerName} (${jobCard.customerPhone})`);

    res.status(201).json(bill);
  } catch (error) {
    console.error("Error generating bill:", error);
    res.status(500).json({ message: "Failed to generate bill", error: error.message });
  }
};
