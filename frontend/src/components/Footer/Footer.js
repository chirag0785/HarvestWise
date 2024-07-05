import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Harvest Wise</h3>
            <p className="text-sm">Empowering farmers with smart agricultural solutions.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/suitablecrops" className="hover:text-green-300">Crop Suitability</Link></li>
              <li><Link to="/irrigationschedules" className="hover:text-green-300">Irrigation Schedule</Link></li>
              <li><Link to="/getweather" className="hover:text-green-300">Weather Forecast</Link></li>
              <li><Link to="/resources" className="hover:text-green-300">Resource Management</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/discuss" className="hover:text-green-300">Forum</Link></li>
              <li><Link to="/blog" className="hover:text-green-300">Blog</Link></li>
              <li><Link to="/events" className="hover:text-green-300">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <p className="text-sm">Email: support@harvestwise.com</p>
            <p className="text-sm">Phone: 9988776655</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="text-white hover:text-green-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-green-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; 2024 Harvest Wise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
