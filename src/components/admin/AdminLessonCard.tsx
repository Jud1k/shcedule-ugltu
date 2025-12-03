// import { useState } from 'react';

// interface AdminLessonCardProps {
//   subject?: string;
//   classroom?: string;
//   teacher?: string;
//   lessonType?: string;
// }

// export function AdminLessonCard({
//   subject = 'Название пары',
//   classroom = 'Аудитория',
//   teacher = 'Преподаватель',
//   lessonType = 'Тип занятия',
// }: AdminLessonCardProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedSubject, setEditedSubject] = useState(subject);
//   const [editedClassroom, setEditedClassroom] = useState(classroom);
//   const [editedTeacher, setEditedTeacher] = useState(teacher);
//   const [editedType, setEditedType] = useState(lessonType);
//   return (
//     <div className="card w-06 bg-base-100 shadow-sm card-lg">
//       <div className="card-body">
//         {isEditing ? (
//           <>
//             <input type="text"></input>
//           </>
//         ) : (
//           <>
//             <h2>{editedSubject}</h2>
//             <h1>{editedClassroom}</h1>
//             <p>{editedTeacher}</p>
//             <div className="card-actions justify-end">
//               <div className="badge badge-success">{editedType}</div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function LessonCard({
//   subject = "Название пары",
//   classroom = "Аудитория",
//   teacher = "Преподаватель",
//   lessonType = "Тип занятия",
// }: LessonCardProps) {
//   return (
//     <div className="card w-96 bg-base-100 shadow-sm card-lg">
//       <div className="card-body">
//         <h2 className="card-title">{subject}</h2>
//         <h1>{classroom}</h1>
//         <p>{teacher}</p>
//         <div className="card-actions justify-end">
//           <div className="badge badge-success">{lessonType}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
