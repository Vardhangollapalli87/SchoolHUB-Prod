



import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const res = await fetch("/admin");
        const data = await res.json();
        setAdmins(data);
      } catch (err) {
        console.error("Failed to fetch admins:", err);
        notify("Failed to fetch admins");
      }
      setLoading(false);
    };
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter(
    (admin) =>
      (admin.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (admin.adminID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (admin.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admins</h1>


          {/* Loading / No Data */}
          {loading ? (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
              Loading admins...
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
              No admins found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAdmins.map((admin) => (
                <div
                  key={admin._id}
                  className="bg-gray-50 rounded-md shadow-sm p-5 hover:shadow-md transition border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{admin.name || "-"}</h2>
                    <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                      {admin.adminID || "-"}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold text-gray-900">Email:</span> {admin.email || "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admins;

