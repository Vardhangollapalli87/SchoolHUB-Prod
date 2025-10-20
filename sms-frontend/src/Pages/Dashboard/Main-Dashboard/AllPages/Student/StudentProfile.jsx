
import React, { useState } from "react";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateStudent } from "../../../../../Redux/auth/action";
import { Navigate } from "react-router-dom";

const Nurse_Profile = () => {
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentName: data?.user?.studentName || "",
    age: data?.user?.age || "",
    gender: data?.user?.gender || "",
    education: data?.user?.education || "",
    address: data?.user?.address || "",
    class: data?.user?.class || "",
    mobile: data?.user?.mobile || "",
    DOB: data?.user?.DOB || "",
    subject: data?.user?.subject || "",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = (text) => messageApi.success(text);

  const showEditModal = () => setEditOpen(true);
  const handleCancel = () => setEditOpen(false);

  const showPreview = () => setPreviewOpen(true);
  const handlePreviewClose = () => setPreviewOpen(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = () => {
    setConfirmLoading(true);
    dispatch(UpdateStudent(formData, data.user._id));
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

  if (data?.isAuthenticated === false) return <Navigate to="/" />;

  return (
    <>
      {contextHolder}
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 min-h-screen p-10">

          {/* Profile Card */}
          <div
            onClick={showPreview}
            className="max-w-4xl mx-auto relative bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-200 rounded-2xl shadow-xl p-8 transition hover:shadow-2xl hover:scale-[1.01] duration-300 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <img
                src={data?.user?.image || "https://i.pravatar.cc/150?img=47"}
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
              {/* Name & Subject */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-purple-900">
                  {data?.user?.studentName}
                </h1>
                <p className="text-lg text-purple-700 mt-1">
                  {data?.user?.subject}
                </p>
                <p className="text-gray-600">{data?.user?.class} Class</p>
              </div>
              {/* Edit Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  showEditModal();
                }}
                icon={<AiFillEdit />}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-4 py-2 shadow-md transition transform hover:scale-105"
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
              {/* <p><strong>Education:</strong> {data?.user?.education}</p> */}
              <p><strong>Address:</strong> {data?.user?.address}</p>
              <p><strong>Date of Birth:</strong> {formatDate(data?.user?.DOB)}</p>
            </div>

            {/* School Info */}
            <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-100 transition hover:shadow-xl hover:scale-[1.01] duration-300">
              <h2 className="text-xl font-semibold mb-4 text-yellow-800 border-b pb-2">
                School Details
              </h2>
              {/* <p><strong>Class:</strong> {data?.user?.class}</p> */}
              <p><strong>School:</strong> RGUKT SCHOOL</p>
              <p><strong>Address:</strong> Rajiv Gandhi University of Knowledge Technologies, Basar, Telangana, India</p>
              {/* <p><strong>Working Hours:</strong> 09:00 AM – 08:00 PM</p> */}
            </div>
          </div>


          {/* Edit Modal */}
          <Modal
            title="Edit Profile"
            open={editOpen}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                className="bg-purple-600"
                onClick={handleFormSubmit}
              >
                Save
              </Button>,
            ]}
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Enter full name"
                  className="p-2 border rounded-md"
                />
              </div>
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
              {/* <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Education</label>
                <input
                  name="education"
                  value={formData.education}
                  onChange={handleFormChange}
                  type="text"
                  className="p-2 border rounded-md"
                />
               </div> */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  type="text"
                  className="p-2 border rounded-md"
                />
              </div>
              {/* <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Class</label>
                <input
                  name="class"
                  value={formData.class}
                  onChange={handleFormChange}
                  type="text"
                  className="p-2 border rounded-md"
                /> 
              </div>*/}
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

export default Nurse_Profile;
