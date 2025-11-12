import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";

interface BlogPost {
  title: string;
  slug: { current: string };
  date: string;
  author: string;
  image?: any;
  content?: any;
  excerpt?: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "blog"] | order(date desc) {
        title,
        slug,
        date,
        author,
        image,
        excerpt,
        content
      }`)
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const truncateText = (text = "", limit = 140) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔹 Hero Section */}
      <Hero />

      {/* 🔹 Blog Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Blog & Updates
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore faith-filled stories, devotionals, and updates from our
            community — written to inspire and empower you.
          </motion.p>
        </div>

        {/* Loading & Empty States */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Loading blog posts...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No blog posts available at the moment.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((post, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden flex flex-col border border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                {/* Blog Image */}
                {post.image && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={urlFor(post.image).width(700).height(400).url()}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <p className="absolute bottom-3 left-3 bg-yellow-400 text-black px-3 py-1 text-sm font-semibold rounded-full">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}

                {/* Blog Text */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-800 mb-2 group-hover:text-yellow-500 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      ✍️ By {post.author}
                    </p>

                    <div className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
                      {post.excerpt ? (
                        <p>{truncateText(post.excerpt, 160)}</p>
                      ) : post.content ? (
                        <PortableText
                          value={post.content}
                          components={{
                            block: {
                              normal: ({ children }) => (
                                <p>{truncateText(Array.isArray(children) ? children.join(" ") : String(children), 160)}</p>
                              ),
                            },
                          }}
                        />
                      ) : (
                        <p>No content available.</p>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug.current}`}
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

      {/* 🔹 Closing CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Share Your Story With Us
        </motion.h2>
        <motion.p
          className="text-lg mb-6 max-w-2xl mx-auto text-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Have a testimony, devotional, or inspiring message? Send it to our
          media team — your story could inspire thousands.
        </motion.p>
        <motion.a
          href="/contact"
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Contact Media Team
        </motion.a>
      </section>
    </div>
  );
};

export default Blog;
