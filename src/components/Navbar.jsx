import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className=" bg-slate-800 text-white">
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
          <div className="logo font-bold text-2xl">
            <span className="text-green-500 ">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </div>
          <div>
            <a href="https://github.com/" target="_blank">
              <img
                className="invert p-5 w-20 cursor-pointer "
                src="icons/github-mark.png"
                alt="Github Logo"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
