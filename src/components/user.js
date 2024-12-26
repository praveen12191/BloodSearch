import { useLocation } from "react-router-dom";
import "../styles/user.css";
import { useState } from "react";

const UsersPage = () => {
  const location = useLocation();
  const data = location.state;
  const [flage, setFlage] = useState(data.data.donate);

  const handleToggle = () => {
    
    setFlage((prevFlage) => !prevFlage);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card">
        <div className="title">
          <p className="heading">USER DETAILS</p>
          <p className="desc">Like to edit</p>
        </div>
        <div className="wrapper">
          <div className="color black">
            UserName
            <span className="hex">{data.data.name}</span>
          </div>
          <div className="color eerie-black">
            Email
            <span className="hex">{data.data.email}</span>
          </div>
          <div className="color chinese-black">
            Blood Group
            <span className="hex">{data.data.group}</span>
          </div>
          <div className="color night-rider">
            PhoneNumber
            <span className="hex">{data.data.phoneNumber}</span>
          </div>
          <div className="color chinese-white">
            State
            <span className="hex">{data.data.state}</span>
          </div>
          <div className="color anti-flash-white">
            District
            <span className="hex">{data.data.district}</span>
          </div>
          <div className="color white">
            Age
            <span className="hex">{data.data.age}</span>
          </div>
        </div>
      </div>
      <label className="switch">
        <span>Like To donate</span>
        <input
          type="checkbox"
          className="checkbox"
          checked={flage}
          onChange={handleToggle}
        />
        <div className="slider"></div>
      </label>
    </div>
  );
};

export default UsersPage;
