

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Radio, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AdminLogin,
  forgetPassword,
  StudentLogin,
  TeacherLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placement, setPlacement] = useState("Student");
  const [formvalue, setFormvalue] = useState({ ID: "", password: "" });
  const [forgetPasswordData, setForgetPasswordData] = useState({
    type: "",
    email: "",
  });
  const [forgetLoading, setForgetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let res;
    if (placement === "Student") {
      res = await dispatch(
        StudentLogin({ ...formvalue, studentID: formvalue.ID })
      );
    } else if (placement === "Teacher") {
      res = await dispatch(
        TeacherLogin({ ...formvalue, teacherID: formvalue.ID })
      );
    } else if (placement === "Admin") {
      res = await dispatch(
        AdminLogin({ ...formvalue, adminID: formvalue.ID })
      );
    }

    setLoading(false);
    if (res?.message === "Successful") {
      notify("Login Successful");
      navigate("/dashboard");
    } else {
      notify(res?.message || "Something went wrong");
    }
  };

  const handleForgetPassword = (e) => {
    setForgetPasswordData({
      ...forgetPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = () => {
    if (!forgetPasswordData.type || !forgetPasswordData.email) {
      return notify("Please fill all details");
    }
    setForgetLoading(true);
    dispatch(forgetPassword(forgetPasswordData)).then((data) => {
      setForgetLoading(false);
      if (!data.success) {
        return notify("User Not Found");
      }
      setForgetPasswordData({ type: "", email: "" });
      setOpen(false);
      notify("Account details sent");
    });
  };

  if (data?.isAuthenticated === true) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-[400px]">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h1>

          {/* User Type */}
          <div className="flex justify-center mb-6">
            <Radio.Group
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className="space-x-2"
            >
              <Radio.Button value="Student">Student</Radio.Button>
              <Radio.Button value="Teacher">Teacher</Radio.Button>
              <Radio.Button value="Admin">Admin</Radio.Button>
            </Radio.Group>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {placement} ID
              </label>
              <input
                type="text"
                name="ID"
                value={formvalue.ID}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formvalue.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:brightness-110 transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center text-sm mt-2">
              Forget Password?{" "}
              <span
                onClick={() => setOpen(true)}
                className="text-blue-600 font-medium cursor-pointer"
              >
                Get it on Email!
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        title="Forget Password"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Choose Type
            </label>
            <select
              name="type"
              value={forgetPasswordData.type}
              onChange={handleForgetPassword}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">User Type</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              name="email"
              value={forgetPasswordData.email}
              onChange={handleForgetPassword}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {forgetLoading ? "Loading..." : "Send Mail"}
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default LoginPage;

// import { Eye, EyeOff } from "lucide-react";
// import React, { useState } from "react";
// import { Radio, Drawer } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import {
//   AdminLogin,
//   forgetPassword,
//   StudentLogin,
//   TeacherLogin,
// } from "../../../Redux/auth/action";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";

// const notify = (text) => toast(text);

// const LoginPage = () => {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [placement, setPlacement] = useState("Student");
//   const [formvalue, setFormvalue] = useState({ ID: "", password: "" });
//   const [forgetPasswordData, setForgetPasswordData] = useState({
//     type: "",
//     email: "",
//   });
//   const [forgetLoading, setForgetLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const { data } = useSelector((store) => store.auth);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let res;
//     if (placement === "Student") {
//       res = await dispatch(
//         StudentLogin({ ...formvalue, studentID: formvalue.ID })
//       );
//     } else if (placement === "Teacher") {
//       res = await dispatch(
//         TeacherLogin({ ...formvalue, teacherID: formvalue.ID })
//       );
//     } else if (placement === "Admin") {
//       res = await dispatch(AdminLogin({ ...formvalue, adminID: formvalue.ID }));
//     }

//     setLoading(false);
//     if (res?.message === "Successful") {
//       notify("Login Successful");
//       navigate("/dashboard");
//     } else {
//       notify(res?.message || "Something went wrong");
//     }
//   };

//   const handleForgetPassword = (e) => {
//     setForgetPasswordData({
//       ...forgetPasswordData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleChangePassword = () => {
//     if (!forgetPasswordData.type || !forgetPasswordData.email) {
//       return notify("Please fill all details");
//     }
//     setForgetLoading(true);
//     dispatch(forgetPassword(forgetPasswordData)).then((data) => {
//       setForgetLoading(false);
//       if (!data.success) {
//         return notify("User Not Found");
//       }
//       setForgetPasswordData({ type: "", email: "" });
//       setOpen(false);
//       notify("Account details sent");
//     });
//   };

//   if (data?.isAuthenticated === true) {
//     return <Navigate to={"/dashboard"} />;
//   }

//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
//         <motion.div
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
//         >
//           {/* Branding */}
//           <div className="text-center mb-8">
//             {/* <h1 className="text-3xl font-extrabold">
//               <span className="text-blue-600">School</span>
//               <span className="text-slate-800">Hub</span>
//             </h1> */}
//             <p className="text-bold-500 text-sm">Secure Login to Dashboard</p>
//           </div>

//           {/* User Type */}
//           <div className="flex justify-center mb-6">
//             <Radio.Group
//               value={placement}
//               onChange={(e) => setPlacement(e.target.value)}
//               className="space-x-2"
//             >
//               <Radio.Button value="Student">Student</Radio.Button>
//               <Radio.Button value="Teacher">Teacher</Radio.Button>
//               <Radio.Button value="Admin">Admin</Radio.Button>
//             </Radio.Group>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-medium text-gray-700">
//                 {placement} ID
//               </label>
//               <input
//                 type="text"
//                 name="ID"
//                 value={formvalue.ID}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formvalue.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 cursor-pointer text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:brightness-110 transition"
//             >
//               {loading ? "Loading..." : "Login"}
//             </button>

//             <p className="text-center text-sm mt-3">
//               Forgot Password?{" "}
//               <span
//                 onClick={() => setOpen(true)}
//                 className="text-blue-600 font-medium cursor-pointer hover:underline"
//               >
//                 Get it on Email
//               </span>
//             </p>
//           </form>
//         </motion.div>
//       </div>

//       {/* Drawer */}
//       <Drawer
//         title="Forget Password"
//         placement="right"
//         onClose={() => setOpen(false)}
//         open={open}
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               User Type
//             </label>
//             <input
//               type="text"
//               name="type"
//               value={forgetPasswordData.type}
//               onChange={handleForgetPassword}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={forgetPasswordData.email}
//               onChange={handleForgetPassword}
//               className="w-full p-2 border rounded-lg"
//             />
//           </div>
//           <button
//             onClick={handleChangePassword}
//             disabled={forgetLoading}
//             className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             {forgetLoading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </div>
//       </Drawer>
//     </>
//   );
// };

// export default LoginPage;


