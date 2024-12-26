import style from '../styles/home.module.css'
import { Link,useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()
    return ( 
        <div className={style.home}>
            <button className="btn btn-outline" onClick={(e)=>navigate("/search")}>Search</button>
            <button className="btn btn-outline" onClick={(e)=>navigate("/login")}>Donate</button>
        </div>
     );
}
 
export default Home;