


// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ImMenu } from "react-icons/im";
// import { FiLogOut } from "react-icons/fi";
// import {
//   MdDashboardCustomize,
//   MdAssignment,
//   MdClass,
//   MdOutlinePayments,
// } from "react-icons/md";
// import { AiOutlineUserAdd, AiOutlineQuestionCircle } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import { BiNotepad, BiDetail } from "react-icons/bi";
// import { BsFillBookmarkCheckFill } from "react-icons/bs";
// import { RiAdminLine } from "react-icons/ri";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [rotated, setRotated] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     data: { user } = {},
//   } = useSelector((state) => state.auth || { data: {} });

//   // Role+ID badge: e.g., S001, T045, A010
// // Role+ID badge function
//   const getRoleId = () => {
//     if (!user) return "";

//     switch (user.userType) {
//       case "admin":
//         return user.adminID ? user.adminID : "";
//       case "student":
//         return user.studentID ? user.studentID : "";
//       case "teacher":
//         return user.teacherID ? user.teacherID : "";
//       default:
//         return "";
//     }
//   };

//   const roleId = getRoleId();

//   const OPEN_WIDTH = "260px";
//   const CLOSED_WIDTH = "72px";

//   useEffect(() => {
//     const width = isOpen ? OPEN_WIDTH : CLOSED_WIDTH;
//     document.documentElement.style.setProperty("--sidebar-width", width);
//     document.body.style.transition = "padding-left 220ms ease";
//     document.body.style.paddingLeft = width;
//   }, [isOpen]);

//   const toggle = () => {
//     setIsOpen((s) => !s);
//     setRotated((r) => !r);
//   };

//   const handleLogout = () => {
//     dispatch({ type: "AUTH_LOGOUT" });
//     document.body.style.paddingLeft = "0px"; // reset padding for landing page
//     navigate("/");
//   };

//   const MenuItem = ({ to, icon: Icon, text }) => {
//     const active = location.pathname === to;
//     const base =
//       "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 select-none";
//     const activeCls =
//       "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg";
//     const idleCls =
//       "text-gray-300 hover:bg-white/5 hover:text-blue-300 hover:translate-x-1";

//     return (
//       <Link
//         to={to}
//         title={!isOpen ? text : undefined}
//         className={`${base} ${active ? activeCls : idleCls}`}
//         aria-current={active ? "page" : undefined}
//       >
//         <Icon className="text-xl flex-shrink-0" />
//         {isOpen && <span className="whitespace-nowrap text-sm font-medium">{text}</span>}
//       </Link>
//     );
//   };

//   return (
//     <aside
//       aria-label="Sidebar navigation"
//       className={`fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300
//         bg-gradient-to-b from-gray-900 to-slate-900 text-white shadow-2xl 
//         ${isOpen ? "w-[260px]" : "w-[72px]"}`}
//     >
//       {/* Header */}
//       <div
//         className={`flex flex-col border-b border-white/10 ${
//           isOpen ? "px-4 py-4" : "px-2 py-3 items-center"
//         }`}
//       >
//         <div className="flex items-center justify-between w-full">
//           {isOpen ? (
//             <>
//               <div className="flex items-center gap-0 select-none">
//                 <span className="text-lg font-extrabold tracking-tight text-slate-50">
//                   School
//                 </span>
//                 <span className="text-lg font-extrabold tracking-tight text-blue-400">
//                   Hub
//                 </span>
//               </div>
//               <button
//                 onClick={toggle}
//                 className={`p-2 rounded-md transition-transform duration-300 ${
//                   rotated ? "rotate-90" : ""
//                 } hover:rotate-90 hover:text-blue-400`}
//               >
//                 <ImMenu size={18} />
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={toggle}
//               className={`p-2 px-4 rounded-md transition-transform duration-300 justify-self-center align-middle ${
//                 rotated ? "rotate-90" : ""
//               } hover:rotate-0 hover:text-blue-400`}
//               title="Open menu"
//             >
//               <ImMenu size={20} />
//             </button>
//           )}
//         </div>

//         {/* Role + Badge */}
//         {user?.userType && (
//           <div
//             className={`flex items-center mt-3 transition-all duration-300 ${
//               isOpen ? "gap-3" : "justify-center"
//             }`}
//           >
//             <div className="bg-blue-600/90 text-yellow-400/90 text-xs font-bold px-3 py-1 rounded-full shadow-md">
//               {roleId}
//             </div>
//             {isOpen && (
//               <span className="text-sm font-semibold text-slate-200">
//                 {user.userType.toUpperCase()}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 overflow-auto p-3 space-y-1">
//         <MenuItem to="/dashboard" icon={MdDashboardCustomize} text="Dashboard" />

//         {user?.userType === "student" && (
//           <>
//             <MenuItem to="/studentprofile" icon={CgProfile} text="My Profile" />
//             <MenuItem to="/myattendance" icon={MdAssignment} text="My Attendance" />
//             <MenuItem to="/myfees" icon={MdOutlinePayments} text="My Fees" />
//             {/* <MenuItem to="/studentnotices" icon={BiNotepad} text="Notices" /> */}
//             <MenuItem to="/adddoubt" icon={AiOutlineQuestionCircle} text="Ask Doubt" />
//             <MenuItem to="/myreports" icon={BsFillBookmarkCheckFill} text="My Reports" />
//           </>
//         )}

//         {user?.userType === "teacher" && (
//           <>
//             <MenuItem to="/teacherprofile" icon={CgProfile} text="My Profile" />
//             <MenuItem to="/markattendance" icon={MdAssignment} text="Mark Attendance" />
//             <MenuItem to="/doubts" icon={AiOutlineQuestionCircle} text="Student Doubts" />
//             <MenuItem to="/createreport" icon={BiDetail} text="Create Report" />
//           </>
//         )}

//         {user?.userType === "admin" && (
//           <>
//             <MenuItem to="/teachers" icon={FaChalkboardTeacher} text="Teachers" />
//             <MenuItem to="/students" icon={AiOutlineUserAdd} text="Students" />
//             <MenuItem to="/classes" icon={MdClass} text="Classes" />
//             <MenuItem to="/admins" icon={RiAdminLine} text="Admins" />
//             <MenuItem to="/addnotice" icon={BiNotepad} text="Add Notice" />
//             <MenuItem to="/viewattendance" icon={MdAssignment} text="View Attendance" />
//             <MenuItem to="/fees" icon={MdOutlinePayments} text="Fee Management" />
//           </>
//         )}
//       </nav>

//       {/* Logout */}
//       <div className="px-3 py-3 border-t border-white/10">
//         <button
//           onClick={handleLogout}
//           className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
//             isOpen
//               ? "bg-white/5 text-rose-300 hover:bg-rose-500/10 hover:text-rose-400"
//               : "justify-center text-rose-300 hover:bg-rose-500/10"
//           }`}
//           title={!isOpen ? "Logout" : undefined}
//         >
//           <FiLogOut className="text-lg" />
//           {isOpen && <span className="text-sm font-medium">Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ImMenu } from "react-icons/im";
// import { FiLogOut } from "react-icons/fi";
// import {
//   MdDashboardCustomize,
//   MdAssignment,
//   MdClass,
//   MdOutlinePayments,
// } from "react-icons/md";
// import { AiOutlineUserAdd, AiOutlineQuestionCircle } from "react-icons/ai";
// import { CgProfile } from "react-icons/cg";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import { BiNotepad, BiDetail } from "react-icons/bi";
// import { BsFillBookmarkCheckFill } from "react-icons/bs";
// import { RiAdminLine } from "react-icons/ri";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     data: { user } = {},
//   } = useSelector((state) => state.auth || { data: {} });

//   const getRoleId = () => {
//     if (!user) return "";
//     switch (user.userType) {
//       case "admin":
//         return user.adminID || "";
//       case "student":
//         return user.studentID || "";
//       case "teacher":
//         return user.teacherID || "";
//       default:
//         return "";
//     }
//   };
//   const roleId = getRoleId();

//   const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024); // open on large screens
//   const OPEN_WIDTH = "260px";
//   const CLOSED_WIDTH = "72px";

//   // Handle resize to auto open/close
//   useEffect(() => {
//     const handleResize = () => {
//       setIsOpen(window.innerWidth >= 1024);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const width = isOpen ? OPEN_WIDTH : CLOSED_WIDTH;
//     document.documentElement.style.setProperty("--sidebar-width", width);
//     document.body.style.transition = "padding-left 220ms ease";
//     document.body.style.paddingLeft = width;
//   }, [isOpen]);

//   const handleLogout = () => {
//     dispatch({ type: "AUTH_LOGOUT" });
//     document.body.style.paddingLeft = "0px"; // reset padding
//     navigate("/");
//   };

//   const MenuItem = ({ to, icon: Icon, text }) => {
//     const active = location.pathname === to;
//     const base =
//       "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 select-none";
//     const activeCls =
//       "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg";
//     const idleCls =
//       "text-gray-300 hover:bg-white/5 hover:text-blue-300 hover:translate-x-1";

//     return (
//       <Link
//         to={to}
//         title={!isOpen ? text : undefined} // show tooltip when collapsed
//         className={`${base} ${active ? activeCls : idleCls}`}
//         aria-current={active ? "page" : undefined}
//       >
//         <Icon className="text-xl flex-shrink-0" />
//         {isOpen && <span className="whitespace-nowrap text-sm font-medium">{text}</span>}
//       </Link>
//     );
//   };

//   return (
//     <aside
//       aria-label="Sidebar navigation"
//       className={`fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300
//         bg-gradient-to-b from-gray-900 to-slate-900 text-white shadow-2xl
//         ${isOpen ? "w-[260px]" : "w-[72px]"}`}
//     >
//       {/* Header */}
//       <div className={`flex flex-col border-b border-white/10 px-4 py-4`}>
//         <div className="flex items-center justify-start w-full">
//           {isOpen ? (
//             <div className="flex items-center gap-0 select-none">
//               <span className="text-lg font-extrabold tracking-tight text-slate-50">
//                 School
//               </span>
//               <span className="text-lg font-extrabold tracking-tight text-blue-400">
//                 Hub
//               </span>
//             </div>
//           ) : (
//             <span className="text-lg font-bold text-blue-400"><span className="text-lg font-extrabold tracking-tight text-slate-50">
//                 S
//               </span>HUB</span>
//           )}
//         </div>

//         {/* Role + Badge */}
//         {user?.userType && (
//           <div
//             className={`flex items-center mt-3 transition-all duration-300 ${
//               isOpen ? "gap-3" : "justify-center"
//             }`}
//           >
//             <div className="bg-blue-600/90 text-yellow-400/90 text-xs font-bold px-3 py-1 rounded-full shadow-md">
//               {roleId}
//             </div>
//             {isOpen && (
//               <span className="text-sm font-semibold text-slate-200">
//                 {user.userType.toUpperCase()}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 overflow-auto p-3 space-y-1">
//         <MenuItem to="/dashboard" icon={MdDashboardCustomize} text="Dashboard" />

//         {user?.userType === "student" && (
//           <>
//             <MenuItem to="/studentprofile" icon={CgProfile} text="My Profile" />
//             <MenuItem to="/myattendance" icon={MdAssignment} text="My Attendance" />
//             <MenuItem to="/myfees" icon={MdOutlinePayments} text="My Fees" />
//             <MenuItem to="/adddoubt" icon={AiOutlineQuestionCircle} text="Ask Doubt" />
//             <MenuItem to="/myreports" icon={BsFillBookmarkCheckFill} text="My Reports" />
//           </>
//         )}

//         {user?.userType === "teacher" && (
//           <>
//             <MenuItem to="/teacherprofile" icon={CgProfile} text="My Profile" />
//             <MenuItem to="/markattendance" icon={MdAssignment} text="Mark Attendance" />
//             <MenuItem to="/doubts" icon={AiOutlineQuestionCircle} text="Student Doubts" />
//             <MenuItem to="/createreport" icon={BiDetail} text="Create Report" />
//           </>
//         )}

//         {user?.userType === "admin" && (
//           <>
//             <MenuItem to="/teachers" icon={FaChalkboardTeacher} text="Teachers" />
//             <MenuItem to="/students" icon={AiOutlineUserAdd} text="Students" />
//             <MenuItem to="/classes" icon={MdClass} text="Classes" />
//             <MenuItem to="/admins" icon={RiAdminLine} text="Admins" />
//             <MenuItem to="/addnotice" icon={BiNotepad} text="Add Notice" />
//             <MenuItem to="/viewattendance" icon={MdAssignment} text="View Attendance" />
//             <MenuItem to="/fees" icon={MdOutlinePayments} text="Fee Management" />
//           </>
//         )}
//       </nav>

//       {/* Logout */}
//       <div className="px-3 py-3 border-t border-white/10">
//         <button
//           onClick={handleLogout}
//           className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
//             isOpen
//               ? "bg-white/5 text-rose-300 hover:bg-rose-500/10 hover:text-rose-400"
//               : "justify-center text-rose-300 hover:bg-rose-500/10"
//           }`}
//           title={!isOpen ? "Logout" : undefined}
//         >
//           <FiLogOut className="text-lg" />
//           {isOpen && <span className="text-sm font-medium">Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import {
  MdDashboardCustomize,
  MdAssignment,
  MdClass,
  MdOutlinePayments,
} from "react-icons/md";
import { AiOutlineUserAdd, AiOutlineQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiNotepad, BiDetail } from "react-icons/bi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: { user } = {} } = useSelector((state) => state.auth || { data: {} });

  const getRoleId = () => {
    if (!user) return "";
    switch (user.userType) {
      case "admin":
        return user.adminID || "";
      case "student":
        return user.studentID || "";
      case "teacher":
        return user.teacherID || "";
      default:
        return "";
    }
  };
  const roleId = getRoleId();

  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024); 
  const OPEN_WIDTH = "260px";
  const CLOSED_WIDTH = "72px";

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const width = isOpen ? OPEN_WIDTH : CLOSED_WIDTH;
    document.documentElement.style.setProperty("--sidebar-width", width);
    document.body.style.transition = "padding-left 220ms ease";
    document.body.style.paddingLeft = width;
  }, [isOpen]);

  const handleLogout = () => {
    dispatch({ type: "AUTH_LOGOUT" });
    document.body.style.paddingLeft = "0px";
    navigate("/");
  };

  const MenuItem = ({ to, icon: Icon, text }) => {
    const active = location.pathname === to;
    const base = "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 select-none";
    const activeCls = "bg-blue-100 text-blue-700 font-semibold shadow";
    const idleCls = "text-gray-700 hover:bg-gray-200 hover:text-blue-600";

    return (
      <Link
        to={to}
        title={!isOpen ? text : undefined}
        className={`${base} ${active ? activeCls : idleCls}`}
        aria-current={active ? "page" : undefined}
      >
        <Icon className="text-xl flex-shrink-0" />
        {isOpen && <span className="whitespace-nowrap text-sm font-medium">{text}</span>}
      </Link>
    );
  };

  return (
    <aside
      aria-label="Sidebar navigation"
      className={`fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300
        bg-gradient-to-b from-white to-gray-100 text-gray-800 shadow-lg
        ${isOpen ? "w-[260px]" : "w-[72px]"}`}
    >
      {/* Header */}
      <div className="flex flex-col border-b border-gray-300 px-4 py-4">
        <div className="flex items-center justify-start w-full">
          {isOpen ? (
            <div className="flex items-center gap-1 select-none">
              <span className="text-lg font-extrabold tracking-tight text-gray-800">
                School
              </span>
              <span className="text-lg font-extrabold tracking-tight text-blue-600">
                Hub
              </span>
            </div>
          ) : (
            <span className="text-lg font-extrabold tracking-tight text-blue-600"><span className="text-lg font-extrabold tracking-tight text-gray-800">
                S
              </span>HUB</span>
          )}
        </div>

        {/* Role + Badge */}
        {user?.userType && (
          <div className={`flex items-center mt-3 transition-all duration-300 ${isOpen ? "gap-3" : "justify-center"}`}>
            <div className="bg-blue-200 text-yellow-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {roleId}
            </div>
            {isOpen && <span className="text-sm font-semibold text-gray-700">{user.userType.toUpperCase()}</span>}
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-auto p-3 space-y-1">
        <MenuItem to="/dashboard" icon={MdDashboardCustomize} text="Dashboard" />

        {user?.userType === "student" && (
          <>
            <MenuItem to="/studentprofile" icon={CgProfile} text="My Profile" />
            <MenuItem to="/myattendance" icon={MdAssignment} text="My Attendance" />
            <MenuItem to="/myfees" icon={MdOutlinePayments} text="My Fees" />
            <MenuItem to="/adddoubt" icon={AiOutlineQuestionCircle} text="Ask Doubt" />
            <MenuItem to="/myreports" icon={BsFillBookmarkCheckFill} text="My Reports" />
          </>
        )}

        {user?.userType === "teacher" && (
          <>
            <MenuItem to="/teacherprofile" icon={CgProfile} text="My Profile" />
            <MenuItem to="/markattendance" icon={MdAssignment} text="Mark Attendance" />
            <MenuItem to="/doubts" icon={AiOutlineQuestionCircle} text="Student Doubts" />
            <MenuItem to="/createreport" icon={BiDetail} text="Create Report" />
          </>
        )}

        {user?.userType === "admin" && (
          <>
            <MenuItem to="/teachers" icon={FaChalkboardTeacher} text="Teachers" />
            <MenuItem to="/students" icon={AiOutlineUserAdd} text="Students" />
            <MenuItem to="/classes" icon={MdClass} text="Classes" />
            <MenuItem to="/admins" icon={RiAdminLine} text="Admins" />
            <MenuItem to="/addnotice" icon={BiNotepad} text="Add Notice" />
            <MenuItem to="/viewattendance" icon={MdAssignment} text="View Attendance" />
            <MenuItem to="/fees" icon={MdOutlinePayments} text="Fee Management" />
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
            isOpen ? "bg-gray-100 text-rose-600 hover:bg-rose-100 hover:text-rose-700" : "justify-center text-rose-600 hover:bg-rose-100"
          }`}
          title={!isOpen ? "Logout" : undefined}
        >
          <FiLogOut className="text-lg" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

