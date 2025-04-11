import React, { useEffect, useState } from "react";
import "./dashboard.css";
import AuthService from "../../services/api";
import { ActionIcon, Button, Group, Menu, Modal } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDotsVertical,
  IconX,
} from "@tabler/icons-react";
import TableLoader from "../../components/Table Loader/TableLoader";
import Image_Prefix from "../../assets";
import { use } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

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

  const callDeleteApi = (id) => {
    setDeleteLoading(true);

    AuthService.deleteUser(id)
      .then((response) => {
        setData((prev) => prev.filter((user) => user.id !== id));
        setOpenDeleteModal(false);
        setDeleteLoading(false);
        // fireToast("success", response.data.message, "bottom-right", true);
      })
      .catch((err) => {
        setDeleteLoading(false);
        // fireToast("error", err.response.data.message, undefined, true);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const callUpdateApi = (id) => {
    setLoading(true);

    AuthService.updateUser(id)
      .then((response) => {
        setOpenUpdateModal(false);
        setLoading(false);
        // fireToast("success", response.data.message, "bottom-right", true);
      })
      .catch((err) => {
        setLoading(false);
        // fireToast("error", err.response.data.message, undefined, true);
      });
  };

  console.log("data", data);
  console.log("formValues", formValues);
  return (
    <>
      <div className="header">
        <input
          type="text"
          placeholder="Search"
          className="search_input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button>Logout</Button>
        <img src={Image_Prefix.default_profile} alt="default_profile" />
      </div>
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
                          <Menu.Item
                            component="a"
                            onClick={() => {
                              setFormValues({
                                id: row.id,
                                first_name: row.first_name,
                                last_name: row.last_name,
                                email: row.email,
                              });
                              setOpenUpdateModal(true);
                            }}
                          >
                            Update
                          </Menu.Item>
                          <Menu.Item
                            component="a"
                            onClick={() => {
                              setDeleteId(row.id);
                              setOpenDeleteModal(true);
                            }}
                          >
                            Delete
                          </Menu.Item>
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

      <Modal
        opened={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false);
        }}
        withCloseButton={false}
      >
        <div className="modal_container">
          <div className="title_container">
            <p className="title">Update User : {formValues.id}</p>
            <ActionIcon
              onClick={() => {
                setOpenUpdateModal(false);
              }}
            >
              <IconX />
            </ActionIcon>
          </div>
          <div className="label_container">
            <label htmlFor="first_name">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="first_name"
              id="first_name"
              name="first_name"
              placeholder="Enter first name"
              required
              value={formValues.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="label_container">
            <label htmlFor="last_name">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="last_name"
              id="last_name"
              name="last_name"
              placeholder="Enter last name"
              required
              value={formValues.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="label_container">
            <label htmlFor="email">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <Group justify="center">
            <Button
              onClick={() => {
                setOpenUpdateModal(false);
              }}
              variant="outline"
              my={20}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              my={20}
              loading={isLoading}
              onClick={() => {
                callUpdateApi(formValues.id);
              }}
            >
              Update
            </Button>
          </Group>
        </div>
      </Modal>

      {deleteId && (
        <Modal
          opened={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
            setDeleteId(null);
          }}
          withCloseButton={false}
        >
          <div className="modal_container">
            <div className="title_container">
              <p className="title">Delete User : {deleteId}</p>
              <ActionIcon
                onClick={() => {
                  setOpenDeleteModal(false);
                  setDeleteId(null);
                }}
              >
                <IconX />
              </ActionIcon>
            </div>
            <p style={{ color: "red" }}>
              Are your sure you want to delete this user...?
            </p>
            <Group justify="center">
              <Button
                onClick={() => {
                  setOpenDeleteModal(false);
                  setDeleteId(null);
                }}
                variant="outline"
                my={20}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                my={20}
                loading={deleteLoading}
                className="delete_button"
                onClick={() => {
                  callDeleteApi(deleteId);
                }}
              >
                Delete
              </Button>
            </Group>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
