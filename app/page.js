"use client";
import React, { useState, useRef, useEffect } from "react";

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
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <img src="/extracted_10.png" alt="Ease My Puja Logo" className="w-9 h-9 md:w-11 md:h-11 rounded-xl object-cover" />
          <span className="font-serif text-xl md:text-2xl font-black text-[#5c4a3d] tracking-tight">Ease My Puja</span>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-[#5c4a3d] font-semibold text-sm">
          <a href="#why-us" className="hover:text-[#d92a2a] transition-colors">Why Us</a>
          <a href="#services" className="hover:text-[#d92a2a] transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-[#d92a2a] transition-colors">How It Works</a>
          <a href="#team" className="hover:text-[#d92a2a] transition-colors">Team</a>
          <a href="#faqs" className="hover:text-[#d92a2a] transition-colors">FAQs</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-gradient-to-r from-[#ffaf60] to-[#ee5e36] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-xs md:text-sm whitespace-nowrap">
            Book a Pandit
          </button>
          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#5c4a3d] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#5c4a3d] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#5c4a3d] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-72 border-t border-gray-100" : "max-h-0"}`}>
        <div className="flex flex-col px-4 py-4 gap-4 bg-white text-[#5c4a3d] font-semibold text-sm">
          {["why-us", "services", "how-it-works", "team", "faqs"].map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}
              className="capitalize hover:text-[#d92a2a] transition-colors py-1 border-b border-gray-50">
              {id.replace(/-/g, " ")}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = () => (
  <section id="why-us" className="relative w-full bg-gradient-to-br from-[#fcf7d9] via-[#f8e98a] to-[#f4d160] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 md:min-h-[90vh]">

      {/* Left – text */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center pt-12 pb-6 md:py-20">
        <div className="mb-4 px-3 py-1.5 bg-[#d92a2a]/10 rounded-full text-[#d92a2a] text-xs md:text-sm font-bold uppercase tracking-widest">
          India's First Quick Puja Service App
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#5c4a3d] leading-[1.08] mb-5">
          Expert Pandits,<br />booked in<br />minutes!
        </h1>
        <p className="text-base md:text-xl text-[#7a6a5d] mb-8 max-w-lg font-medium leading-relaxed">
          Now live in <strong className="text-[#5c4a3d]">Delhi NCR, Mumbai, Bengaluru, Hyderabad &amp; Pune!</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto">
          <button className="bg-gradient-to-r from-[#ffaf60] to-[#ee5e36] text-white px-7 py-3.5 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 text-center">
            Book Instantly
          </button>
          <button className="bg-white/70 backdrop-blur-md border-2 border-[#5c4a3d] text-[#5c4a3d] px-7 py-3.5 rounded-full font-bold text-base hover:bg-[#5c4a3d] hover:text-white transition-all hover:-translate-y-1 active:scale-95 text-center">
            Download App
          </button>
        </div>
        <p className="text-[#5c4a3d] font-serif text-lg italic font-medium opacity-80 flex items-center gap-2">
          <span>✨</span> Your faith, our service.
        </p>
      </div>

      {/* Right – phone mockup: hidden on mobile, original sizes on desktop */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end items-center pb-10 md:py-0">
        <div className="absolute w-[420px] h-[420px] bg-[#f4ebd9]/70 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-end justify-center gap-4 h-[520px]">
          {/* Left phone */}
          <div className="relative flex-shrink-0 -rotate-6 translate-y-6 hover:rotate-0 hover:translate-y-0 transition-all duration-500 z-10 cursor-pointer">
            <div className="bg-gray-900 rounded-[2.2rem] p-[6px] shadow-2xl border-[5px] border-gray-900">
              <img src="/extracted_12.png" alt="Book a Pandit Instantly"
                className="w-36 rounded-[1.8rem] object-cover object-top"
                style={{ height: "300px" }} />
            </div>
          </div>
          {/* Center phone */}
          <div className="relative flex-shrink-0 -translate-y-8 hover:-translate-y-12 transition-all duration-500 z-20 cursor-pointer group">
            <div className="bg-gray-900 rounded-[2.5rem] p-[7px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] border-[6px] border-gray-900">
              <img src="/extracted_10.png" alt="Easemypuja – Ab Puja Hogi Swikar"
                className="w-44 md:w-52 rounded-[2rem] object-cover object-top"
                style={{ height: "380px" }} />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-[#5c4a3d] text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Ab Puja Hogi Swikar 🙏
            </div>
          </div>
          {/* Right phone */}
          <div className="relative flex-shrink-0 rotate-6 translate-y-6 hover:rotate-0 hover:translate-y-0 transition-all duration-500 z-10 cursor-pointer">
            <div className="bg-gray-900 rounded-[2.2rem] p-[6px] shadow-2xl border-[5px] border-gray-900">
              <img src="/extracted_11.jpeg" alt="Featured Experiences – Book Darshan"
                className="w-36 rounded-[1.8rem] object-cover object-top"
                style={{ height: "300px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const StatsBar = () => {
  const stats = [
    { num: "10,000+", label: "Pujas Completed" },
    { num: "500+", label: "Verified Pandits" },
    { num: "50,000+", label: "Hours of Blessings" },
  ];
  return (
    <section className="w-full bg-white py-8 md:py-12 border-b border-gray-100 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-3 gap-2 md:gap-8 divide-x divide-gray-100">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-3 md:p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl font-black text-[#5c4a3d] mb-1">{s.num}</h3>
            <p className="text-[#e26938] font-bold uppercase tracking-wider text-[10px] md:text-sm text-center">{s.label}</p>
          </div>
        ))}
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
    <section id="services" className="w-full bg-[#fcfbf9] py-16 md:py-24 overflow-hidden" ref={sectionRef}>
      <div
        className={`max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-center text-center mb-10 md:mb-14 transition-all duration-700 ease-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <SectionBadge text="Our Services" />
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#5c4a3d]">Book trusted Puja help</h2>
      </div>
      <div
        className={`relative w-full flex overflow-hidden group cursor-pointer transition-all duration-1000 ease-out transform ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"}`}
      >
        <div className="flex w-max group-hover:[animation-play-state:paused]" style={{ animation: "marquee 45s linear infinite" }}>
          {[...services, ...services, ...services, ...services].map((s, i) => (
            <div
              key={i}
              className="group/card relative min-w-[140px] md:min-w-[200px] h-[198px] md:h-[220px] mx-2 md:mx-3 bg-black border border-gray-100 rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-xl transition-all overflow-hidden flex items-end cursor-pointer"
            >
              <img
                src={`/service_${i % 10}.png`}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover/card:scale-125 transition-transform duration-700 ease-out brightness-90"
              />
              {/* Always visible on mobile, hover-reveal on desktop */}
              <div className="relative z-10 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-10 md:pt-16 pb-4 md:pb-6 px-3 md:px-4 md:opacity-0 md:translate-y-6 md:group-hover/card:opacity-100 md:group-hover/card:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                <p className="font-bold text-white text-center text-xs md:text-base leading-tight drop-shadow-md">{s.title}</p>
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
  return (
    <section id="how-it-works" className="w-full bg-white py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-center">
        <SectionBadge text="How it works" />
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-12 md:mb-24 text-center">
          Simple steps to a blessed home
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
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
              <div className="bg-gray-100/60 border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 tracking-widest mb-4">
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
    { name: "Harsh Pandey", role: "Co-Founder, MBA in Marketing & Finance – SGSITS Indore", img: "/extracted_30.png" },
    { name: "Dr. Prashant Salwan", role: "Professor of Strategy & Intl. Business, IIM Indore. Alumnus – London School of Economics.", img: "/extracted_28.png" },
    { name: "Dr. K.K Dhakad", role: "Asst. Professor – Ind. & Prod. Engg. Dept., Shri GS Institute of Technology & Science, Indore.", img: "/extracted_29.png" },
    { name: "Pt. Anoop Pandey", role: "20+ yrs experience, 20,000+ Pujas performed. Alumnus – Banaras Hindu University.", img: "/extracted_32.png" },
    { name: "CA Priyank Rana", role: "Entrepreneur & Visionary CA with 20+ years of experience in Finance Management.", img: "/extracted_33.jpeg" },
    { name: "Shaily Pandey", role: "Marketing & Sales Head at Anajwala India Fresh Solutions Pvt Ltd", img: "/extracted_31.jpeg" },
  ];
  return (
    <section id="team" className="w-full bg-[#f4ebd9] py-16 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <SectionBadge text="Our Team" />
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-16 md:mb-24 text-center">
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
      <div className="absolute top-4 left-4 md:top-6 md:left-6 text-5xl md:text-6xl text-orange-200 font-serif leading-none opacity-50">&ldquo;</div>
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
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-10 md:mb-20 text-center px-4">
          What devotees are saying
        </h2>
      </div>
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
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQSection = () => {
  const faqs = [
    { q: "What is Ease My Puja?", a: "Ease My Puja is India's first quick puja service app that connects devotees with verified, experienced Pandits for all types of religious ceremonies." },
    { q: "How do I book a Pandit?", a: "Simply download our app or use the website, select your desired Puja, view pricing, and schedule a Pandit instantly or for a later date." },
    { q: "Can I schedule a recurring Puja?", a: "Yes, you can easily set up daily, weekly, or monthly recurring pujas through our application." },
    { q: "Are the Pandits verified?", a: "Absolutely. All our Pandits go through a stringent background check and their Vedic knowledge is verified before they join our platform." },
    { q: "How is pricing determined?", a: "Our pricing is transparent and standardized based on the type of Puja, duration, and samagri required. No hidden costs." },
    { q: "Which cities are you available in?", a: "We are currently fully operational in Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Pune." },
    { q: "How do I contact support?", a: "You can reach us 24/7 at help@easemypuja.com or by calling 8889990352." },
  ];
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faqs" className="w-full bg-white py-16 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center">
        <SectionBadge text="FAQs" />
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#5c4a3d] mb-10 md:mb-16 text-center">
          Frequently Asked Questions
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

// ─── Footer CTA Banner ────────────────────────────────────────────────────────

const FooterCTABanner = () => (
  <section className="w-full bg-gradient-to-br from-[#ffaf60] to-[#ee5e36] pt-16 md:pt-24 pb-16 md:pb-24 px-4 overflow-hidden relative">
    <div className="absolute right-[-5%] bottom-[-20%] opacity-10 pointer-events-none transform -rotate-12">
      <span className="text-[200px] md:text-[400px] text-white">🕉️</span>
    </div>
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight drop-shadow-sm">
        Get expert Puja services in minutes.<br className="hidden md:block" /> Download Ease My Puja!
      </h2>
      <p className="text-white/95 font-semibold text-base md:text-2xl mb-8 md:mb-12 drop-shadow-sm">
        Thousands of families already trust us for sacred rituals.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Google Play */}
        <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-2xl hover:scale-105 hover:bg-gray-900 transition-all shadow-2xl border border-white/10 w-full sm:w-auto justify-center">
          <svg viewBox="0 0 24 24" className="w-6 md:w-7 h-6 md:h-7 flex-shrink-0" fill="currentColor">
            <path d="M3.18 23.76c.33.19.7.24 1.06.14l12.79-7.4-2.87-2.86-10.98 10.12zm15.58-9.03L5.83 21.99l2.86-2.63 10.07-5.63zM22.1 10.2c-.41-.23-1.05-.23-1.47 0l-2.86 1.65 2.86 2.87 1.47-.85c.41-.23.67-.66.67-1.13s-.26-.9-.67-1.54zM4.24.1C3.88 0 3.51.05 3.18.24L14.16 11.2 17.03 8.34 4.24.1z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-widest text-gray-300 font-medium leading-none">GET IT ON</div>
            <div className="text-base md:text-[17px] font-bold leading-tight mt-0.5">Google Play</div>
          </div>
        </a>
        {/* App Store */}
        <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-2xl hover:scale-105 hover:bg-gray-900 transition-all shadow-2xl border border-white/10 w-full sm:w-auto justify-center">
          <svg viewBox="0 0 24 24" className="w-6 md:w-7 h-6 md:h-7 flex-shrink-0" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-widest text-gray-300 font-medium leading-none">Download on the</div>
            <div className="text-base md:text-[17px] font-bold leading-tight mt-0.5">App Store</div>
          </div>
        </a>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="w-full bg-[#dfce48] py-12 md:py-20 px-4 md:px-10 border-t border-[#c2b236]">
    <div className="max-w-7xl mx-auto flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <img src="/extracted_10.png" alt="Ease My Puja Logo" className="w-9 h-9 md:w-10 md:h-10 rounded-xl object-cover" />
            <span className="font-serif text-xl md:text-2xl font-black text-[#3d3128] tracking-tight">Ease My Puja</span>
          </div>
          <p className="text-[#5c4a3d] leading-relaxed font-medium text-sm">
            India's first quick puja service app connecting you with verified expert Pandits across the country.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-10 rounded-full bg-[#3d3128] text-white flex items-center justify-center font-bold hover:-translate-y-1 transition-transform cursor-pointer shadow-md text-xs">in</div>
            <div className="w-10 h-10 rounded-full bg-[#3d3128] text-white flex items-center justify-center font-bold hover:-translate-y-1 transition-transform cursor-pointer shadow-md text-xs">ig</div>
            <div className="w-10 h-10 rounded-full bg-[#3d3128] text-white flex items-center justify-center font-bold hover:-translate-y-1 transition-transform cursor-pointer shadow-md text-xs">fb</div>
          </div>
        </div>
        {/* Support */}
        <div>
          <h4 className="font-bold text-[#3d3128] text-base md:text-xl mb-4 md:mb-6 tracking-wide">Support</h4>
          <ul className="space-y-3 text-[#5c4a3d] font-medium text-sm">
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Help Center</a></li>
            <li><a href="mailto:help@easemypuja.com" className="hover:text-black hover:underline transition-colors break-all">help@easemypuja.com</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Delete Account</a></li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h4 className="font-bold text-[#3d3128] text-base md:text-xl mb-4 md:mb-6 tracking-wide">Company</h4>
          <ul className="space-y-3 text-[#5c4a3d] font-medium text-sm">
            <li><a href="#" className="hover:text-black hover:underline transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[#d92a2a] hover:underline font-semibold transition-colors">Become a Pandit Partner</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Blog</a></li>
          </ul>
        </div>
        {/* Legal */}
        <div>
          <h4 className="font-bold text-[#3d3128] text-base md:text-xl mb-4 md:mb-6 tracking-wide">Legal</h4>
          <ul className="space-y-3 text-[#5c4a3d] font-medium text-sm">
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Terms &amp; Conditions</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black hover:underline transition-colors">Cancellation Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="w-full pt-6 md:pt-8 border-t-[1.5px] border-[#c2b236] flex flex-col md:flex-row items-center justify-between text-[#5c4a3d] font-bold text-xs md:text-sm gap-2">
        <p>Ease My Puja &copy; {new Date().getFullYear()}</p>
        <p>Made with ❤️ in India</p>
      </div>
    </div>
  </footer>
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
      <TeamSection />
      <Testimonials />
      <FAQSection />
      <FooterCTABanner />
      <Footer />
    </div>
  );
}
