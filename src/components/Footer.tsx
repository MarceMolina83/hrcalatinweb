import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Linkedin, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="HR-CALATIN Logo" className="h-20 w-32 object-contain bg-white rounded-lg p-1" />
            </div>
            <p className="text-sm text-primary-foreground/70">
              Connecting Latin American talent with Canadian opportunities for mutual growth and success.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/employers" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth">
                  For Employers
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth">
                  For Candidates
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/70">Talent Recruitment</li>
              <li className="text-primary-foreground/70">Skills Assessment</li>
              <li className="text-primary-foreground/70">Cultural Integration</li>
              <li className="text-primary-foreground/70">Career Development</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary-foreground/70 flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70">New Brunswick, Canada</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary-foreground/70 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@hrcalatin.com" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth">
                  info@hrcalatin.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary-foreground/70 flex-shrink-0 mt-0.5" />
                <a href="tel:+14165550101" className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth">
                  +1 (416) 555-0101
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} HR-CALATIN Interexchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
