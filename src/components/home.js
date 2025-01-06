import style from "../styles/home.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const group = useSelector((state) => state.dropdown.group);
  const state = useSelector((state) => state.dropdown.stateList.states);
  console.log(group,state);
  
  
  const navigate = useNavigate();
  return (
    <div
      className={`${style.home} flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black`}
    >
      {/* Text Section */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mb-4 drop-shadow-lg">
          Welcome to Blood Search
        </h1>
        <p className="text-2xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 shadow-lg animate__animated animate__fadeIn animate__delay-1s hover:text-blue-300 hover:scale-105 transition-all duration-300 tracking-wide">
          Ready to save lives
        </p>
        <p className="text-2xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500 mb-4 shadow-lg animate__animated animate__fadeIn animate__delay-1.5s hover:text-green-300 hover:scale-105 transition-all duration-300 tracking-wide">
            Find a donor, change a life - search now!
        </p>
        <p className="text-2xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-4 shadow-lg animate__animated animate__fadeIn animate__delay-2s hover:text-yellow-300 hover:scale-105 transition-all duration-300 tracking-wide">
          Be a hero - Donate blood now
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-6">
        <button
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 hover:bg-blue-700"
          onClick={() => navigate("/search")}
        >
          Search
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 hover:bg-green-700"
          onClick={() => navigate("/login")}
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default Home;
