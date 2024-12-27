import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./card";
import { Toaster, toast } from "sonner";
import '../styles/card.css';
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate()
  const [selectedState, setSelectedState] = useState("");
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [data, setData] = useState([]);
  
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
  
  const handleDistrictChange = (e) => {
    setDistrictName(e.target.value);
  };
  
  const formSubmit = async (e) => {
    e.preventDefault();
    let url = "http://localhost:4000/user/search";
    try {
      const res = await axios.post(url, {
        state: selectedState,
        district: districtName,
        group: groupName,
      });
      if (res.status === 200) {
        setData(res.data);
      } else {
        toast.error("No data");
      }
    } catch (err) {
      toast.error("No donor found in this location. Sorry!");
    }
  };
 
  const homebutton = ()=>{
    navigate("/")
  }
  useEffect(() => {
    getState();
    getGroup();
  }, []);
  
  return (
    <div>
      <Toaster position="top-right" richColors />
      {data.length === 0 ? (
        <form className="max-w-sm mx-auto mt-44" onSubmit={formSubmit}>
          <div className="flex items-center gap-2">
            <label className="input input-bordered flex items-center gap-2 flex-[1]">
              <select
                className="w-full bg-transparent"
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
                className="w-full bg-transparent"
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
          <div className="flex items-center gap-2">
            <label className="input input-bordered flex items-center gap-2 flex-[1]">
              <select
                className="w-full bg-transparent"
                defaultValue=""
                onChange={(e) => setGroupName(e.target.value)}
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
            </label>
          </div>
          <div className="flex justify-center items-center mt-6">
            <button type="submit">Search</button>
          </div>
        </form>
      ) : (
        <div>
          <div className="but flex items-center justify-center mt-4">
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
          <span className="header-text">Donor details for selected location</span>
        <div className="card-container">
          {data.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Search;
