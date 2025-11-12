import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EventItem {
  title: string;
  slug: { current: string };
  date: string;
  location: string;
  image?: any;
  excerpt?: string;
  description?: string;
}

const Event: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "event"] | order(date desc) {
        title,
        slug,
        date,
        location,
        image,
        excerpt,
        description
      }`)
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const truncateText = (text = "", limit = 120) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <Hero />

      {/* 🔹 Events Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay connected with GHAMSU’s latest programs, conferences, and
            spiritual gatherings across all campuses. Don’t miss what God is
            doing through His people.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading events...
          </p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No events available at the moment.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                {item.image && (
                  <img
                    src={urlFor(item.image).width(700).url()}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">
                      📅 {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      📍 {item.location}
                    </p>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {truncateText(item.excerpt || item.description, 140)}
                    </p>
                  </div>

                  <Link
                    to={`/event/${item.slug.current}`}
                    className="inline-block mt-auto text-blue-700 font-semibold hover:text-yellow-500 transition-colors duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 🔹 Closing Section */}
      <section className="bg-blue-800 text-white text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Don’t Miss Out on God’s Move
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-200">
          Be part of GHAMSU’s impactful events that strengthen your faith,
          connect you with believers, and empower you for purpose.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
        >
          Contact Us to Partner
        </a>
      </section>
    </div>
  );
};

export default Event;
