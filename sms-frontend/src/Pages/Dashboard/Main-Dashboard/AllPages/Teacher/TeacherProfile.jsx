

// import React, { useState } from "react";
// import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { MdOutlineCastForEducation } from "react-icons/md";
// import { FaBirthdayCake, FaRegHospital, FaMapMarkedAlt } from "react-icons/fa";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, message, Modal } from "antd";
// import { UpdateTeacher } from "../../../../../Redux/auth/action";
// import { Navigate } from "react-router-dom";

// const TeacherProfile = () => {
//   const { data } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   const [editOpen, setEditOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const showEditModal = () => setEditOpen(true);
//   const handleEditCancel = () => setEditOpen(false);
//   const showPreview = () => setPreviewOpen(true);
//   const handlePreviewClose = () => setPreviewOpen(false);

//   const [messageApi, contextHolder] = message.useMessage();
//   const success = (text) => messageApi.success(text);

//   const [formData, setFormData] = useState({
//     age: data.user.age,
//     gender: data.user.gender,
//     education: data.user.education,
//     mobile: data.user.mobile,
//     DOB: data.user.DOB,
//   });

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = () => {
//     setConfirmLoading(true);
//     dispatch(UpdateTeacher(formData, data.user._id));
//     setTimeout(() => {
//       setConfirmLoading(false);
//       setEditOpen(false);
//       success("Profile updated successfully!");
//     }, 1200);
//   };

//   if (data?.isAuthenticated === false) return <Navigate to="/" />;
//   if (data?.user.userType !== "teacher") return <Navigate to="/dashboard" />;

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <>
//       {contextHolder}
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 bg-gray-100 min-h-screen p-10">

//           {/* Profile Card */}
//           <div
//             onClick={showPreview}
//             className="max-w-4xl mx-auto relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-indigo-100 transition hover:shadow-2xl hover:scale-[1.01] duration-300 cursor-pointer"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               <img
//                 src={data?.user?.image || "https://i.pravatar.cc/150?img=12"}
//                 alt="profile"
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//               />
//               <div className="flex-1 text-center md:text-left">
//                 <div className="flex items-center justify-center md:justify-start gap-3">
//                   <h1 className="text-3xl font-bold text-indigo-900">
//                     {data?.user?.teacherName}
//                   </h1>
//                 </div>
//                 <p className="text-lg text-indigo-700 mt-1">{data?.user?.subject}</p>
//               </div>
//               <Button
//                 onClick={(e) => { e.stopPropagation(); showEditModal(); }}
//                 icon={<AiFillEdit />}
//                 className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 shadow-md transition transform hover:scale-105"
//               >
//                 Edit Profile
//               </Button>
//             </div>
//           </div>

//           {/* Personal Info & School Info Cards */}
//           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//             {/* Personal Info */}
//             <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-100 transition hover:shadow-2xl hover:scale-[1.01] duration-300">
//               <div className="space-y-3 text-gray-700">
//                 <h2 className="text-xl font-semibold mb-4 text-yellow-800 border-b pb-2">
//                   Personal Information
//                 </h2>
//                 <p><strong>Age:</strong> {data?.user?.age}</p>
//                 <p><strong>Gender:</strong> {data?.user?.gender}</p>
//                 <p><strong>Mobile:</strong> {data?.user?.mobile}</p>
//                 <p><strong>Education:</strong> {data?.user?.education}</p>
//                 <p><strong>Date of Birth:</strong> {formatDate(data?.user?.DOB)}</p>
//               </div>
//             </div>

//             {/* School Info */}
//             <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-100 transition hover:shadow-2xl hover:scale-[1.01] duration-300">
//               <div className="space-y-3 text-gray-700">
//                 <h2 className="text-xl font-semibold mb-4 text-yellow-800 border-b pb-2">
//                   School Information
//                 </h2>
//                 <p><strong>School:</strong> RGUKT SCHOOL</p>
//                 <p><strong>Address:</strong> Rajiv Gandhi University of Knowledge Technologies, Basar, Telangana, India</p>
//                 <p><strong>Working Hours:</strong> 09:00 AM – 08:00 PM</p>
//               </div>
//             </div>
//           </div>


//           {/* Edit Modal */}
//           <Modal
//             title="Edit Profile"
//             open={editOpen}
//             confirmLoading={confirmLoading}
//             onCancel={handleEditCancel}
//             footer={[
//               <Button key="back" onClick={handleEditCancel}>Cancel</Button>,
//               <Button key="submit" type="primary" className="bg-indigo-600" onClick={handleFormSubmit}>
//                 Save
//               </Button>,
//             ]}
//           >
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Age</label>
//                 <input
//                   name="age"
//                   value={formData.age}
//                   onChange={handleFormChange}
//                   type="number"
//                   placeholder="Enter your age"
//                   className="p-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleFormChange}
//                   className="p-2 border rounded-md"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Mobile</label>
//                 <input
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleFormChange}
//                   type="number"
//                   placeholder="Enter mobile number"
//                   className="p-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Education</label>
//                 <input
//                   name="education"
//                   value={formData.education}
//                   onChange={handleFormChange}
//                   type="text"
//                   placeholder="Enter education details"
//                   className="p-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-700">Date of Birth</label>
//                 <input
//                   name="DOB"
//                   value={formData.DOB?.split("T")[0]}
//                   onChange={handleFormChange}
//                   type="date"
//                   placeholder="Select date of birth"
//                   className="p-2 border rounded-md"
//                 />
//               </div>
//             </form>
//           </Modal>

//         </div>
//       </div>
//     </>
//   );
// };

// export default TeacherProfile;


import React, { useState } from "react";
import { AiFillEdit, AiOutlineCamera } from "react-icons/ai";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal, Spin } from "antd";
import { UpdateTeacher, UpdateTeacherImage } from "../../../../../Redux/auth/action";
import { Navigate } from "react-router-dom";
import axios from "axios";

const TeacherProfile = () => {
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    age: data?.user?.age || "",
    gender: data?.user?.gender || "",
    education: data?.user?.education || "",
    mobile: data?.user?.mobile || "",
    DOB: data?.user?.DOB || "",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [teacherImage, setTeacherImage] = useState(
    data?.user?.image ||
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg"
  );

  const [messageApi, contextHolder] = message.useMessage();
  const success = (text) => messageApi.success(text);
  const errorMsg = (text) => messageApi.error(text);

  const showEditModal = () => setEditOpen(true);
  const handleEditCancel = () => setEditOpen(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = () => {
    setConfirmLoading(true);
    dispatch(UpdateTeacher(formData, data.user._id));
    setTimeout(() => {
      setConfirmLoading(false);
      setEditOpen(false);
      success("Profile updated successfully!");
    }, 1200);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const handleImageClick = () => {
    document.getElementById("teacherFileInput").click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !data?.user?._id) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setImageUploading(true);
      const response = await axios.post(
        `/teachers/upload/${data.user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update local state
      setTeacherImage(response.data.user.image);
      // Update Redux store
      dispatch(UpdateTeacherImage(data.user._id, response.data.user.image));
      success("Profile photo updated successfully!");
    } catch (err) {
      console.error("Error uploading image:", err);
      errorMsg("Error uploading image!");
    } finally {
      setImageUploading(false);
    }
  };

  if (data?.isAuthenticated === false) return <Navigate to="/" />;
  if (data?.user.userType !== "teacher") return <Navigate to="/dashboard" />;

  return (
    <>
      {contextHolder}
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 min-h-screen p-10">
          {/* Profile Card */}
          <div className="max-w-4xl mx-auto relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 transition hover:shadow-2xl hover:scale-[1.01] duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={teacherImage}
                  alt="profile"
                  onClick={handleImageClick}
                  title="Click to change profile photo"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover cursor-pointer hover:opacity-90 transition duration-200"
                />
                <div
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition"
                >
                  <AiOutlineCamera className="text-white text-lg" />
                </div>
                {imageUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
                    <Spin tip="Uploading..." className="text-white" />
                  </div>
                )}
                <input
                  id="teacherFileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Name & Subject */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-indigo-900">
                  {data?.user?.teacherName}
                </h1>
                <p className="text-lg text-indigo-700 mt-1">
                  {data?.user?.subject}
                </p>
              </div>

              {/* Edit Button */}
              <Button
                onClick={showEditModal}
                icon={<AiFillEdit />}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 shadow-md transition transform hover:scale-105"
              >
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Personal Info */}
            <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-100 transition hover:shadow-xl hover:scale-[1.01] duration-300">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">
                Personal Information
              </h2>
              <p><strong>Age:</strong> {data?.user?.age}</p>
              <p><strong>Gender:</strong> {data?.user?.gender}</p>
              <p><strong>Mobile:</strong> {data?.user?.mobile}</p>
              <p><strong>Education:</strong> {data?.user?.education}</p>
              <p><strong>Date of Birth:</strong> {formatDate(data?.user?.DOB)}</p>
            </div>

            {/* School Info */}
            <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-100 transition hover:shadow-xl hover:scale-[1.01] duration-300">
              <h2 className="text-xl font-semibold mb-4 text-yellow-800 border-b pb-2">
                School Information
              </h2>
              <p><strong>School:</strong> RGUKT SCHOOL</p>
              <p><strong>Address:</strong> Rajiv Gandhi University of Knowledge Technologies, Basar, Telangana, India</p>
              <p><strong>Working Hours:</strong> 09:00 AM – 08:00 PM</p>
            </div>
          </div>

          {/* Edit Modal */}
          <Modal
            title="Edit Profile"
            open={editOpen}
            confirmLoading={confirmLoading}
            onCancel={handleEditCancel}
            footer={[
              <Button key="back" onClick={handleEditCancel}>Cancel</Button>,
              <Button key="submit" type="primary" className="bg-indigo-600" onClick={handleFormSubmit}>
                Save
              </Button>,
            ]}
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  type="number"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Mobile</label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  type="number"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Education</label>
                <input
                  name="education"
                  value={formData.education}
                  onChange={handleFormChange}
                  type="text"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  name="DOB"
                  value={formData.DOB?.split("T")[0]}
                  onChange={handleFormChange}
                  type="date"
                  className="p-2 border rounded-md"
                />
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default TeacherProfile;