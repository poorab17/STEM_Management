// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   rollNumber: { type: String, required: true, unique: true, trim: true },
//   class: { type: String, required: true, trim: true },
//   schoolName: { type: String, required: true, trim: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
//   photo: { type: Buffer }, // photo stored as binary data
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, unique: true, trim: true },
  class: { type: String, required: true, trim: true },
  schoolName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  photo: { type: String }, // <-- Store Cloudinary URL as string
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);

