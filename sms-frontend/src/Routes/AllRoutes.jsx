import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Dashboard/Dashboard-Login/LoginPage";
import AddNotice from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddNotice";
// import AddAdmin from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddAdmin";
import AddTeacher from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddTeacher";
import AddStudent from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddStudent";
import AllDoubts from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AllDoubts";
import CheckReports from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/CheckReports";
import CreateReport from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/CreateReport";
import TeacherProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/TeacherProfile";
import AddDoubt from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/AddDoubt";
import StudentProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/StudentProfile";
import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import Teachers from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Teachers";
import Students from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Students";
import Admins from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Admins";
import GalleryHub from '../Pages/Dashboard/Main-Dashboard/GlobalFiles/GalleryHub';
import LandingPage from "../Pages/Dashboard/Dashboard-Login/LandingPage";
import MyAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/MyAttendance";
import MyFees from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/MyFees";
// import StudentNotices from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/StudentNotices";
import MyReports from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/MyReports";
import MarkAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/MarkAttendance";
import Classes from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Classes";
import ViewAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/ViewAttendance";
import Fees from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/Fees";





const AllRoutes = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<FrontPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/firstAdmin" element={<AdminRegister />} /> */}
          <Route path="/dashboard" element={<FrontPage />} />
          <Route path="/addteacher" element={<AddTeacher />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/students" element={<Students />} />
          <Route path="/doubts" element={<AllDoubts />} />
          {/* <Route path="/addadmin" element={<AddAdmin />} /> */}
          <Route path="/admins" element={<Admins />} />

          <Route path="/myattendance" element={<MyAttendance />} />
          <Route path="/myfees" element={<MyFees />} />
          {/* <Route path="/studentnotices" element={<StudentNotices />} /> */}
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/markattendance" element={<MarkAttendance />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/viewattendance" element={<ViewAttendance />} />
          <Route path="/fees" element={<Fees />} />

          <Route path="/addnotice" element={<AddNotice />} />
          <Route path="/checkreports" element={<CheckReports />} />
          <Route path="/createreport" element={<CreateReport />} />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/adddoubt" element={<AddDoubt />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path='/gallery'element={<GalleryHub/>}/>
        </Routes>

    </>
  );
};

export default AllRoutes;
