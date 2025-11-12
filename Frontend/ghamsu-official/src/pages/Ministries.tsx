import React from "react";
import Hero from "../components/Hero";
import prayerImage from "../assets/hero-bg.jpg";
import musicImage from "../assets/hero-bg.jpg";
import evangelismImage from "../assets/hero-bg.jpg";
import mediaImage from "../assets/hero-bg.jpg";
import welfareImage from "../assets/hero-bg.jpg";

const Ministries: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <Hero />

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
          Our Ministries
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600">
          GHAMSU’s ministries are the heartbeat of the Union — each dedicated to
          nurturing the spiritual, moral, and social lives of students across
          campuses. These ministries ensure that members grow holistically while
          serving Christ in their unique gifts and callings.
        </p>
      </section>

      {/* Ministries Section */}
      <section className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-6 pb-20">
        {/* Prayer Ministry */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={prayerImage}
            alt="Prayer Ministry"
            className="w-full h-56 object-cover"
          />
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Prayer Ministry
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Prayer Ministry is the powerhouse of GHAMSU. Members intercede
              for campuses, the church, and the nation — building a culture of
              intimacy with God through consistent prayer and fasting.
            </p>
          </div>
        </div>

        {/* Evangelism Ministry */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={evangelismImage}
            alt="Evangelism Ministry"
            className="w-full h-56 object-cover"
          />
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Evangelism Ministry
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Evangelism Ministry is focused on spreading the gospel through
              outreach, missions, and personal witnessing. They lead community
              evangelism drives and revival programs on campus.
            </p>
          </div>
        </div>

        {/* Music Ministry */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={musicImage}
            alt="Music Ministry"
            className="w-full h-56 object-cover"
          />
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Music Ministry
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Music Ministry uses songs and instrumentals to usher the
              presence of God into our meetings. They train choristers and
              instrumentalists for both local and national GHAMSU programs.
            </p>
          </div>
        </div>

        {/* Media Ministry */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={mediaImage}
            alt="Media Ministry"
            className="w-full h-56 object-cover"
          />
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Media Ministry
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Media Ministry documents and publicizes GHAMSU events across
              all platforms. They manage photography, videography, and digital
              content creation to project the ministry’s vision.
            </p>
          </div>
        </div>

        {/* Welfare Ministry */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={welfareImage}
            alt="Welfare Ministry"
            className="w-full h-56 object-cover"
          />
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Welfare Ministry
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Welfare Ministry ensures that members’ needs are met through
              acts of compassion, visitation, and support during challenging
              times — reflecting Christ’s love in action.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Discover Your Place in Ministry
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Every student has a role to play in advancing God’s kingdom. Join a
          ministry today and grow your gifts while serving Christ with
          excellence.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
        >
          Get Involved
        </a>
      </section>
    </div>
  );
};

export default Ministries;
