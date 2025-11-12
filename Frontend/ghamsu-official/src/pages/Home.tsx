import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";

// Type definitions
interface EventItem {
  title: string;
  date: string;
  time?: string;
  venue: string;
  image?: any;
  description?: string;
}

interface BlogItem {
  title: string;
  date: string;
  author: string;
  image?: any;
  content?: any;
}

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Truncate text helper
  const truncate = (text: string | null | undefined, length: number) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await client.fetch(`*[_type == "event"] | order(date asc)[0...3]{
          title,
          date,
          time,
          venue,
          description,
          image
        }`);

        const blogsData = await client.fetch(`*[_type == "blog"] | order(date desc)[0...3]{
          title,
          date,
          author,
          image,
          content
        }`);

        setEvents(eventsData);
        setBlogs(blogsData);
      } catch (err) {
        console.error("Error fetching home page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* 🕊️ HERO SECTION */}
      <Hero />

      {/* 🙏 ABOUT SECTION */}
      <section className="py-24 bg-gray-50 text-center px-6 md:px-12">
        <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          A Family United in Faith & Purpose ✨
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-10">
          Welcome to GHAMSU — a vibrant fellowship of believers dedicated to
          spreading the gospel, empowering students, and walking in Christ’s
          purpose.
        </p>

        <Link
          to="/about"
          className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all duration-300"
        >
          Learn More About Us
        </Link>
      </section>

      {/* 📅 EVENTS SECTION */}
      <section className="py-24 bg-white text-center px-6 md:px-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Upcoming Events 📅
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {event.image && (
                  <img
                    src={urlFor(event.image).url()}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-yellow-600 text-sm mb-2">
                    {new Date(event.date).toLocaleDateString()}{" "}
                    {event.time && `• ${event.time}`}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    📍 {event.venue}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {truncate(event.description, 100)}
                  </p>
                  <Link
                    to="/events"
                    className="text-yellow-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✍️ BLOG SECTION */}
      <section className="py-24 bg-gray-50 text-center px-6 md:px-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Latest Blogs 📰</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog posts available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.map((blog, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {blog.image && (
                  <img
                    src={urlFor(blog.image).url()}
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {new Date(blog.date).toLocaleDateString()} • By {blog.author}
                  </p>

                  {/* ✅ Render PortableText safely */}
                  <div className="text-gray-600 text-sm mb-4 line-clamp-4">
                    {blog.content && Array.isArray(blog.content) ? (
                      <PortableText
                        value={blog.content.slice(0, 1)} // just the first block as preview
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p>{truncate(Array.isArray(children) ? children.join(" ") : "", 120)}</p>
                            ),
                          },
                        }}
                      />
                    ) : (
                      <p>{truncate(blog.content, 120)}</p>
                    )}
                  </div>

                  <Link
                    to="/blogs"
                    className="text-yellow-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📸 GALLERY SECTION */}
      <section className="py-24 bg-white text-center px-6 md:px-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Moments of Fellowship 📸
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["/assets/gallery1.jpg", "/assets/gallery2.jpg", "/assets/gallery3.jpg"].map(
            (img, i) => (
              <img
                key={i}
                src={img}
                alt="Gallery"
                className="w-full h-64 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              />
            )
          )}
        </div>
        <Link
          to="/gallery"
          className="mt-10 inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all duration-300"
        >
          View Full Gallery
        </Link>
      </section>

      {/* 📨 NEWSLETTER SECTION */}
      <section className="py-20 bg-gray-50 text-center px-6 md:px-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Stay Connected with GHAMSU 📨
        </h2>
        <p className="text-gray-600 mb-6">
          Join our mailing list to receive updates, devotionals, and event alerts.
        </p>
        <div className="flex justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none"
          />
          <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-r-full hover:bg-yellow-600 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
