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
import RepoBarChart from "../components/RepoBarChart";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currentView, setCurrentView] = useState("table");
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
      let tableData = [];
      let chartData = [];
      data.items.forEach((element, index) => {
        tableData.push({
          key: index,
          companyName: [element.owner.login, element.homepage],
          stars: element.stargazers_count,
          repoName: element.full_name,
          githubLink: element.html_url,
          forks: element.forks_count,
          founded: element.created_at,
        });
        chartData.push({
          companyName: element.owner.login,
          stars: element.stargazers_count,
        });
      });
      setTableData(tableData);
      setChartData(chartData);
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

  const toggleDataView = (event) => {
    if (event.target.value === "chart") {
      setCurrentView("chart");
    } else {
      setCurrentView("table");
    }
  };

  useEffect(() => {
    getAllEventsList();
  }, []);

  return (
    <div className="h-full w-full flex flex-col bg-gray-100">
      <div className="h-14 bg-gray-900 drop-shadow-lg p-2 flex items-center justify-between">
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
      <div className="grow min-h-0 pb-4">
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
                onChange={(event) => toggleDataView(event)}
              >
                <Radio.Button value="table">Table View</Radio.Button>
                <Radio.Button value="chart">Chart View</Radio.Button>
              </Radio.Group>
            </div>
            {currentView === "table" ? (
              <RepoTable data={tableData}></RepoTable>
            ) : (
              <RepoBarChart data={chartData}></RepoBarChart>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
