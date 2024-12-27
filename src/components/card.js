import PhoneIcon from "@mui/icons-material/Phone";
import GroupIcon from "@mui/icons-material/Group";

const Card = ({data}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="book">
        <div>
          <p>Age({data.age})</p>
          <p><PhoneIcon /> {data.phoneNumber}</p>
          <p><GroupIcon /> {data.gender}</p>
        </div>
        <div className="cover">
          <p>{data.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
