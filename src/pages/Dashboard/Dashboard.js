import React, { useEffect, useState } from "react";
import "./dashboard.css";
import AuthService from "../../services/api";
import { ActionIcon, Menu } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
} from "@tabler/icons-react";
import TableLoader from "../../components/Table Loader/TableLoader";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    callApi(page);
  }, [page]);

  const callApi = (page) => {
    AuthService.users({ page: page })
      .then((response) => {
        console.log(response);
        setData(response.data.data);
        setPerPage(response.data.per_page);
        setCount(response.data.total);
        setTotalPages(response.data.total_pages);
        // fireToast("success", response.data.message, "bottom-right", true);
      })
      .catch((err) => {
        // fireToast("error", err.response.data.message, undefined, true);
      });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  console.log("data", data);
  return (
    <div className="dashboard">
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Avatar</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {data ? (
          <tbody>
            {data &&
              data.map((row, i) => (
                <tr key={i}>
                  <td>{(page - 1) * perPage + i + 1}</td>
                  <td>
                    <img src={row.avatar} alt="avatar" />
                  </td>
                  <td style={{ fontWeight: "600" }}>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td style={{ color: "#228BE6" }}>{row.email}</td>
                  <td>
                    <Menu width={130} shadow="md">
                      <Menu.Target>
                        <ActionIcon>
                          <IconDotsVertical />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item component="a">Update</Menu.Item>
                        <Menu.Item component="a">Delete</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <TableLoader noOftd={6} />
        )}
      </table>

      <div className="table_pagination_container">
        <div
          className="table_pagination_container_prev_next"
          onClick={handlePreviousPage}
        >
          <IconChevronLeft />
          <p>Prev</p>
        </div>
        <p>{`${page} of ${totalPages}`}</p>
        <div
          className="table_pagination_container_prev_next"
          onClick={handleNextPage}
        >
          <p>Next</p>
          <IconChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
