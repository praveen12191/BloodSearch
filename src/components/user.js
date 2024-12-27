import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/user.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const UsersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [flage, setFlage] = useState(data?.data?.donate || false);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(data?.data || {});
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(userData?.state || "");
  const [districtList, setDistrictList] = useState([]);
  const [districtName, setDistrictName] = useState(userData?.district || "");
  const [groupList, setGroupList] = useState([]);
  const [gender, setGender] = useState(userData?.gender === "Male");
  const [age, setAge] = useState(userData?.age || "");
  const [bloodGroup, setBloodGroup] = useState(userData?.group || "");
  const [hasAccess, setHasAccess] = useState(false);

  const token = sessionStorage.getItem("token");

  // Check user access
  useEffect(() => {
    setHasAccess(!!token);
  }, [token]);

  // Fetch groups and states
  useEffect(() => {
    axios.get("http://localhost:4000/formData/groups").then((res) => {
      setGroupList(res.data || []);
    });

    axios.get("http://localhost:4000/formData/states").then((res) => {
      setStateList(res.data?.states || []);
    });
  }, []);

  // Update districts when state changes
  useEffect(() => {
    const selectedStateData = stateList.find((state) => state.state === selectedState);
    setDistrictList(selectedStateData?.districts || []);
  }, [selectedState, stateList]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setDistrictName(""); // Clear district when state changes
  };

  const handleDistrictChange = (e) => {
    setDistrictName(e.target.value);
  };

  const handleToggleDonate = () => {
    setFlage((prev) => !prev);
  };

  const handleEditToggle = async () => {
    if (isEditable) {
      try {
        const response = await axios.post("http://localhost:4000/user/update", {
          name: userData.name,
          age: age || userData.age,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          group: bloodGroup,
          district: districtName,
          state: selectedState,
          gender: gender ? "Male" : "Female",
          donate: flage,
        });

        if (response.status === 200) {
          toast.success("Data updated successfully");
          setUserData((prev) => ({
            ...prev,
            age: age || prev.age,
            group: bloodGroup,
            district: districtName,
            state: selectedState,
            gender: gender ? "Male" : "Female",
            donate: flage,
          }));
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        toast.error("Failed to save changes. Please try again.");
        console.error("Error saving data:", error);
      }
    }

    setIsEditable((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value === "Male");
  };
  const homebutton = () => {
    navigate("/");
  };
  const ageChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    setUserData((prev) => ({
      ...prev,
      age: newAge,
    }));
  };

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center h-screen">
        Need Access. Please <Link to={"/login"}>Login</Link>.
      </div>
    );
  }


  return (
    <div className="bg-gradient-to-r from-gray-800 to-black min-h-screen">
      <Toaster position="top-right" richColors />
      <div className="but flex items-center justify-center mt-4">
        <button onClick={homebutton}>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="icon">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
              </svg>
            </div>
          </div>
          <span>Home</span>
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-2/5 mt-36">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Admin"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Admin
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">Can you provide your details?</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>

          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header flex justify-between items-center w-full">
              <span></span>
              <button
                className="mb-6 ml-4 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleEditToggle}
              >
                {isEditable ? "Save Changes" : "Edit"}
              </button>
            </div>
            <div className="chat-bubble">
              Gmail:{" "}
              <span>{userData.email}</span>
            </div>
            <div className="chat-bubble">
              PhoneNumber:{" "}
              <span>{userData.phoneNumber}</span>
            </div>

            {[
              { label: "Name", name: "name", value: userData.name },
              { label: "Age", name: "age", value: age || userData.age },
            ].map((field) => (
              <div key={field.name} className="chat-bubble">
                {field.label}:{" "}
                {isEditable ? (
                  <input
                    type={field.name === "age" ? "number" : "text"}
                    name={field.name}
                    value={field.value}
                    onChange={field.name === "name" ? handleInputChange : ageChange}
                    className="input input-bordered"
                  />
                ) : (
                  <span>{field.value}</span>
                )}
              </div>
            ))}

            <div className="chat-bubble">
              Blood Group:{" "}
              {isEditable ? (
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className={`ml-2 p-1 border rounded ${isEditable ? "bg-transparent" : ""}`}
                >
                  {groupList.map((grp) => (
                    <option key={grp} value={grp}>
                      {grp}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{bloodGroup}</span>
              )}
            </div>

            <div className="chat-bubble">
              State:{" "}
              {isEditable ? (
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className={`ml-2 p-1 border rounded ${isEditable ? "bg-transparent" : ""}`}
                >
                  {stateList.map((st) => (
                    <option key={st.state} value={st.state}>
                      {st.state}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{selectedState}</span>
              )}
            </div>

            <div className="chat-bubble">
              District:{" "}
              {isEditable ? (
                <select
                  value={districtName}
                  onChange={handleDistrictChange}
                  className={`ml-2 p-1 border rounded ${isEditable ? "bg-transparent" : ""}`}
                >
                  {districtList.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{districtName}</span>
              )}
            </div>

            <div className="chat-bubble">
              Gender:{" "}
              {isEditable ? (
                <select
                  value={gender ? "Male" : "Female"}
                  onChange={handleGenderChange}
                  className={`ml-2 p-1 border rounded ${isEditable ? "bg-transparent" : ""}`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span>{gender ? "Male" : "Female"}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
