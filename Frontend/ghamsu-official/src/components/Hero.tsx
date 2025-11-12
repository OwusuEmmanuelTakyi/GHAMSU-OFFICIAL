import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import { motion, AnimatePresence } from "framer-motion";

interface Scripture {
  text: string;
  image: string;
}

const Hero: React.FC = () => {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "hero"] | order(_createdAt asc){
            text,
            image
          }`
        );

        const mapped = data.map((item: any) => ({
          text: item.text,
          image: urlFor(item.image).url(),
        }));

        setScriptures(mapped);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Auto-slide every 9s
  useEffect(() => {
    if (scriptures.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scriptures.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [scriptures]);

  if (scriptures.length === 0) {
    return (
      <section className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-800 via-yellow-900 to-black text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </section>
    );
  }

  const current = scriptures[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🔹 Animated Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current.image}
          src={current.image}
          alt="Background"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>

      {/* 🔹 Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24 text-white">
        <motion.p
          className="uppercase text-sm tracking-[0.2em] text-yellow-400 mb-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Faith • Hope • Love
        </motion.p>

        <motion.h1
          key={current.text}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-yellow-500">GHAMSU</span>
        </motion.h1>

        <motion.p
          key={currentIndex}
          className="italic text-gray-200 text-lg md:text-xl max-w-xl mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          “{current.text}”
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-600 hover:scale-105 transition-all duration-300">
            I’m New Here
          </button>
          <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* 🔹 Floating Info Card */}
      
    </section>
  );
};

export default Hero;
