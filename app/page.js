import React from "react";

const PhonePlaceholder = ({ className = "" }) => (
  <div className={`relative bg-gray-200 border-8 border-gray-800 rounded-[2rem] shadow-xl overflow-hidden flex flex-col items-center justify-center text-gray-400 font-medium ${className}`}>
    <div className="absolute top-0 w-1/3 h-5 bg-gray-800 rounded-b-xl"></div>
    <span>Phone</span>
  </div>
);

const PanditPlaceholder = ({ className = "" }) => (
  <div className={`bg-gray-300 rounded-lg shadow-md flex items-center justify-center text-gray-500 font-medium ${className}`}>
    <span>Pandit</span>
  </div>
);

const ProfilePlaceholder = ({ className = "" }) => (
  <div className={`bg-gray-400 rounded-full shadow-md flex items-center justify-center text-white text-xs font-semibold ${className}`}>
    Photo
  </div>
);

const HeroSection = () => (
  <section className="w-full bg-gradient-to-b from-[#fcf7d9] to-[#f4d160] py-12 overflow-hidden flex flex-col items-center">
    <div className="text-center mb-10 px-4">
      <h2 className="text-[#d92a2a] text-3xl md:text-5xl font-black italic tracking-wide drop-shadow-md">
        INDIA'S FIRST
      </h2>
      <h1 className="text-[#4caf50] text-4xl md:text-7xl font-black italic tracking-wide mt-2 drop-shadow-md">
        QUICK PUJA SERVICE APP
      </h1>
    </div>

    {/* Images Row */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full px-4 md:px-10 max-w-7xl mx-auto h-[300px] md:h-[500px]">
      <PanditPlaceholder className="hidden md:flex w-1/5 h-full max-h-[400px]" />
      <div className="flex items-center justify-center gap-4 w-full md:w-3/5 h-full">
        <PhonePlaceholder className="w-1/3 h-4/5 translate-y-4" />
        <PhonePlaceholder className="w-1/3 h-full z-10 shadow-2xl scale-105 border-gray-900" />
        <PhonePlaceholder className="w-1/3 h-4/5 translate-y-4" />
      </div>
      <PanditPlaceholder className="hidden md:flex w-1/5 h-full max-h-[400px]" />
    </div>
  </section>
);

const StepsSection = () => {
  const steps = [
    {
      step: "STEP 1",
      title: "Choose Instant, scheduled Or Recurring, From Range Of Puja Services & Add Budget",
    },
    {
      step: "STEP 2",
      title: "Select Professional Pujari / Pandit Acording To Your Expectations",
    },
    {
      step: "STEP 3",
      title: "Experts Arrive On-Time, Location, Pay & done!",
    },
  ];

  return (
    <section className="w-full bg-[#fdfdfd] py-16 px-4 md:px-10 flex flex-col items-center">
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h2 className="text-[#d92a2a] text-3xl md:text-5xl font-bold mb-4">
          3 Simple Steps To Book Your Puja
        </h2>
        <p className="text-xl md:text-2xl font-bold">
          <span className="text-[#d92a2a]">Follow these simple steps</span>{" "}
          <span className="text-[#4caf50]">to Get Relief From Problems , Doshas</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center bg-[#f2f4f8] rounded-3xl p-6 shadow-sm border border-gray-100 relative pt-12">
            {/* Step Badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold px-8 py-2 rounded-full shadow-md text-lg">
              {s.step}
            </div>
            
            <p className="text-center font-bold text-gray-800 text-lg mb-8 h-20 flex items-center justify-center">
              {s.title}
            </p>
            
            <div className="w-full flex justify-center mt-auto">
              <PhonePlaceholder className="w-3/4 max-w-[220px] aspect-[9/16]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="relative w-full bg-gradient-to-br from-[#ffaf60] to-[#ee5e36] py-20 px-4 overflow-hidden flex flex-col items-center">
    <div className="text-center z-10 relative mb-16 max-w-5xl mx-auto">
      <h2 className="text-black text-4xl md:text-6xl font-black mb-2 leading-tight">
        Get Experienced Pandit In minutes.<br/>
        Download Ease My Puja !
      </h2>
      <p className="text-black font-bold text-xl md:text-2xl mt-8">
        Trusted By Thousands Of Professional Pujari's & Yajmaan's .
      </p>
    </div>

    <div className="flex justify-center items-end gap-2 md:gap-6 w-full max-w-4xl z-10 h-[300px] md:h-[500px]">
      <PhonePlaceholder className="w-[30%] h-[80%] -rotate-6 translate-x-4 shadow-2xl" />
      <PhonePlaceholder className="w-[35%] h-full z-10 shadow-2xl scale-105" />
      <PhonePlaceholder className="w-[30%] h-[80%] rotate-6 -translate-x-4 shadow-2xl" />
    </div>

    {/* Big Background Text */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 opacity-10 pointer-events-none flex justify-center">
      <span className="text-[15vw] font-black text-black whitespace-nowrap select-none min-h-0 -mb-[4vw]">
        Ease My Puja
      </span>
    </div>
  </section>
);

const TeamSection = () => {
  const team = [
    {
      name: "Harsh Pandey",
      role: "Co - Founder, MBA In Marketing & Finance, From SGSITS.",
    },
    {
      name: "Dr. Prashant Salwan",
      role: "Professor of Strategy and International Business at the Indian Institute of Management Indore, India. An alumnus of the London School of Economics and Political Science...",
    },
    {
      name: "Dr. K.K Dhakad",
      role: "Assistant Professor, Ind. & Prod. Engg. Department. Shri GS Institute of Technology & Sci., Indore.",
    },
    {
      name: "Pt. Anoop Pandey",
      role: "20+ Experience Priest Along with 20000+ Puja Performed Till Now, Alumnus Banaras Hindu University.",
    },
    {
      name: "CA Priyank Rana",
      role: "Enterpreneur & A Visionary CA having More Than 20 years Of Experience In Finance Management.",
    },
    {
      name: "Shaily Pandey",
      role: "Marketing & Sales Head At Anajwala India Fresh Solutions Pvt Ltd",
    },
  ];

  return (
    <section className="w-full bg-[#f4ebd9] py-24 px-4 md:px-10 flex flex-col items-center">
      <h2 className="text-[#5c4a3d] text-4xl md:text-5xl font-serif text-center mb-24">
        Meet Our Team & Mentors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-24 max-w-6xl w-full">
        {team.map((member, i) => (
          <div key={i} className="relative border border-[#bdac97] bg-transparent p-8 pt-16 rounded-sm flex flex-col items-center text-center">
            {/* Profile overlapping image */}
            <ProfilePlaceholder className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border-4 border-[#f4ebd9]" />
            
            <h3 className="text-xl font-bold text-[#5c4a3d] mb-4">
              {member.name}
            </h3>
            <p className="text-sm text-[#7a6855] leading-relaxed">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FooterSection = () => (
  <footer className="w-full bg-[#dfce48] py-16 px-4 md:px-10 flex flex-col items-center">
    <div className="max-w-6xl w-full">
      <h2 className="text-4xl md:text-5xl font-serif text-[#5c4a3d] mb-12">
        Ease My Puja
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-[#c2b236]">
        {/* Col 1 */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-[#c2b236] flex flex-col">
          <h3 className="text-xl text-[#3d3128] mb-6">Reservations Office</h3>
          <ul className="space-y-4 text-[#5c4a3d] text-sm">
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">📍</span>
              Indore , MP
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">📞</span>
              8889990352
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">✉️</span>
              easemypujaofficial@gmail.com
            </li>
          </ul>
        </div>

        {/* Col 2 */}
        <div className="p-8 border-b md:border-b-0 md:border-r border-[#c2b236] flex flex-col">
          <h3 className="text-xl text-[#3d3128] mb-6">Website</h3>
          <a href="https://www.easemypujaa.com" className="text-[#5c4a3d] text-sm hover:underline">
            www. Easemypujaa.com
          </a>
        </div>

        {/* Col 3 */}
        <div className="p-8 flex flex-col items-start md:items-center">
          <h3 className="text-xl text-[#3d3128] mb-6 w-full md:text-center">Get Social</h3>
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">f</div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">𝕏</div>
          </div>
          <button className="border border-[#7a6c23] text-[#5c4a3d] px-6 py-2 rounded-sm hover:bg-[#c2b236]/30 transition-colors">
            Tag us in your photos!
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white font-sans overflow-x-hidden antialiased selection:bg-orange-200">
      <HeroSection />
      <StepsSection />
      <CTASection />
      <TeamSection />
      <FooterSection />
    </main>
  );
}
