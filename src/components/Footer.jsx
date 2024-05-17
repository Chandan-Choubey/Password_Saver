import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-4 mt-8 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024
          <span>
            <span className="text-green-500 "> &lt;</span>
            <span className="font-bold text-xl">Pass</span>
            <span className="text-green-500">OP/&gt;. </span>
          </span>
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
