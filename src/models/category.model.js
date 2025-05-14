import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    minLenght: 3,
    maxLenght: 30,
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
