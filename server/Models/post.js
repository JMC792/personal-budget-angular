const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },

    name: { type: String, trim: true, required: true, uppercase: true },

    budget: { type: Number, required: true },

    color: { type: String, trim: true, required: true, unique: true },
  },

  { 
      collection: "PersonalBudgetCollection" 
    }
);

module.exports = mongoose.model("PersonalBudgetCollection", postSchema);
