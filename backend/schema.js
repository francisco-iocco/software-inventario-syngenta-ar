const mongoose = require("mongoose");

// Gadget format (fields)
const gadgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: Number,
    required: true
  },
  ownedQuantity: {
    type: Number,
    required: true
  },
  givenQuantity: Number,
  image: {
    data: {
      type: Buffer,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    }
  }
});

// Establishing in where collection it will be saved (gadgets);
const Gadget = mongoose.model("gadgets", gadgetSchema);

module.exports = Gadget;
