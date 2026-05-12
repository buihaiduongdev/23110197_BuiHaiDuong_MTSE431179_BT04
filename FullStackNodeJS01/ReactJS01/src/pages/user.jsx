import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";
import { Table, notification } from "antd";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUserApi();
      if (res && !res.message) {
        setDataSource(res);
      } else {
        notification.error({ message: "Lỗi", description: res.message });
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>List Users</h2>
      <Table dataSource={dataSource} columns={columns} rowKey={"id"} />
    </div>
  );
};
export default UserPage;
