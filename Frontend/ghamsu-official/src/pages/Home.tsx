import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";

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

  const truncate = (text: string | null | undefined, length: number) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, blogsData] = await Promise.all([
          client.fetch(`*[_type == "event"] | order(date asc)[0...4]{
            title,
            date,
            time,
            venue,
            description,
            image
          }`),
          client.fetch(`*[_type == "blog"] | order(date desc)[0...4]{
            title,
            date,
            author,
            image,
            content
          }`),
        ]);

        setEvents(eventsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching home page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* 🕊️ HERO SECTION */}
      <Hero />

      {/* 🙏 ABOUT SECTION */}
      <section className="py-20 sm:py-24 bg-gray-50 text-center px-6 md:px-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
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

      {/* 📅 UPCOMING EVENTS SECTION (New Sky Theme) */}
      <section className="py-10 sm:py-16 bg-sky-900 text-center px-6 md:px-12 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-yellow-400">
          Upcoming Events 📅
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-300">No upcoming events at the moment.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="bg-sky-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {event.image && (
                    <img
                      src={urlFor(event.image).url()}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {event.title}
                    </h3>
                    <p className="text-yellow-400 text-sm mb-2">
                      {new Date(event.date).toLocaleDateString()}{" "}
                      {event.time && `• ${event.time}`}
                    </p>
                    <p className="text-gray-300 text-sm mb-3">📍 {event.venue}</p>
                    <p className="text-gray-300 text-sm mb-4">
                      {truncate(event.description, 100)}
                    </p>
                    <Link
                      to="/events"
                      className="text-yellow-400 font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/events"
                className="inline-block px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
              >
                See More Events
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ✍️ BLOG SECTION */}
      <section className="py-20 sm:py-24 bg-gray-50 text-center px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
          Latest Blogs 📰
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog posts available yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {blog.image && (
                    <img
                      src={urlFor(blog.image).url()}
                      alt={blog.title}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {new Date(blog.date).toLocaleDateString()} • By{" "}
                      {blog.author}
                    </p>

                    <div className="text-gray-600 text-sm mb-4 line-clamp-4">
                      {Array.isArray(blog.content) ? (
                        <PortableText
                          value={blog.content.slice(0, 1)}
                          components={{
                            block: {
                              normal: ({ children }) => (
                                <p>
                                  {truncate(
                                    Array.isArray(children)
                                      ? children.join(" ")
                                      : "",
                                    120
                                  )}
                                </p>
                              ),
                            },
                          }}
                        />
                      ) : (
                        <p>{truncate(blog.content, 120)}</p>
                      )}
                    </div>

                    <Link
                      to="/blog"
                      className="text-yellow-600 font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/blog"
                className="inline-block px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all duration-300"
              >
                See More Blogs
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 📸 GALLERY SECTION */}
      <section className="py-20 sm:py-24 bg-white text-center px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
          Moments of Fellowship 📸
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["/assets/gallery1.jpg", "/assets/gallery2.jpg", "/assets/gallery3.jpg"].map(
            (img, i) => (
              <img
                key={i}
                src={img}
                alt="Gallery"
                loading="lazy"
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
          Stay Connected with GHAMSU
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
          <button className="px-6 py-3 bg-yellow-500 text-bg-sky-900 font-semibold rounded-r-full hover:bg-yellow-600 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
