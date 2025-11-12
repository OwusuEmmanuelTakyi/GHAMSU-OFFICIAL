import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

interface Executive {
  name: string;
  role: string;
  phone: string;
  image?: any;
}

interface Stats {
  totalLocals: number;
  regions: number;
}

const Contact: React.FC = () => {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [stats, setStats] = useState<Stats>({ totalLocals: 0, regions: 0 });
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Executives & Stats from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const execData = await client.fetch(
          `*[_type == "executive"] | order(orderRank asc){
            name,
            role,
            phone,
            image
          }`
        );

        const statsData = await client.fetch(
          `*[_type == "stats"][0]{ totalLocals, regions }`
        );

        setExecutives(execData);
        setStats(statsData || { totalLocals: 0, regions: 0 });
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <Hero />

      {/* 🔹 Page Header */}
      <section className="max-w-5xl mx-auto text-center px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Get in Touch with GHAMSU
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Whether you’re a member, partner, or student looking to connect — we
          would love to hear from you. Meet our national executives and reach
          out through any of our channels.
        </p>
      </section>

      {/* 🔹 Executives Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <h3 className="text-3xl font-bold text-blue-800 text-center mb-10">
          Our National Executives
        </h3>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading executives...
          </p>
        ) : executives.length === 0 ? (
          <p className="text-center text-gray-500">
            No executive data available.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {executives.map((exec, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 text-center p-6"
                whileHover={{ scale: 1.03 }}
              >
                {exec.image && (
                  <img
                    src={urlFor(exec.image).width(400).url()}
                    alt={exec.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-400 shadow-md"
                  />
                )}
                <h4 className="text-xl font-semibold text-blue-700">
                  {exec.name}
                </h4>
                <p className="text-gray-600 mb-2">{exec.role}</p>
                <p className="text-yellow-600 font-medium">{exec.phone}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 🔹 Stats Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-yellow-400">
              {stats.totalLocals || 500}+
            </span>
            <p className="text-lg font-medium">Active Locals</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-yellow-400">
              {stats.regions || 20}
            </span>
            <p className="text-lg font-medium">Regions Across Ghana</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-yellow-400">1</span>
            <p className="text-lg font-medium">United Family in Christ</p>
          </div>
        </div>
      </section>

      {/* 🔹 Contact Form Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <h3 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Send Us a Message
        </h3>

        <form className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              placeholder="Write your message here..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
