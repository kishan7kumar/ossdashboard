import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Tooltip, Space } from "antd";
import {
  MdKeyboardArrowLeft,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  let toggle = false;
  var elem = document.documentElement;
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      elem.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  return (
    <div className="h-full w-full flex flex-col bg-gray-100">
      <div className="h-14 bg-blue-600 drop-shadow-lg p-2 flex items-center justify-between">
        <div>
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={<MdKeyboardArrowLeft className="text-white text-3xl" />}
            onClick={() => navigate("/home")}
          />
        </div>
        <div className="text-white font-semibold text-xl">Dashboard</div>
        <div>
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={
              !isFullScreen ? (
                <MdFullscreen className="text-white text-3xl" />
              ) : (
                <MdFullscreenExit className="text-white text-3xl" />
              )
            }
            onClick={() => toggleFullScreen()}
          />
        </div>
      </div>
      <div className="grow">
        <div className="h-full w-full overflow-y-auto"></div>
      </div>
    </div>
  );
};
export default DashboardPage;
