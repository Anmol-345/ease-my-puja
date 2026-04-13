"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image'

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Shared ───────────────────────────────────────────────────────────────────

const SectionBadge = ({ text }) => (
  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-100 text-[#d92a2a] text-xs md:text-sm font-bold uppercase tracking-widest mb-4 transition-transform hover:scale-105">
    {text}
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Why Us", href: "#why-us" },
    { name: "Services", href: "#services" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Team", href: "#team" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <div className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none mb-6">
      <nav className={`
        pointer-events-auto relative w-full max-w-4xl bg-white/90 backdrop-blur-xl border border-gray-100/50 
        rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out
        ${scrolled ? "py-3 px-6 md:px-10 border-gray-200/50" : "py-4 px-8 md:px-12"}
      `}>
        <div className="flex items-center justify-between">
          {/* Desktop Left Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#team" className="text-[15px] font-bold text-[#5c4a3d] hover:text-[#d92a2a] transition-colors tracking-tight">Team</a>
            <a href="#services" className="text-[15px] font-bold text-[#5c4a3d] hover:text-[#d92a2a] transition-colors tracking-tight">Services</a>
          </div>

          {/* Brand Name (Center) */}
          <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <a href="#" className="text-[15px] font-bold text-[#5c4a3d] hover:text-[#d92a2a] transition-colors tracking-tight">
              <span className="font-sans text-lg md:text-2xl font-black text-[#ee5e36] tracking-tighter uppercase drop-shadow-sm">
                Ease My Puja
              </span>
            </a>
          </div>

          {/* Desktop Right Links */}
          <div className="hidden md:flex items-center gap-8 font-bold">
            <a href="#how-it-works" className="text-[15px] text-[#5c4a3d] hover:text-[#d92a2a] transition-colors tracking-tight">How it works</a>
            <a href="#faqs" className="text-[15px] text-[#5c4a3d] hover:text-[#d92a2a] transition-colors tracking-tight">FAQs</a>
          </div>

          {/* Hamburger (Mobile only) */}
          <div className="md:hidden flex items-center">
            <button
              className="flex flex-col gap-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`w-5 h-0.5 bg-[#5c4a3d] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <div className={`w-5 h-0.5 bg-[#5c4a3d] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-0.5 bg-[#5c4a3d] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`
          md:hidden absolute top-full left-0 right-0 mt-4 overflow-hidden transition-all duration-500 ease-in-out
          ${menuOpen ? "max-h-[400px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}
        `}>
          <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-6 flex flex-col gap-5 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-bold text-[#5c4a3d] hover:text-[#d92a2a] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-gradient-to-r from-[#ffaf60] to-[#ee5e36] text-white py-4 rounded-2xl font-bold text-lg shadow-lg">
              Book a Pandit
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

// ─── Smartphone Frame ─────────────────────────────────────────────────────────

const SmartphoneFrame = ({ children, width, height, rotate, translate, scale, zIndex, label, isMain }) => (
  <div className={`relative flex-shrink-0 transition-all duration-700 z-${zIndex} cursor-pointer group ${rotate} ${translate} ${scale}`}>
    {/* Hardware Buttons */}
    {/* Left: Volume Buttons */}
    <div className="absolute left-[-2px] top-24 w-[3.5px] h-12 bg-gray-800 rounded-l-md border-y border-l border-gray-700/50 z-0" />
    <div className="absolute left-[-2px] top-40 w-[3.5px] h-12 bg-gray-800 rounded-l-md border-y border-l border-gray-700/50 z-0" />
    {/* Right: Power Button */}
    <div className="absolute right-[-2px] top-32 w-[3.5px] h-14 bg-gray-800 rounded-r-md border-y border-r border-gray-700/50 z-0" />

    {/* Main Device Frame */}
    <div className={`
      relative bg-[#0a0a0b] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border-[1px] border-gray-700/30 ring-[10px] ring-gray-900 ring-inset
      ${isMain ? "rounded-[3rem] p-[10px]" : "rounded-[2.5rem] p-[8px]"}
    `}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[18px] bg-gray-900 rounded-b-2xl z-30 flex items-center justify-center">
        <div className="w-8 h-1 bg-gray-800/50 rounded-full mb-1" />
      </div>

      {/* Screen Content */}
      <div className={`overflow-hidden relative ${isMain ? "rounded-[2.4rem]" : "rounded-[2rem]"}`}>
        {children}
      </div>

      {/* Bottom Chin Area */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gray-800/20 rounded-full" />
    </div>

    {/* Optional Floating Label */}
    {label && (
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-[#ee5e36] text-sm font-black px-6 py-2 rounded-full shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border-2 border-orange-100 z-50">
        {label}
      </div>
    )}
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section id="why-us" className="relative w-full bg-[#fdfbf7] overflow-hidden pt-12 md:pt-20 rounded-b-[4rem] md:rounded-b-[12rem] shadow-2xl z-20" ref={sectionRef}>
      <style>{`
        @keyframes slide-in-right {
          0% { transform: translateX(60%) scaleX(-1); opacity: 0; }
          80% { opacity: 1; }
          100% { transform: translateX(0) scaleX(-1); opacity: 1; }
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-60%); opacity: 0; }
          80% { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }
      `}</style>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-[#fffbf0] to-orange-50/50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-orange-100/25 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-20 flex flex-col items-center text-center">
        {/* Content Layer */}
        <div className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="mb-4 px-3 py-1 bg-orange-100 rounded-full text-[#d92a2a] text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] inline-block shadow-sm">
            {/* India's First Quick Puja Service App */}
          </div>
          <h1 className="font-sans text-2xl my-2 sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#5c4a3d] leading-[1.1] mb-5 drop-shadow-sm">
            Trusted puja booking in minutes
          </h1>
          <p className="text-base md:text-xl text-[#7a6a5d] mb-2 max-w-2xl mx-auto font-semibold leading-relaxed">
            Book verified pandits, temple pujas, and VIP darshan anytime, anywhere.<br />
            From problem to puja — in one tap.
          </p>
          <p className="text-xs md:text-base text-[#e26938] mb-4 max-w-xl mx-auto font-medium leading-relaxed">
            Now live in Indore, Ujjain, Gorakhpur, Banaras, with online and offline booking options.
          </p>

          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="flex flex-wrap justify-center gap-3">
              {/* Google Play */}
              <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-105 hover:bg-gray-900 transition-all shadow-xl border border-white/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path d="M17.523 15.3414L20.3551 13.6338C21.215 13.1165 21.215 11.8835 20.3551 11.3662L17.523 9.65863L13.884 12.5L17.523 15.3414Z M12.9248 13.3333L16.4862 16.1158L5.3414 21.034C4.81432 21.2662 4.22684 21.206 3.75479 20.8761C3.70119 20.8386 3.65103 20.7981 3.60461 20.7547L12.9248 13.3333Z M12.9248 11.6667L3.60461 4.2453C3.65103 4.2019 3.70119 4.1614 3.75479 4.1239C4.22684 3.794 4.81432 3.7338 5.3414 3.966L16.4862 8.8842L12.9248 11.6667Z M3 5.5v13c0 .603.263 1.162.735 1.491l9.398-7.491L3.735 4.009C3.263 4.338 3 4.897 3 5.5z" />
                </svg>
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold leading-none">GET IT ON</div>
                  <div className="text-xs font-bold leading-tight mt-0.5">Google Play</div>
                </div>
              </a>
              {/* App Store */}
              <a href="#" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl hover:scale-105 hover:bg-gray-900 transition-all shadow-xl border border-white/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold leading-none">Download on the</div>
                  <div className="text-xs font-bold leading-tight mt-0.5">App Store</div>
                </div>
              </a>
            </div>

            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#ffaf60] to-[#ee5e36] text-white rounded-full font-black text-lg shadow-[0_15px_30px_rgba(238,94,54,0.3)] hover:shadow-[0_20px_40px_rgba(238,94,54,0.4)] transition-all hover:-translate-y-1 active:scale-95">
              <span className="relative z-10">Book a Pandit Instantly</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
      {/* Phones Layer (Overlapping bottom) */}
      <div className={`relative w-full max-w-4xl h-150 mx-auto mt-0 mb-[-6rem] md:mb-[-12rem] transition-all duration-1000 delay-300 transform z-30 ${inView ? "opacity-100 translate-y-5" : "opacity-0 translate-y-20"}`}>
        <div className="absolute -inset-6 bg-[#ee5e36]/10 blur-[80px] rounded-full pointer-events-none" />
        <Image
          src="/phones.png"
          alt="Ease My Puja App"
          width={500}
          height={900}
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Pandit Layer (Desktop Only) - Increased size */}
      <div className="hidden lg:block absolute bottom-0 left-[-5%] w-[35%] max-w-[500px] z-10 pointer-events-none origin-bottom">
        <div className={`${inView ? "animate-slide-in-left" : "opacity-0"}`}>
          <Image
            src="/pandit.png"
            alt="Pandit Left"
            width={600}
            height={1000}
            className="w-full h-auto object-contain drop-shadow-2xl translate-y-12"
          />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-0 right-[-5%] w-[35%] max-w-[500px] z-10 pointer-events-none origin-bottom scale-x-[-1]">
        <div className={`${inView ? "animate-slide-in-right" : "opacity-0"}`}>
          <Image
            src="/pandit.png"
            alt="Pandit Right"
            width={600}
            height={1000}
            className="w-full h-auto object-contain drop-shadow-2xl translate-y-12"
          />
        </div>
      </div>
    </section>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────

// Helper hook for counting up
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    let end = parseInt(target.toString().replace(/[^\d]/g, ""));
    if (isNaN(end)) end = 0;
    if (end === 0) {
      setCount(0);
      return;
    }
    let startTime = null;
    function animateCount(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    }
    requestAnimationFrame(animateCount);
    // eslint-disable-next-line
  }, [target, duration]);
  return count;
}

const StatsBar = () => {
  const stats = [
    { num: "500+", label: "Devotees Served", animate: true },
    { num: "4.8", label: "★ Average Rating", animate: false },
    { num: "5", label: "City Launched", animate: false },
    { num: "500+", label: "Pujas Available", animate: true },
    { num: "100%", label: "Authentic Rituals", animate: false },
  ];
  return (
    <section className="w-full bg-[#fcfbf9] pt-24 pb-12 md:pb-16 border-b border-gray-100 relative z-10 -mt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-8 divide-x divide-gray-100">
        {stats.map((s, i) => {
          let formatted = s.num;
          if (s.animate) {
            const count = useCountUp(s.num);
            formatted = s.num.includes(",")
              ? count.toLocaleString() + (s.num.endsWith("+") ? "+" : "")
              : count + (s.num.endsWith("+") ? "+" : "");
          }
          return (
            <div key={i} className="flex flex-col items-center justify-center p-3 md:p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-[#5c4a3d] mb-1">{formatted}</h3>
              <p className="text-[#e26938] font-bold uppercase tracking-wider text-[10px] md:text-sm text-center">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ─── Services ─────────────────────────────────────────────────────────────────

const ServicesSection = () => {
  const services = [
    { title: "Griha Pravesh", icon: "🏠" },
    { title: "Satyanarayan Katha", icon: "📖" },
    { title: "Ganesh Puja", icon: "🐘" },
    { title: "Navgraha Puja", icon: "🪐" },
    { title: "Rudrabhishek", icon: "🌊" },
    { title: "Kaal Sarp Dosh", icon: "🐍" },
    { title: "Sukh Samridhi", icon: "✨" },
    { title: "Vivah Puja", icon: "💍" },
    { title: "Naamkaran", icon: "👶" },
    { title: "Mundan", icon: "✂️" },
  ];

  const [sectionRef, inView] = useInView(0.1);

  return (
    <section id="services" className="w-full bg-[#fcfbf9] pt-2 pb-16 md:pt-2.5 md:pb-24 overflow-hidden" ref={sectionRef}>
      <div
        className={`max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-center text-center mb-10 md:mb-14 transition-all duration-700 ease-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <SectionBadge text="Our Services" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#5c4a3d]">Book trusted Puja help</h2>
      </div>
      <div
        className={`relative w-full flex overflow-hidden cursor-pointer transition-all duration-1000 ease-out transform ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"}`}
      >
        <div className="flex w-max hover:[animation-play-state:paused]" style={{ animation: "marquee 45s linear infinite" }}>
          {[...services, ...services, ...services, ...services].map((s, i) => (
            <div
              key={i}
              className="group/card relative min-w-[160px] md:min-w-[230px] h-[180px] md:h-[280px] mx-2 md:mx-3 bg-[#fdf8f2] border-2 border-orange-100 rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-xl transition-all overflow-hidden isolate flex items-end cursor-pointer"
            >
              <img
                src={`/service_${i % 10}.png`}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out"
              />
              {/* Title overlay */}
              <div className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent pt-8 pb-3 px-3 md:px-4 md:opacity-0 md:translate-y-4 md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                <p className="font-bold text-white text-center text-xs md:text-sm leading-tight drop-shadow-md">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── How It Works ─────────────────────────────────────────────────────────────

const HowItWorks = () => {
  const steps = [
    {
      step: "STEP 1",
      title: "Pick from a range of Puja services",
      desc: "Browse through our extensive list of verified pujas tailored to your specific needs and spiritual goals.",
      bg: "#fef3c7",
      img: "/extracted_17.jpeg",
    },
    {
      step: "STEP 2",
      title: "Add to cart & choose your Pandit",
      desc: "Select the puja, view transparent pricing, and choose a locally verified expert Pandit for the ceremony.",
      bg: "#fed7aa",
      img: "/extracted_21.jpeg",
    },
    {
      step: "STEP 3",
      title: "Choose schedule. Pay & done!",
      desc: "Opt for an instant booking or schedule it for later. Complete your payment securely and be blessed.",
      bg: "#bbf7d0",
      img: "/extracted_20.jpeg",
    },
  ];

  const [sectionRef, inView] = useInView(0.1);

  return (
    <section id="how-it-works" className="w-full bg-white py-16 md:py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-center">
        <div className={`flex flex-col items-center transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <SectionBadge text="How it works" />
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-12 md:mb-24 text-center">
            Simple steps to a blessed home
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full">
          {steps.map((s, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
            >
              {/* Blob background + phone-shaped image */}
              <div className="relative w-full mb-10 flex items-center justify-center " style={{ height: "300px" }}>
                <div
                  className="absolute inset-0 opacity-50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] group-hover:rounded-[50%] transition-all duration-500 scale-110 mx-4"
                  style={{ backgroundColor: s.bg }}
                />
                {/* Phone-shaped frame */}
                <div className="relative z-10 bg-gray-900 rounded-[2rem] p-[5px] shadow-2xl scale-100 md:scale-140 md:group-hover:scale-155 transition-transform duration-500 border-[4px] border-gray-900">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-32 rounded-[1.6rem] object-cover object-top"
                    style={{ height: "240px" }}
                  />
                </div>
              </div>
              <div className="bg-gray-100/60 border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 tracking-widest my-4">
                {s.step}
              </div>
              <h3 className="text-2xl font-bold text-[#5c4a3d] mb-3 leading-snug">{s.title}</h3>
              <p className="text-gray-500 font-medium px-4 text-base leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Team ─────────────────────────────────────────────────────────────────────

const TeamSection = () => {
  const team = [
    { name: "Harsh Pandey", role: "Co-Founder, MBA in Marketing & Finance – SGSITS Indore", img: "/extracted_28.png" },
    { name: "Dr. Prashant Salwan", role: "Professor of Strategy & Intl. Business, IIM Indore. Alumnus – London School of Economics.", img: "/extracted_29.png" },
    { name: "Dr. K.K Dhakad", role: "Asst. Professor – Ind. & Prod. Engg. Dept., Shri GS Institute of Technology & Science, Indore.", img: "/extracted_30.png" },
    { name: "Pt. Anoop Pandey", role: "20+ yrs experience, 20,000+ Pujas performed. Alumnus – Banaras Hindu University.", img: "/extracted_31.jpeg" },
    { name: "CA Priyank Rana", role: "Entrepreneur & Visionary CA with 20+ years of experience in Finance Management.", img: "/extracted_32.png" },
    { name: "Shaily Pandey", role: "Marketing & Sales Head at Anajwala India Fresh Solutions Pvt Ltd", img: "/extracted_33.jpeg" },
  ];
  return (
    <section id="team" className="w-full bg-[#f4ebd9] py-16 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <SectionBadge text="Our Team" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-16 md:mb-24 text-center">
          Meet Our Team &amp; Mentors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-24 max-w-6xl w-full">
          {team.map((m, i) => (
            <div key={i} className="relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 pt-16 md:pt-20 flex flex-col items-center text-center shadow-md border border-[#e8dcc9] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#f4ebd9] overflow-hidden shadow-lg bg-gray-200">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-[#5c4a3d] mb-1.5">{m.name}</h3>
              <p className="text-xs md:text-sm text-[#7a6855] leading-relaxed">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

const Testimonials = () => {
  const reviews1 = [
    { name: "Ramesh", loc: "Dwarka", text: "The Pandit arrived on time and performed the Griha Pravesh with complete vidhi. Highly recommended." },
    { name: "Sunita", loc: "Andheri", text: "Very smooth booking experience. The app made it so easy to find a qualified Pandit for Satyanarayan Katha." },
    { name: "Vikram", loc: "Sector 57", text: "Affordable and reliable. My family was very satisfied with the Rudrabhishek puja." },
    { name: "Meena", loc: "Bengaluru", text: "We needed a Pandit urgently and Ease My Puja delivered within the hour. Incredible service!" },
  ];
  const reviews2 = [...reviews1].reverse();

  const [sectionRef, inView] = useInView(0.1);

  const ReviewCard = ({ r }) => (
    <div className="min-w-[224px] md:min-w-[340px] max-w-[224px] md:max-w-[340px] bg-white border border-gray-100 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] mx-2 md:mx-4 relative flex-shrink-0 hover:-translate-y-1 transition-transform">
      <div className="absolute top-4 left-4 md:top-6 md:left-6 text-5xl md:text-6xl text-orange-200 font-sans leading-none opacity-50">&ldquo;</div>
      <p className="text-[#5c4a3d] font-medium mt-6 md:mt-8 mb-6 md:mb-8 line-clamp-4 z-10 relative text-base md:text-lg leading-relaxed">{r.text}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#ffaf60] to-[#ee5e36] rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg shadow-inner flex-shrink-0">
          {r.name[0]}
        </div>
        <div>
          <p className="font-bold text-[#5c4a3d] text-sm md:text-base">{r.name}</p>
          <p className="text-gray-400 text-xs md:text-sm font-medium">{r.loc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="w-full bg-[#f4ebd9]/50 py-16 md:py-32 overflow-hidden flex flex-col items-center">
      <div className={`flex flex-col items-center transition-all duration-700 ease-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <SectionBadge text="Our Testimonials" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-10 md:mb-20 text-center px-4">
          What devotees are saying
        </h2>
      </div>
      {/* Marquee rows with edge fades */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f5ede0, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f5ede0, transparent)" }} />

        <div
          className={`relative w-full flex overflow-hidden mb-4 md:mb-6 cursor-pointer transition-all duration-1000 ease-out transform ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24"}`}
        >
          <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
            {[...reviews1, ...reviews1, ...reviews1, ...reviews1].map((r, i) => <ReviewCard key={`r1-${i}`} r={r} />)}
          </div>
        </div>
        <div
          className={`relative w-full flex overflow-hidden cursor-pointer transition-all duration-1000 ease-out transform delay-150 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"}`}
        >
          <div className="flex w-max" style={{ animation: "marquee-reverse 45s linear infinite" }}>
            {[...reviews2, ...reviews2, ...reviews2, ...reviews2].map((r, i) => <ReviewCard key={`r2-${i}`} r={r} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQSection = () => {
  const faqs = [
    { q: "What is Ease My Puja?", a: "A platform for booking verified pandits, temple pujas, online pujas, and VIP darshan." },
    { q: "Are the pandits verified?", a: "Yes. EMP Partners are listed with profile details and verification." },
    { q: "Can I book urgently?", a: "Yes. We support instant and scheduled bookings." },
    { q: "Is pricing transparent?", a: "Yes. You can view the base price and choose accordingly." },
    { q: "Can I book recurring pujas?", a: "Yes. Monthly and regular plans are available." },
  ];
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faqs" className="w-full bg-white py-16 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center">
        <SectionBadge text="FAQ Section" />
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-10 md:mb-16 text-center">
          FAQ Section
        </h2>
        <div className="w-full flex flex-col gap-3 md:gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#ffaf60]/60 bg-[#fffbf0] shadow-sm" : "border-gray-100 bg-white hover:border-gray-300"}`}>
                <button onClick={() => setOpenIdx(isOpen ? -1 : idx)} className="w-full flex items-center justify-between p-4 md:p-6 text-left outline-none transition-colors">
                  <span className={`font-bold text-sm md:text-[17px] pr-6 md:pr-8 ${isOpen ? "text-[#d92a2a]" : "text-[#5c4a3d]"}`}>{faq.q}</span>
                  <span className={`text-xl md:text-2xl font-light transform transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45 text-[#d92a2a]" : "rotate-0 text-gray-400"}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 pb-4 md:pb-6 px-4 md:px-6 opacity-100" : "max-h-0 opacity-0 px-4 md:px-6"}`}>
                  <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="w-full bg-[#ee5e36] bg-gradient-to-br from-[#ee5e36] to-[#d92a2a] py-10 md:py-16 px-4 md:px-10 overflow-hidden relative border-t border-white/10">
    <div className="absolute right-[-5%] top-[-10%] opacity-10 pointer-events-none transform rotate-12">
      <span className="text-[180px] md:text-[350px] text-white">🕉️</span>
    </div>

    <div className="max-w-7xl mx-auto flex flex-col relative z-10">
      {/* CTA Section */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-16">
        <h2 className="font-sans text-2xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-5 leading-tight drop-shadow-sm">
          Get expert Puja services in minutes.<br className="hidden md:block" /> Download Ease My Puja!
        </h2>
        <p className="text-white/95 font-semibold text-sm md:text-xl mb-6 md:mb-10 drop-shadow-sm">
          Thousands of families already trust us for sacred rituals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {/* Google Play */}
          <a href="#" className="flex items-center gap-2.5 bg-black text-white px-5 py-2.5 rounded-xl hover:scale-105 hover:bg-gray-900 transition-all shadow-xl border border-white/10 w-full sm:w-auto justify-center">
            <svg viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" fill="currentColor">
              <path d="M17.523 15.3414L20.3551 13.6338C21.215 13.1165 21.215 11.8835 20.3551 11.3662L17.523 9.65863L13.884 12.5L17.523 15.3414Z M12.9248 13.3333L16.4862 16.1158L5.3414 21.034C4.81432 21.2662 4.22684 21.206 3.75479 20.8761C3.70119 20.8386 3.65103 20.7981 3.60461 20.7547L12.9248 13.3333Z M12.9248 11.6667L3.60461 4.2453C3.65103 4.2019 3.70119 4.1614 3.75479 4.1239C4.22684 3.794 4.81432 3.7338 5.3414 3.966L16.4862 8.8842L12.9248 11.6667Z M3 5.5v13c0 .603.263 1.162.735 1.491l9.398-7.491L3.735 4.009C3.263 4.338 3 4.897 3 5.5z" />
            </svg>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-widest text-gray-300 font-medium leading-none">GET IT ON</div>
              <div className="text-sm md:text-base font-bold leading-tight mt-0.5">Google Play</div>
            </div>
          </a>
          {/* App Store */}
          <a href="#" className="flex items-center gap-2.5 bg-black text-white px-5 py-2.5 rounded-xl hover:scale-105 hover:bg-gray-900 transition-all shadow-xl border border-white/10 w-full sm:w-auto justify-center">
            <svg viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-widest text-gray-300 font-medium leading-none">Download on the</div>
              <div className="text-sm md:text-base font-bold leading-tight mt-0.5">App Store</div>
            </div>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-12 border-t border-white/20 pt-10 md:pt-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3 md:gap-5">
          <div className="flex items-center gap-3">
            <span className="font-sans text-lg md:text-xl font-black text-white tracking-tight uppercase">Ease My Puja</span>
          </div>
          <p className="text-white/80 leading-relaxed font-medium text-xs md:text-sm">
            India's first quick puja service app connecting you with verified expert Pandits across the country.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <a href="#" className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-md">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-md">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Support */}
        <div>
          <h4 className="font-bold text-white text-base mb-3 md:mb-5 tracking-wide underline decoration-white/30 underline-offset-8">Support</h4>
          <ul className="space-y-2.5 text-white/80 font-medium text-xs md:text-sm">
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Help Center</a></li>
            <li><a href="mailto:easemypujaofficial@gmail.com" className="hover:text-white hover:underline transition-colors break-all">easemypujaofficial@gmail.com</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Contact Us</a></li>
            <li className="flex flex-col gap-0.5 text-white/90 font-bold">
              <a href="tel:6262446655" className="hover:text-white transition-colors">+91 6262446655</a>
              <a href="tel:8889990352" className="hover:text-white transition-colors">+91 8889990352</a>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h4 className="font-bold text-white text-base mb-3 md:mb-5 tracking-wide underline decoration-white/30 underline-offset-8">Company</h4>
          <ul className="space-y-2.5 text-white/80 font-medium text-xs md:text-sm">
            <li><a href="#" className="hover:text-white hover:underline transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[#ffaf60] hover:underline font-semibold transition-colors">Become a Pandit Partner</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Blog</a></li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h4 className="font-bold text-white text-base mb-3 md:mb-5 tracking-wide underline decoration-white/30 underline-offset-8">Legal</h4>
          <ul className="space-y-2.5 text-white/80 font-medium text-xs md:text-sm">
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Terms &amp; Conditions</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Cancellation Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="w-full pt-5 md:pt-7 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-white/60 font-bold text-[10px] md:text-xs gap-2">
        <p>Ease My Puja &copy; {new Date().getFullYear()}</p>
        <p>Made with ❤️ in India</p>
      </div>
    </div>
  </footer>
);

    const WhyEaseMyPuja = () => (
      <section id="why-ease-my-puja" className="w-full bg-[#fff8f2] py-16 md:py-28 px-4 md:px-0 border-t border-orange-100">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
          <div>
            <SectionBadge text="Why Ease My Puja" />
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#d92a2a] mb-4">Why Ease My Puja</h2>
            <p className="text-[#5c4a3d] text-lg md:text-2xl font-semibold mb-2">Fair pricing. Verified pandits. Transparent process.</p>
            <p className="text-[#7a6a5d] text-base md:text-lg mb-2">You choose the pandit, you see the profile, and you decide based on trust and experience.</p>
            <p className="text-[#7a6a5d] text-base md:text-lg mb-2">No hidden steps. No confusion. No overpricing.</p>
          </div>
          <div className="w-full border-t border-orange-200 my-2" />
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <h3 className="font-bold text-[#ee5e36] text-xl mb-2">Verified Pandits</h3>
              <p className="text-[#5c4a3d] font-medium mb-1">Trusted EMP Partners you can rely on</p>
              <p className="text-[#7a6a5d] text-sm mb-2">Every pandit is verified, professionally dressed, and listed with profile details, ID, and ratings.</p>
              <p className="text-[#7a6a5d] text-sm">We build trust at every step.</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <h3 className="font-bold text-[#ee5e36] text-xl mb-2">Temple Services</h3>
              <p className="text-[#5c4a3d] font-medium mb-1">Temple pujas and VIP darshan simplified</p>
              <p className="text-[#7a6a5d] text-sm mb-2">Book temple rituals, special pujas, and darshan support without the usual hassle.</p>
              <p className="text-[#7a6a5d] text-sm">Perfect for families, senior citizens, and urgent last-minute needs.</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <h3 className="font-bold text-[#ee5e36] text-xl mb-2">Recurring Plans</h3>
              <p className="text-[#5c4a3d] font-medium mb-1">Regular puja, without the reminder stress</p>
              <p className="text-[#7a6a5d] text-sm mb-2">For homes, offices, hotels, restaurants, and businesses that need monthly or festival pujas.</p>
            </div>
          </div>
        </div>
      </section>
    );

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#fdfbf7] font-sans antialiased text-[#171717] selection:bg-orange-200 selection:text-[#5c4a3d]">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <HowItWorks />
      <WhyEaseMyPuja />
      <TeamSection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}
