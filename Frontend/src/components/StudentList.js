// import React from "react";

// const StudentList = ({ students, onEdit, onDelete }) => {
//   return (
//     <div>
//       <h2>Students</h2>
//       {students.length === 0 ? (
//         <p>No students found.</p>
//       ) : (
//         <ul>
//           {students.map((student) => (
//             <li key={student._id} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
//              {student.photo && (
//                 <img
//                    src={`http://localhost:5000/${student.photo}`} // Use the file path
//                  // src={`data:image/png;base64,${student.photo}`}
//                   alt="Student"
//                   width="80"
//                   height="80"
//                   style={{ borderRadius: "50%", marginRight: "10px" }}
//                 />
//               )}
//               <div>
//                 <strong>{student.name}</strong>  
//                 <br />
//                 Roll: {student.rollNumber}, Class: {student.class}, School: {student.schoolName}, Gender: {student.gender}
//                 <br />
//                 <small>Registered on: {new Date(student.createdAt).toLocaleDateString()}</small>
//               </div>
//               <button onClick={() => onEdit(student)}>Edit</button>
//               <button onClick={() => onDelete(student._id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StudentList;

import React from "react";

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li
              key={student._id}
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {student.photo && (
                <img
                  src={student.photo}  // Cloudinary URL directly
                  alt="Student"
                  width="80"
                  height="80"
                  style={{ borderRadius: "50%", marginRight: "10px" }}
                />
              )}
              <div>
                <strong>{student.name}</strong>
                <br />
                Roll: {student.rollNumber}, Class: {student.class}, School:{" "}
                {student.schoolName}, Gender: {student.gender}
                <br />
                <small>
                  Registered on:{" "}
                  {new Date(student.createdAt).toLocaleDateString()}
                </small>
              </div>
              <button onClick={() => onEdit(student)}>Edit</button>
              <button onClick={() => onDelete(student._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;

