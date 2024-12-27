import { Link, useNavigate } from "react-router-dom";
import style from "../styles/register.module.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    let url = "https://bloodsearchserver.onrender.com/user/login";
    const res = await axios.post(url, {
      email: email,
      phoneNumber: phoneNumber,
    });

    if (res.status === 200) {
      sessionStorage.setItem("token", res.data.token);
      navigate("/userPage", { state: res.data });
    } else {
      navigate("/Register");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-6"
        onSubmit={formSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-6">
          Login
        </h2>

        <div className="space-y-4">
          {/* Email Input */}
          <label className="input input-bordered flex items-center gap-2 bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow bg-transparent text-white placeholder-gray-400"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Phone Number Input */}
          <label className="input input-bordered flex items-center gap-2 bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M3 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3Zm1 2h8v10H4V3Z" />
            </svg>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent text-white placeholder-gray-400"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center justify-between mt-6">
          <button
            className={`${style.button} w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 transition-all duration-300`}
            type="submit"
          >
            Login
          </button>
        </div>

        <div className="text-center text-gray-400 mt-4">
          <span>Don't have an account? </span>
          <Link to="/Register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
