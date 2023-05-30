import { Space, Table, Tag, Button } from "antd";
import dayjs from "dayjs";

const columns = [
  {
    title: "Company",
    dataIndex: "companyName",
    key: "companyName",
    render: (text) => (
      <a href={text[1]} target="blank">
        {text[0]}
      </a>
    ),
  },
  {
    title: "GitHub",
    key: "details",
    dataIndex: "githubLink",
    width: 120,
    render: (record) => (
      <Button size="small" block onClick={() => navigateToRepo(record)}>
        Repo
      </Button>
    ),
  },
  {
    title: "Founded",
    dataIndex: "founded",
    key: "founded",
    sorter: (a, b) => a.founded - b.founded,
    render: (date) => (
      <p className="w-full m-0 text-end"> {dayjs(date).format("YYYY")}</p>
    ),
    width: 120,
  },

  {
    title: "Stars",
    dataIndex: "stars",
    key: "stars",
    sorter: (a, b) => a.stars - b.stars,
    render: (stars) => (
      <p className="w-full m-0 text-end"> {stars.toLocaleString()}</p>
    ),
    width: 120,
  },

  {
    title: "Forks",
    dataIndex: "forks",
    key: "forks",
    sorter: (a, b) => a.forks - b.forks,
    render: (forks) => (
      <p className="w-full m-0 text-end"> {forks.toLocaleString()}</p>
    ),
    width: 120,
  },
];

const navigateToRepo = (linkToRepo) => {
  window.open(linkToRepo, "_blank");
};

const RepoTable = ({ data }) => {
  return (
    <div className="w-full">
      <Table
        loading={data.length > 0 ? false : true}
        bordered
        columns={columns}
        size="small"
        pagination={{ pageSize: 25 }}
        dataSource={data}
        scroll={true}
      />
    </div>
  );
};

export default RepoTable;
