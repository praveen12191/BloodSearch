import axios from "axios";
import { useEffect, useState } from "react";
import style from "../styles/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [district, setDistrict] = useState([]);
  const [group, setGroup] = useState([]);
  const [userName, setuserName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [gender, setgender] = useState(true);
  const navigate = useNavigate();

  const getGroup = () => {
    let url = "http://localhost:4000/formData/groups";
    axios.get(url).then((res) => {
      setGroup(res.data);
    });
  };
  const getState = () => {
    let url = "http://localhost:4000/formData/states";
    axios.get(url).then((res) => {
      setState(res.data.states);
    });
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const selectedStateData = state.find(
      (state) => state.state === selectedState
    );
    if (selectedStateData) {
      setDistrict(selectedStateData.districts);
    }
  };
  const handleGenderChange = (e) => {
    setgender(!gender);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    let url = "http://localhost:4000/user/register";
    console.log(
      userName,
      age,
      email,
      phoneNumber,
      bloodGroup,
      districtName,
      selectedState
    );

    try {
      const res = await axios.post(url, {
        name: userName,
        age: age,
        email: email,
        phoneNumber: phoneNumber,
        group: bloodGroup,
        district: districtName,
        state: selectedState,
        gender: gender,
      });
      if (res.status === 200) {
  
        navigate("/login");
      } else {
        navigate("/Register");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDistrictChange = (e) => {
    setDistrictName(e.target.value);
    console.log(districtName);
  };

  useEffect(() => {
    getState();
    getGroup();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form
  className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-6" // Change w-80 to w-96 or a custom class for more width
  onSubmit={formSubmit}
>

        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-6">
          Register
        </h2>

        <div className="space-y-4">
          {/* Name Input */}
          <label className="input input-bordered flex items-center gap-2 bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow bg-transparent text-white placeholder-gray-400"
              placeholder="Name"
              onChange={(e) => setuserName(e.target.value)}
            />
          </label>

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
              type="email"
              className="grow bg-transparent text-white placeholder-gray-400"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Age Input */}
          <div className="flex items-center gap-2 mt-2">
            <label className="input input-bordered flex items-center gap-2 flex-1">
              <input
                type="number"
                placeholder="Age"
                className="w-full bg-transparent text-white placeholder-gray-400"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            {/* Blood Group Select */}
            <label className="input input-bordered flex items-center gap-2 flex-1">
              <select
                className="w-full bg-transparent text-white"
                defaultValue=""
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="" disabled>
                  Blood Group
                </option>
                {group &&
                  group.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          {/* Gender Radio Buttons */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="gender"
                className="radio radio-primary"
                defaultChecked
                onChange={handleGenderChange}
              />
              <label>Male</label>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                name="gender"
                className="radio radio-primary"
                onChange={handleGenderChange}
              />
              <label>Female</label>
            </div>
          </div>

          {/* State and District Select */}
          <div className="flex items-center gap-2 mt-2">
            <label className="input input-bordered flex items-center gap-2 flex-1">
              <select
                className="w-full bg-transparent text-white"
                defaultValue=""
                onChange={handleStateChange}
              >
                <option value="" disabled>
                  Select State
                </option>
                {state.map((state) => (
                  <option key={state.state} value={state.state}>
                    {state.state}
                  </option>
                ))}
              </select>
            </label>

            <label className="input input-bordered flex items-center gap-2 flex-1">
              <select
                className="w-full bg-transparent text-white"
                defaultValue=""
                onChange={handleDistrictChange}
              >
                <option value="" disabled>
                  Select District
                </option>
                {district.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Phone Number Input */}
          <label className="input input-bordered flex items-center gap-2 mt-2">
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

        {/* Submit Button */}
        <div className="flex items-center justify-between mt-6">
          <button
            className={`${style.button} w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 transition-all duration-300`}
            type="submit"
          >
            Register
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center text-gray-400 mt-4">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
