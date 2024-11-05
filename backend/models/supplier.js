const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  supplierID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  // Change drugsAvailable to accept an array of strings
  drugsAvailable: { type: [String], required: true }
});

module.exports = mongoose.model('Supplier', supplierSchema);
