import React, { useState } from "react";
import "./App.css";
import { Button } from "@mantine/core";

function App() {
  const [isLoading, setLoading] = useState(false);

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
    console.log("data", data);
    setLoading(false);
  };
  return (
    <div className="app">
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
}

export default App;
