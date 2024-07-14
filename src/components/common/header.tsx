import React from "react";
import HeaderIcon from "./header-icon";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex justify-between items-center mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
