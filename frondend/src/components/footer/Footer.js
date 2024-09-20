import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-800 p-4 flex items-center justify-between border border-y-4">
      {/* Left section */}
      <div className="text-lg">
        &copy; {new Date().getFullYear()} TODO_APP. All rights reserved.
      </div>

      {/* Right section */}
      <div className="space-x-4">
        <a href="/privacy" className="hover:underline hover:text-slate-600">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:underline hover:text-slate-600">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}

export default Footer;
