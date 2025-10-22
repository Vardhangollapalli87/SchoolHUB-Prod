import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaChalkboardTeacher,
  FaUsers,
  FaBookOpen,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBell,
  FaChartLine,
  FaTrophy,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Image credits / download links are at the bottom of this file (HERO_IMAGES and GALLERY_IMAGES arrays).
 * You can swap the URLs if you have your own images.
 */

const HERO_IMAGES = [
  // nice gentle school / campus backgrounds from Unsplash (free)
  {
    url:
    "/images/photo2.jpeg",
    credit: "Photo by Perttu Sirviö / Unsplash",
  },
  {
    url:
      '/images/photo1.jpeg',
    credit: "Photo by Nathan Dumlao / Unsplash",
  },
  {
    url:
      "/images/photo4.jpg",
    credit: "Photo by Souvik Banerjee / Unsplash",
  },
];

const GALLERY_IMAGES = [
  {
    url:"/images/achievements.jpeg",
    title: "Achievements",
  },
  {
    url:"/images/annual1.jpg",
    title: "Annual Day",
  },
  {
    url: "/images/notice.png",
    title: "Notice Board",
  },
  {
    url: '/images/sports.webp',
    title: "Sports Day",
  },
];

const navItems = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const FeatureCard = ({ icon, title, text }) => {
  // small tilt effect on mousemove
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "perspective(700px) rotateX(0deg) rotateY(0deg)" });

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top; // y position within element
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -6; // rotateX
    const ry = ((x - cx) / cx) * 6; // rotateY
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`,
    });
  }
  function handleLeave() {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)" });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      whileHover={{ boxShadow: "0px 18px 40px rgba(59,130,246,0.14)" }}
      className="bg-white rounded-2xl p-6 text-center cursor-default transition-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-blue-600 text-4xl mb-4 inline-flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{text}</p>
    </motion.div>
  );
};

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [contactSuccess, setContactSuccess] = useState(false);

  // auto-advance hero
  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((s) => s.id);
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // check if anchor point (top 120px) is inside
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openLightbox = (idx) => setLightbox({ open: true, idx });
  const closeLightbox = () => setLightbox({ open: false, idx: 0 });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      setContactSuccess(false);
      // basic client-side validation
      alert("Please fill name, email & message.");
      return;
    }
    // Simple mailto approach (user's mail client will open)
    const subject = encodeURIComponent(`Contact from ${name} via SchoolHub`);
    const body = encodeURIComponent(`${message}\n\n---\nName: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:support@schoolhub.com?subject=${subject}&body=${body}`;
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 4000);
    form.reset();
  };

  return (
    <div className="antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-1">
                <span className="text-slate-900 font-extrabold text-xl md:text-3xl">School</span>
                <span className="text-blue-600 font-extrabold text-xl md:text-3xl">Hub</span>
              </Link>

          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <ul className="flex gap-6 items-center">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`text-sm font-medium transition-all ${
                      activeSection === item.id ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </a>
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-2 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded"
                    />
                  )}
                </li>
              ))}
            </ul>
            <motion.div whileHover={{ scale: 1.03 }} className="ml-6">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-800 hover:shadow hover:shadow-blue-100 transition inline-block"
                aria-label="Login"
              >
                Login
              </Link>
            </motion.div>
          </nav>

          {/* mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="md:hidden border-t border-gray-100 bg-white shadow-sm"
            >
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    onClick={(e) => handleNavClick(e, item.id)}
                    href={`#${item.id}`}
                    className={`block text-base font-medium ${
                      activeSection === item.id ? "text-blue-600" : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 mt-2 text-center border rounded-md border-slate-200"
                >
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="home" className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        {/* carousel background images (fade) */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={HERO_IMAGES[heroIndex].url}
              alt={`Hero ${heroIndex + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9 }}
              className="object-cover w-full h-full"
              style={{ willChange: "opacity, transform" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        {/* hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 h-full flex flex-col justify-center items-start md:items-center text-center md:text-center">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md"
          >
            Welcome to <span className="text-slate-100"> </span>
            <span className="block text-white/95">
              <span className="text-slate-900 bg-white/10 px-2 rounded-md">School</span>{" "}
              <span className="text-blue-400">Hub</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 max-w-3xl text-slate-100/90 text-lg md:text-xl"
          >
            “Your School, Your Hub.” — <span className="font-medium">SchoolHub</span>
          </motion.p>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-3xl text-slate-200"
          >
            A modern, secure, and simple school management platform — admissions, attendance, fees, notices,
            performance tracking and parent communication — everything unified in one place.
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-4 items-center justify-center"
          >
            <motion.a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              whileHover={{ scale: 1.04 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-pink-500 shadow-xl"
            >
              Get Started
            </motion.a>

            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 rounded-full text-white/90 hover:bg-white/10 transition"
            >
              View More
            </a>
          </motion.div>

          {/* carousel controls */}
          <div className="absolute bottom-6 left-6 md:left-12 flex items-center gap-3">
            <button
              aria-label="previous"
              onClick={() => setHeroIndex((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
              className="rounded-md p-2 bg-white/10 text-white hover:bg-white/20 transition"
            >
              ‹
            </button>
            <div className="flex items-center gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    heroIndex === i ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              aria-label="next"
              onClick={() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length)}
              className="rounded-md p-2 bg-white/10 text-white hover:bg-white/20 transition"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Powerful features built for schools</h2>
              <p className="mt-2 text-slate-600 max-w-xl">
                Everything a school needs to manage daily operations with simplicity and security.
                We designed SchoolHub to remove friction — for admins, teachers and parents.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-100"
                onClick={(e) => handleNavClick(e, "contact")}
              >
                Contact Sales
              </button>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:brightness-95"
              >
                Get a demo
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FaBookOpen />}
              title="Academic Management"
              text="Timetable, subjects, syllabus & assessments — unified, easy scheduling with conflict detection."
            />
            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Teacher Tools"
              text="Gradebooks, assignments, attendance and parent messaging built for workflow efficiency."
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Parent Gateway"
              text="Real-time updates, fee status, reports and direct messaging between parents and teachers."
            />
            <FeatureCard
              icon={<FaTrophy />}
              title="Achievement Tracking"
              text="Celebrate students: awards, events and portfolios — shareable and secure."
            />
            <FeatureCard
              icon={<FaBell />}
              title="Smart Notifications"
              text="Push and email alerts for announcements, emergencies, reminders and approvals."
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Analytics Dashboard"
              text="Actionable reports and insights to help administrators make data-driven decisions."
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Campus Life & Events</h2>
            <p className="text-slate-600 mt-2">
              Photos and highlights from events, achievements and day-to-day campus life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl bg-slate-100 shadow-sm"
                onClick={() => openLightbox(idx)}
              >
                {/* Only image scales on hover */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 hover:scale-110"
                  style={{ transformOrigin: "center" }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <h3 className="text-white font-semibold">{img.title}</h3>
                  <p className="text-white/80 text-sm">Highlights & memories from our school events.</p>
                </div>
                <div className="absolute top-3 right-3 text-xs px-2 py-1 bg-white/70 rounded-md text-slate-700">Click to open</div>
              </div>
            ))}
          </div>
        </div>

        {/* lightbox */}
        <AnimatePresence>
          {lightbox.open && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="max-w-4xl w-full mx-4 rounded-xl overflow-hidden bg-white"
              >
                <div className="flex justify-end p-2">
                  <button onClick={closeLightbox} className="text-slate-700 p-2 rounded-md hover:bg-slate-100">
                    Close
                  </button>
                </div>
                <img src={GALLERY_IMAGES[lightbox.idx].url} alt={GALLERY_IMAGES[lightbox.idx].title} className="w-full object-cover max-h-[80vh]" />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{GALLERY_IMAGES[lightbox.idx].title}</h3>
                  <p className="text-sm text-slate-600 mt-1">Click outside or Close to exit. You can download high-res from the links provided in the file header.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">About SchoolHub</h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              SchoolHub was created to simplify school administration and bring transparency between schools, parents and teachers.
              We build practical tools — not just features — to save time and keep communication clear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* ellipse-shaped cards */}
            <motion.div
              className="ellipse bg-white p-6 shadow rounded-2xl flex flex-col items-center text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl text-blue-600 mb-4"><FaChalkboardTeacher /></div>
              <h4 className="font-semibold text-slate-900">Who we are</h4>
              <p className="text-sm text-slate-600 mt-2">
                A small team of educators & engineers passionate about making school operations smooth, traceable and low-friction.
              </p>
            </motion.div>

            <motion.div
              className="ellipse bg-white p-6 shadow rounded-2xl flex flex-col items-center text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl text-blue-600 mb-4"><FaBookOpen /></div>
              <h4 className="font-semibold text-slate-900">Why we built it</h4>
              <p className="text-sm text-slate-600 mt-2">
                To reduce admin overhead, improve parent engagement, and give teachers better tools — so schools focus on learning.
              </p>
            </motion.div>

            <motion.div
              className="ellipse bg-white p-6 shadow rounded-2xl flex flex-col items-center text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl text-blue-600 mb-4"><FaChartLine /></div>
              <h4 className="font-semibold text-slate-900">Our approach</h4>
              <p className="text-sm text-slate-600 mt-2">
                Build reliable, privacy-conscious features with strong UX — analytics, notifications, and unified data, all accessible and secure.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto text-center">
            <p className="text-slate-600">
              If you'd like a custom demo for your school (or district), click <a href="#contact" onClick={(e)=>handleNavClick(e,'contact')} className="text-blue-600 underline">Contact</a> and we'll get you scheduled.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-10 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Get in <span className="text-blue-600">Touch</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Have any questions or suggestions? We'd love to hear from you.  
              Fill out the form or reach us directly via the details below.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-gray-700">
                📍 <span>Hyderabad, India</span>
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                📞 <span>+91 090-190-4006</span>
              </p>
              <p className="flex items-center gap-3 text-gray-700">
                ✉️ <a href="mailto:support@schoolhub.com" className="text-blue-600 hover:underline">support@schoolhub.com</a>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <div className="bg-slate-50  rounded-2xl p-8 ">
            <form onSubmit={handleContactSubmit} className="grid md:grid-cols-2 gap-6">
              <input
                name="name"
                placeholder="Your name"
                className="p-3 text-sm rounded-md bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition col-span-2 md:col-span-1"
              />
              <input
                name="email"
                placeholder="Your email"
                className="p-3 text-sm rounded-md bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition col-span-2 md:col-span-1"
              />
              <input
                name="subject"
                placeholder="Subject (optional)"
                className="p-3 text-sm rounded-md bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition col-span-2"
              />
              <textarea
                name="message"
                placeholder="Your message"
                rows="5"
                className="p-3 text-sm rounded-md bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition col-span-2"
              />
              <div className="col-span-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 text-sm py-3 rounded-md bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
                >
                  Send Message
                </button>
                {contactSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-green-600 font-medium"
                  >
                    Message handed to your mail client ✔
                  </motion.div>
                )}
              </div>
            </form>
          </div>

        </div>
      </section>


      {/* FOOTER (kept structure similar to your original) */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-4 gap-8 mb-8">
          <div>
          <h2 className="text-2xl font-bold mb-2">
  <span className="text-blue-400">School</span><span className="text-white">Hub</span>
          </h2>

            <p className="text-slate-400 text-sm">
              Empowering schools with technology for a smarter future. From managing <strong>classes, attendance, fees, notices, and achievements</strong> — SchoolHub makes education <span className="text-blue-500">efficient</span> and <span className="text-white">transparent</span>.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} onClick={(e)=>handleNavClick(e,item.id)} className="hover:text-white transition">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF className="hover:text-blue-500" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter className="hover:text-blue-400" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn className="hover:text-blue-500" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram className="hover:text-pink-500" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube className="hover:text-red-600" /></a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center border-t border-gray-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} SchoolHub. All rights reserved.
        </div>
      </footer>

      {/* Small global styles for ellipse */}
      <style>{`
        .ellipse {
          clip-path: ellipse(48% 60% at 50% 50%);
        }
        /* make sure hero images are not selectable while sliding */
        img { user-select: none; -webkit-user-drag: none; }
      `}</style>
    </div>
  );
}





