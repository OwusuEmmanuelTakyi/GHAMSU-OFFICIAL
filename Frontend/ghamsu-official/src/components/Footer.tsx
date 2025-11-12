import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import ghamsulogo from "../assets/ghamsulogo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-sky-950 to-sky-900 text-white py-14 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 🔹 Logo & Mission */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src={ghamsulogo}
              alt="GHAMSU Logo"
              className="w-12 h-12 rounded-full object-contain shadow-md"
            />
            <h2 className="text-2l font-semibold tracking-wide">
              GHANA METHODIST STUDENTS' UNION 
              (GHAMSU)
            </h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Glorifying God through faith, service, and unity. Making Christ known
            across all campuses and beyond.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-sky-300 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              { name: "Media", href: "/media" },
              { name: "Services", href: "/services" },
              { name: "Contact", href: "/contact" },
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-white hover:pl-1 transition-all duration-300 inline-block"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-sky-300 uppercase tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-4 text-gray-300 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-sky-400 mt-1 flex-shrink-0" />
              <span>Accra, Ghana</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-sky-400 mt-1 flex-shrink-0" />
              <span>+233 50 123 4567</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-sky-400 mt-1 flex-shrink-0" />
              <span>ghamsuofficial@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* 🔹 Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-sky-300 uppercase tracking-wide">
            Stay Connected
          </h3>
          <p className="text-gray-300 mb-5 text-sm">
            Subscribe to our newsletter for devotionals, updates, and upcoming
            events.
          </p>

          <div className="flex bg-white rounded-full overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-sky-400">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 text-gray-800 text-sm outline-none"
            />
            <button className="bg-sky-600 hover:bg-sky-700 px-5 py-2 text-white font-semibold transition-all duration-300">
              Subscribe
            </button>
          </div>

          <div className="flex gap-4 mt-6 justify-start">
            <a
              href="#"
              className="p-2 rounded-full bg-sky-800 hover:bg-sky-700 transition-all duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-800 hover:bg-sky-700 transition-all duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-800 hover:bg-sky-700 transition-all duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-800 hover:bg-sky-700 transition-all duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-sky-800 hover:bg-sky-700 transition-all duration-300"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Divider & Copyright */}
      <div className="border-t border-sky-800 mt-12 pt-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} GHAMSU Official. All Rights Reserved.
        </p>
        <p className="mt-2 text-white-500">
          Powered by the PUBLICATION AND COMMUNICATIONS BOARD (PCB)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
