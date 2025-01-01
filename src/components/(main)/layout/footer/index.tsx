import React from "react";
import { Mail, FileText, Shield, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-neutral-950/10 bg-gradient-to-r from-neutral-50 to-neutral-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-8 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Links Section */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
            <a
              href="#"
              className="flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <Shield className="mr-2 h-4 w-4" />
              <span className="text-sm">Privacy Policy</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            <a
              href="#"
              className="flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <FileText className="mr-2 h-4 w-4" />
              <span className="text-sm">Terms of Service</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            <a
              href="mailto:info@zarareviews.com"
              className="flex items-center text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <Mail className="mr-2 h-4 w-4" />
              <span className="text-sm">info@zarareviews.com</span>
            </a>
          </div>

          {/* Copyright Section */}
          <div className="flex text-neutral-600 md:items-center md:justify-end">
            <p className="text-sm font-medium">
              © {currentYear} Zara Reviews. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
