



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import axios from "axios";

const GalleryHub = () => {
  const { user } = useSelector((state) => state.auth.data);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null); // store image id for delete
  const navigate = useNavigate();

  const filterButtons = ["All", "Annual Day", "Competition", "Fun Fair", "Sports Day"];

  // Fetch images
  const fetchImages = async () => {
    try {
      const res = await axios.get("/gallery");
      const reversed = res.data.reverse();
      setImages(reversed);
      setFilteredImages(reversed);
    } catch (err) {
      console.error("Error fetching gallery", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Carousel auto-slide for latest 2 images
  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % Math.min(images.length, 2));
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const normalizeText = (text) => text?.toLowerCase().replace(/\s+/g, "") || "";

  const filterCategory = (filterText) => {
    setActiveCategory(filterText);
    if (filterText === "All") {
      setFilteredImages(images);
    } else {
      const normalizedFilter = normalizeText(filterText);
      const filtered = images.filter((img) =>
        normalizeText(img.title).includes(normalizedFilter)
      );
      setFilteredImages(filtered);
    }
  };

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/gallery/${id}`);
      fetchImages();
      setConfirmDelete(null);
      setCurrentIndex(null);
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">

        {/* Carousel */}
        {images.length > 0 && (
          <div className="relative w-full max-w-5xl mx-auto mb-6 overflow-hidden rounded-lg shadow-lg h-80 md:h-96">
            
            {/* Back button top-left */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md bg-black/30 text-white hover:bg-black/50 shadow-sm flex"
            >
              <ChevronLeft size={20} /> Back
            </button>

            {/* Gallery title top-center */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-black bg-opacity-50 text-white px-4 py-1 rounded-md">
              <h1 className="text-xl font-bold uppercase">Gallery</h1>
            </div>

            <AnimatePresence initial={false}>
              {images.slice(0, 2).map((img, idx) => (
                idx === carouselIndex && (
                  <motion.div
                    key={img._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 w-full text-left text-white">
                      <h3 className="font-bold text-lg truncate">{img.title}</h3>
                      {img.description && (
                        <p className="text-sm truncate">{img.description}</p>
                      )}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 overflow-x-auto">
          {filterButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => filterCategory(btn)}
              className={`px-3 py-1 rounded-full text-sm transition
                ${activeCategory === btn
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <p className="text-gray-500 text-center mt-12 text-lg">No photos available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img._id || idx}
                className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                onClick={() => setCurrentIndex(idx)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 w-full text-white text-left">
                  <h3 className="font-semibold text-sm md:text-base truncate">{img.title}</h3>
                  {img.description && (
                    <p className="text-xs md:text-sm truncate">{img.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {currentIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
            >
              <button
                onClick={() => setCurrentIndex(null)}
                className="absolute top-5 right-5 p-3 rounded-full hover:bg-gray-800 text-white"
              >
                <X size={28} />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-5 p-3 rounded-full hover:bg-gray-800 text-white"
              >
                <ChevronLeft size={40} />
              </button>

              <div className="relative max-w-4xl max-h-full mx-auto">
                <img
                  src={filteredImages[currentIndex].url}
                  alt={filteredImages[currentIndex].title}
                  className="rounded-lg max-h-[80vh] object-contain mx-auto"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 p-2 rounded text-white text-left">
                  <h3 className="font-semibold">{filteredImages[currentIndex].title}</h3>
                  {filteredImages[currentIndex].description && (
                    <p className="text-sm">{filteredImages[currentIndex].description}</p>
                  )}
                </div>

                {/* Download & Delete for admins */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={filteredImages[currentIndex].url}
                    download
                    className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                  >
                    <Download size={16} />
                  </a>
                  {user?.userType === "admin" && (
                    <button
                      onClick={() => setConfirmDelete(filteredImages[currentIndex]._id)}
                      className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={nextImage}
                className="absolute right-5 p-3 rounded-full hover:bg-gray-800 text-white"
              >
                <ChevronRight size={40} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation div */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
              <p className="mb-4 text-gray-800 font-semibold">Are you sure you want to delete this image?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryHub;


