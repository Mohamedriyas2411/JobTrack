const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  jobCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCard",
    required: true
  },
  parts: [
    {
      partName: String,
      quantity: Number,
      price: Number
    }
  ],
  services: [
    {
      serviceName: String,
      price: Number
    }
  ],
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  notificationDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Bill", BillSchema);
