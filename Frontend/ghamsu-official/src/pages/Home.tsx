import { useEffect, useState } from "react";
import { client, urlFor } from "../lib/sanityClient";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  image?: any;
  description?: string;
}

interface BlogItem {
  _id: string;
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
        const [eventsData, blogsData]: [EventItem[], BlogItem[]] = await Promise.all([
          client.fetch(`*[_type == "event"] | order(date asc)[0...4]{
            _id, title, date, time, venue, description, image
          }`),
          client.fetch(`*[_type == "blog"] | order(date desc)[0...4]{
            _id, title, date, author, image, content
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
    <div className="w-full overflow-hidden bg-white text-gray-900">
      {/* 🕊️ HERO SECTION */}
      <Hero />

      {/* 🙏 ABOUT SECTION */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white text-center px-6 md:px-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-sky-900 mb-6 leading-tight">
          A Family United in Faith & Purpose ✨
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-10">
          Welcome to GHAMSU — a vibrant fellowship of believers dedicated to spreading the gospel, 
          empowering students, and walking in Christ’s purpose.
        </p>

        <Link
          to="/about"
          className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition-all duration-300"
        >
          Learn More About Us
        </Link>
      </section>

      {/* 🌍 GHAMSU MISSION SECTION */}
      <section className="py-20 bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 text-center text-white px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">
          Know More About GHAMSU Missions 🌍
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-200 mb-10">
          GHAMSU is more than just a fellowship — it’s a divine movement. 
          We are committed to reaching students across campuses with the light of Christ, 
          building leaders grounded in faith, and transforming communities through the gospel. 
          Join our mission to bring hope, unity, and transformation wherever we go.
        </p>
        <Link
          to="/missions"
          className="inline-block px-8 py-3 bg-yellow-400 text-sky-900 font-semibold rounded-full hover:bg-yellow-500 transition-all duration-300"
        >
          Discover Our Mission
        </Link>
      </section>

      {/* 📅 UPCOMING EVENTS */}
      <section className="py-16 bg-sky-50 text-center px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-sky-900">
          Upcoming Events 📅
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events at the moment.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
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
                    <h3 className="text-xl font-semibold mb-2 text-sky-900">
                      {event.title}
                    </h3>
                    <p className="text-yellow-600 text-sm mb-2">
                      {new Date(event.date).toLocaleDateString()}{" "}
                      {event.time && `• ${event.time}`}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">📍 {event.venue}</p>
                    <p className="text-gray-600 text-sm mb-4">
                      {truncate(event.description, 100)}
                    </p>
                    <Link
                      to="/events"
                      className="text-sky-700 font-medium hover:underline"
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
                className="inline-block px-8 py-3 bg-sky-900 text-yellow-400 font-semibold rounded-full hover:bg-sky-800 transition-all duration-300"
              >
                See More Events
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 🎥 YOUTUBE VIDEOS SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 text-center px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-10">
          Watch & Be Inspired 🎥
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* ✅ Your Real GHAMSU YouTube Video */}
          <iframe
            className="w-full aspect-video rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            src="https://www.youtube.com/embed/oer4Pr0ZOOA?si=sEacmxl0zx67qXqD"
            title="GHAMSU Official Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          {/* ✅ Placeholder for second GHAMSU video */}
          <iframe
            className="w-full aspect-video rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            src="https://www.youtube.com/embed/cjqy3_mcdiI?si=h9_DRjBNLXgdUKxD"
            title="GHAMSU Video 2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* ✍️ BLOGS */}
      <section className="py-20 bg-white text-center px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-10">
          Latest Blogs 📰
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog posts available yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
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
                    <h3 className="text-xl font-semibold text-sky-900 mb-2">
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
                className="inline-block px-8 py-3 bg-sky-900 text-yellow-400 font-semibold rounded-full hover:bg-sky-800 transition-all duration-300"
              >
                See More Blogs
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 📨 NEWSLETTER */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-center px-6 md:px-12 text-sky-900">
        <h2 className="text-3xl font-bold mb-4">
          Stay Connected with GHAMSU 💌
        </h2>
        <p className="text-sky-900 mb-6">
          Join our mailing list to receive updates, devotionals, and event alerts.
        </p>

        <div className="flex justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-l-full border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
          <button className="px-6 py-3 bg-sky-900 text-yellow-400 font-semibold rounded-r-full hover:bg-sky-800 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
