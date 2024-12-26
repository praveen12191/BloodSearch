import "../styles/card.css";

import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";
const Card = ({data}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div class="book">
        <div>
          <p>Age({data.age})</p>
          <p>
            <PhoneIcon></PhoneIcon>{data.phoneNumber}
          </p>
          <p>
            <GroupIcon></GroupIcon> Male
          </p>
        </div>
        <div class="cover">
          <p>Praveen</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
