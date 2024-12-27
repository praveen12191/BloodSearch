import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/user.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const UsersPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const data = location.state;
  const [flage, setFlage] = useState(data ? data.data.donate : false);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(data ? data.data : "");
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState(userData ? userData.state : "");
  const [district, setDistrict] = useState([]);
  const [districtName, setDistrictName] = useState(userData ? userData.district : "");
  const [group, setGroup] = useState([]);
  const [gender, setGender] = useState(userData.gender === "Male");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState(userData ? userData.group : "");
  const [view,setview] = useState(true)
  let token = sessionStorage.getItem("token")
  console.log(token);
  
  const checkToken =() =>{
    if(token){
      setview(true)
    }
    else{
      setview(false)
    }
  }
  
  const getGroup = () => {
    const url = "http://localhost:4000/formData/groups";
    axios.get(url).then((res) => {
      setGroup(res.data);
    });
  };

  const getState = () => {
    const url = "http://localhost:4000/formData/states";
    axios.get(url).then((res) => {
      setState(res.data.states);
    });
  };


  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const selectedStateData = state.find((state) => state.state === selectedState);
    if (selectedStateData) {
      setDistrict(selectedStateData.districts);
      setDistrictName(""); // Clear district when state changes
    }
  };

  const handleDistrictChange = (e) => {
    setDistrictName(e.target.value);
  };

  const handleToggle = () => {
    setFlage((prevFlage) => !prevFlage);
  };


  const handleEditToggle = async () => {
    if (isEditable) {
      try {
        // Send updated data to backend
        const response = await axios.post("http://localhost:4000/user/update", {
          name: userData.name,
          age: age || userData.age, // Use updated age or fallback to existing
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          group: bloodGroup,
          district: districtName,
          state: selectedState,
          gender: gender ? "Male" : "Female",
          donate: flage, // Use updated donate flag
        });
  
       if(response.status === 200){
        toast.success("Data updated successfully");
        setUserData((prevData) => ({
          ...prevData,
          age: age || prevData.age,
          group: bloodGroup,
          district: districtName,
          state: selectedState,
          gender: gender ? "Male" : "Female",
          donate: flage,
        }));
       }
       else{
          toast.success("Someting went wrong!");
       }
  
        console.log("Save successful:", response.data);
      } catch (error) {
        console.error("Error saving data:", error);
        toast.error("Failed to save changes. Please try again.");
      }
    }
  
    // Toggle edit mode
    setIsEditable((prevState) => !prevState);
  };
  const homebutton = ()=>{
    navigate("/")
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value === "Male");
  };
  const ageChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    setUserData((prevData) => ({
      ...prevData,
      age: newAge,
    }));
  };
  

  useEffect(() => {
    getState();
    getGroup();
  checkToken()

  }, []);

  useEffect(() => {
    if (state.length > 0) {
      const selectedStateData = state.find((state) => state.state === selectedState);
      if (selectedStateData) {
        setDistrict(selectedStateData.districts);
      }
    }
  }, [selectedState, state]);

  useEffect(() => {
    if (state.length > 0) {
      const selectedStateData = state.find((state) => state.state === userData.state);
      if (selectedStateData) {
        setDistrict(selectedStateData.districts);
      }
    }
  }, [state, userData.state]);

  return view ? (
    <div>
      <div className="but flex items-center justify-center mr-20 mt-4">
      <button onClick={homebutton}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              className="icon"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
          </div>
        </div>
        <span>Home</span>
      </button>
    </div>
    <div className="flex items-center justify-center h-screen">
    
  
    <div className="card">
      <div className="title">
        <p className="heading">USER DETAILS</p>
        <p className="desc cursor-pointer" onClick={handleEditToggle}>
          {isEditable ? "Save Changes" : "Like to edit"}
        </p>
      </div>
      <div className="wrapper">
        <div className="color black">
          UserName
          {isEditable ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="hex input-edit"
            />
          ) : (
            <span className="hex">{userData.name}</span>
          )}
        </div>
        <div className="color eerie-black">
          Email
          <span className="hex">{userData.email}</span>
        </div>
        <div className="color chinese-black">
          Blood Group
          {isEditable ? (
            <select
              className="w-full bg-transparent"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="" disabled>
                Blood Group
              </option>
              {group.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          ) : (
            <span className="hex">{userData.group}</span>
          )}
        </div>
        <div className="color chinese-black">
          PhoneNumber
          <span className="hex">{userData.phoneNumber}</span>
        </div>
        <div className="color night-rider">
          Gender
          {isEditable ? (
            <select
              className="bg-transparent"
              value={gender ? "Male" : "Female"}
              onChange={handleGenderChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <span className="hex">{gender ? "Male" : "Female"}</span>
          )}
        </div>
        <div className="color chinese-white">
          State
          {isEditable ? (
            <select
              className="bg-transparent"
              value={selectedState}
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
          ) : (
            <span className="hex">{userData.state}</span>
          )}
        </div>
        <div className="color anti-flash-white">
          District
          {isEditable ? (
            <select
              className="bg-transparent"
              value={districtName}
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
          ) : (
            <span className="hex">{userData.district}</span>
          )}
        </div>
        <div className="color white">
          Age
          {isEditable ? (
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={ageChange}
              className="hex input-edit"
            />
          ) : (
            <span className="hex">{userData.age}</span>
          )}
        </div>
      </div>
    </div>
    <label className="switch">
      <span>Like To Donate</span>
      <input
        type="checkbox"
        className="checkbox"
        checked={flage}
        onChange={handleToggle}
      />
      <div className="slider"></div>
    </label>
  </div>
  </div>
  
  ) : (

    <div className="flex items-center justify-center h-screen">Need Access Plese-<Link to={"/login"}> Login</Link></div>
  );
};

export default UsersPage;