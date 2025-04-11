import React, { useState } from "react";
import "./login.css";
import { Button } from "@mantine/core";
import AuthService from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    callApi(formValues);
  };

  const callApi = (data) => {
    AuthService.login(data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        setLoading(false);
        toast.success("Logged In successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error occured while login!");
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <p className="heading">Login</p>
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
        <div className="label_container">
          <label htmlFor="password">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            value={formValues.name}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" loading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
