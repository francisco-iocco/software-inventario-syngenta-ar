const mongoose = require("mongoose");

// Gadget format (fields)
const gadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: true
  },
  ownedQuantity: {
    type: Number,
    required: true
  },
  givenQuantity: Number,
  imageName: String
});

// Establishing in where collection it will be saved (gadgets);
const Gadget = mongoose.model("gadgets", gadgetSchema);

module.exports = Gadget;
