import React, { useEffect, useState } from "react";
import AuthService from "../../services/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    callApi(page);
  }, [page]);

  const callApi = (page) => {
    AuthService.users({ page: page })
      .then((response) => {
        console.log(response);
        setData(response.data);
        // fireToast("success", response.data.message, "bottom-right", true);
      })
      .catch((err) => {
        // fireToast("error", err.response.data.message, undefined, true);
      });
  };

  console.log("data",data)
  return <div>dashboard</div>;
};

export default Dashboard;
