const express = require('express');
const Student = require('../models/Student'); 
const router = express.Router();
const upload = require('../middleware/upload'); // multer Cloudinary

// Serve uploaded files statically (optional, mostly for local storage)
// router.use('/uploads', express.static('uploads'));

//➕ Create student
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log("Received student data:", req.body);
    console.log("Received file:", req.file); // Cloudinary details

    const { name, rollNumber, className, schoolName, gender } = req.body;

    if (!name || !rollNumber || !className || !schoolName || !gender) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const student = new Student({
      name,
      rollNumber,
      class: className,
      schoolName,
      gender,
      photo: req.file ? req.file.path : null // Cloudinary URL
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error("Error saving student:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Roll Number must be unique." });
    }
    res.status(400).json({ error: err.message });
  }
});

// 📖 Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📖 Get single student
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update student
// router.put('/:id', upload.single("photo"), async (req, res) => {
//   try {
//     const updateData = { ...req.body };
//     if (req.file) updateData.photo = req.file.path; // Cloudinary URL

//     const student = await Student.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!student) return res.status(404).json({ error: "Student not found" });
//     res.json(student);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// ✏️ Update student
router.put('/:id', upload.single("photo"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // 1️⃣ Fetch existing student
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // 2️⃣ Handle unique rollNumber
    if (updateData.rollNumber && updateData.rollNumber !== existingStudent.rollNumber) {
      // Check if another student already has this rollNumber
      const duplicate = await Student.findOne({ rollNumber: updateData.rollNumber });
      if (duplicate) {
        return res.status(400).json({ error: "Roll Number must be unique." });
      }
    } else {
      // Roll number unchanged, remove from updateData to avoid conflict
      delete updateData.rollNumber;
    }

    // 3️⃣ Handle photo update
    if (req.file) {
      updateData.photo = req.file.path; // Cloudinary URL
    }

    // 4️⃣ Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedStudent);

  } catch (err) {
    console.error("Error updating student:", err.message);
    res.status(400).json({ error: err.message });
  }
});


// ❌ Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
