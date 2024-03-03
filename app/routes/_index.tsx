import React from "react";
import { Link } from "@remix-run/react";
import logo from "../images/Anxend Logo.svg";
import bee from "../images/Buzzbee_Headset_and_Clipboard 1.png";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Quiz Project" }];

export default function Index() {
  return (
    <div className="min-h-screen bg-anxpurple-300 py-6">
      <div className="container">
        <img className="h-5 w-auto" src={logo} alt="Anxend logo" />
      </div>

      <div className="flex lg:h-screen lg:items-center">
        <div className="container flex flex-col lg:flex-row">
          <div>
            <h1 className="mt-10 font-montserrat text-5xl text-white drop-shadow-xl">
              Welcome to the Quiz Project
            </h1>
            <p className="mt-8 font-montserrat text-xl text-white">
              This is where you can start your journey.
            </p>
            {/* Link to the Character Selection component */}
            <Link
              className="mt-8 inline-block rounded-full bg-anxpurple-700 px-16 py-4 font-montserrat text-white hover:bg-anxwhite-300 hover:text-anxgreen-300 hover:shadow-xl"
              to="/CharacterSelection" // Link to the Character Selection component
            >
              Select Your Character
            </Link>
            <p className="mt-8 font-montserrat text-xl text-white ">
              Choose wisely!
            </p>
          </div>
          <div className="h-1/3">
            <div className="h-1/3">
              <img className="lg:-mt-28 lg:block" src={bee} alt="Bee" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
