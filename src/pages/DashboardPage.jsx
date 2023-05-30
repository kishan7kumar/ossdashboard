import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Tooltip, Space, Radio } from "antd";
import {
  MdKeyboardArrowLeft,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import { BsStars } from "react-icons/bs";
import request from "../utils/request";
import RepoTable from "../components/RepoTable";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tableData, setTableData] = useState([]);
  let toggle = false;
  var elem = document.documentElement;

  const getAllEventsList = async () => {
    try {
      const data = await request(
        "/search/repositories?q=stars:>=1000&per_page=50&page=1",
        {
          method: "GET",
        }
      );
      let newdata = [];
      // console.log(data.items);
      data.items.forEach((element, index) => {
        newdata.push({
          key: index,
          companyName: [element.owner.login, element.homepage],
          stars: element.stargazers_count,
          repoName: element.full_name,
          githubLink: element.html_url,
          forks: element.forks_count,
          founded: element.created_at,
        });
      });
      // console.log(newdata);
      setTableData(newdata);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      elem.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    getAllEventsList();
  }, []);

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
      <div className="grow min-h-0">
        <div className="h-full w-full overflow-y-auto flex p-4">
          <div className="container m-auto h-full">
            <div className="my-6 flex justify-between flex-wrap">
              <div className=" flex items-center">
                <BsStars className="text-amber-400 text-3xl" />
                <span className="text-gray-700 text-2xl font-medium ml-2">
                  Popular 50 Open Source GitHub Repos as of 2023
                </span>
              </div>
              <Radio.Group
                defaultValue="table"
                buttonStyle="solid"
                className="mt-4 lg:mt-0"
              >
                <Radio.Button value="table">Table View</Radio.Button>
                <Radio.Button value="chart">Chart View</Radio.Button>
              </Radio.Group>
            </div>

            <RepoTable data={tableData}></RepoTable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
