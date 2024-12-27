import "../styles/card.css";

import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
const Card = ({data}) => {
 
  return (
    <div>
    
    <div className="flex items-center justify-center h-screen">
      <div class="book">
        <div>
          <p>Age({data.age})</p>
          <p>
            <PhoneIcon></PhoneIcon>{data.phoneNumber}
          </p>
          <p>
            <GroupIcon></GroupIcon> {data.gender}
          </p>
        </div>
        <div class="cover">
          <p>{data.name}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;
