import React from "react";
import Hero from "../components/Hero";
import gLogo from "../assets/ghamsulogo.png";
import historyImg from "../assets/hero-bg.jpg";
//import missionImg from "../assets/hero-bg.jpg";

const About: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 text-gray-800">
      {/* 🔹 HERO SECTION */}
      <Hero />

      {/* 🔹 INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-6">
          About Ghana Methodist Students’ Union (GHAMSU)
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          The <strong>Ghana Methodist Students’ Union (GHAMSU)</strong> is a vibrant 
          Christian movement uniting Methodist students across tertiary and 
          second-cycle institutions. Founded under the auspices of the{" "}
          <strong>Methodist Church Ghana</strong>, GHAMSU nurtures faith, 
          discipline, and leadership among students who aspire to impact the 
          church and nation.
        </p>
        <div className="flex justify-center mt-10">
          <img
            src={gLogo}
            alt="GHAMSU Logo"
            className="w-52 h-52 rounded-full object-contain shadow-lg border-4 border-white"
          />
        </div>
      </section>

      {/* 🔹 HISTORY */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src={historyImg}
            alt="GHAMSU History"
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
          />
          <div>
            <h3 className="text-3xl font-bold text-sky-900 mb-4">
              Brief History of GHAMSU
            </h3>
            <p className="text-gray-700 leading-relaxed">
              GHAMSU began in <strong>1965</strong> as the Ghana Inter-University
              Methodist Union (GIUMU), pioneered by <strong>Prof. S. N. Quartey</strong>.
              It united Methodist students from universities like <strong>UG, KNUST, and UCC</strong>.
              By 1984, GHAMSU became the official umbrella body for all
              post-elementary Methodist students in Ghana, adopting the
              inspiring slogan —{" "}
              <strong>“Ambassadors for Christ” (2 Corinthians 5:20)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 MISSION, VISION & MOTTO */}
      <section className="bg-sky-900 text-white py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-yellow-400">
              Vision
            </h3>
            <p>
              To develop ambassadors in unity and love for Christ — witnessing
              Him to the nations and building on the strong foundation of the
              Church.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-yellow-400">
              Mission
            </h3>
            <p>
              To evangelize, disciple, and train Spirit-filled leaders who will
              transform the Church and society through excellence and service.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-yellow-400">
              Motto
            </h3>
            <p>
              <strong>“Ambassadors in Unity and Love”</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 BASIS OF FAITH */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-sky-900 mb-6">
            Our Faith Foundation
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            GHAMSU upholds the doctrinal standards of the{" "}
            <strong>Methodist Church Ghana</strong> — based on the divine
            revelation in the Holy Scriptures. Our faith is anchored on the
            Methodist “Four ALL’s”:
          </p>
          <ul className="space-y-3 text-gray-700 font-medium text-lg">
            <li>✔️ All need to be saved</li>
            <li>✔️ All can be saved</li>
            <li>✔️ All can know they are saved</li>
            <li>✔️ All can be saved to the uttermost</li>
          </ul>
        </div>
      </section>

      {/* 🔹 LOGO MEANING */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-sky-900 mb-4">
              The GHAMSU Logo
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The GHAMSU logo is rich with symbolism — a{" "}
              <strong>circle, cross, and white banner</strong> bearing the red
              inscription “GHAMSU”.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>The circle represents the world — our mission field.</li>
              <li>
                The cross signifies Christ’s sacrifice for humanity’s redemption.
              </li>
              <li>
                The white banner shows our readiness to reach out in peace.
              </li>
              <li>
                The red inscription symbolizes the blood of Jesus Christ.
              </li>
            </ul>
          </div>
          <img
            src={gLogo}
            alt="GHAMSU Logo"
            className="w-64 mx-auto rounded-full shadow-lg border-4 border-white"
          />
        </div>
      </section>

      {/* 🔹 UNIFORMS */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            GHAMSU Uniforms
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our uniforms identify us as ambassadors of Christ. Each symbolizes
            unity, purpose, and decency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Uniform A",
              desc: "Ceremonial cloth for official events — worn during communion, induction, and anniversary services.",
            },
            {
              title: "Uniform B",
              desc: "GHAMSU Lacoste — for midweek services and meetings.",
            },
            {
              title: "Uniform C",
              desc: "Batik — for funerals, weddings, and informal events.",
            },
          ].map((u, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
            >
              <h4 className="text-xl font-semibold text-sky-900 mb-3">
                {u.title}
              </h4>
              <p className="text-gray-600">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CALL TO ACTION */}
      <section className="bg-sky-900 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join the GHAMSU Family
        </h2>
        <p className="text-lg mb-6 text-gray-200">
          Be part of a generation of young believers committed to serving Christ
          and making a difference.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;
