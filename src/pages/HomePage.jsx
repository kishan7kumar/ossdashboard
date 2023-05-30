import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import "../stylesheets/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full imageWrapper  p-4 sm:p-0">
      <div className="flex w-full h-full">
        <div className="m-auto">
          <div className=" text-center p-3 rounded-xl drop-shadow-xl">
            <div className="font-semibold text-6xl sm:text-8xl  text-white leading-snug font-sans">
              OSS Dashboard
            </div>
            <div className="py-10 text-white text-lg font-medium">
              The OSS Dashboard collects data on all repos with 1,000+ GitHub
              stars <br></br>and publish the top 50 companies that are
              affiliated with these repos.
            </div>
            <div>
              <Button
                type="primary"
                className="font-semibold drop-shadow-lg h-12 text-xl rounded-md w-full sm:w-auto"
                onClick={() => navigate("/dashboard")}
              >
                Explore Data
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 text-gray-100 font-medium flex w-full justify-center p-2 left-0">
          By Vinay Dwarkanath
        </div>
      </div>
    </div>
  );
};
export default HomePage;
