import { Link,useNavigate } from "react-router-dom";
import style from "../styles/register.module.css"
import { useState } from "react";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate= useNavigate()

  const formSubmit = async (e)=>{
    e.preventDefault()
    let url = 'http://localhost:4000/user/login';
    const res = await axios.post(url, {
      email:email,
      phoneNumber:phoneNumber
    })
    console.log(res);
    
    if(res.status === 200){
      
      navigate("/userPage", { state: res.data});
    }
    else{
      navigate("/Register")
    }

  }
  return (
    <div>
      <form class="max-w-sm mx-auto mt-60" onSubmit={formSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        </label>

        <label className="input input-bordered flex items-center gap-2 flex-[3]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M3 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3Zm1 2h8v10H4V3Z" />
          </svg>
          <input type="text" placeholder="Phone Number" className="w-full" onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </label>
        <div className="flex items-center gap-4 mt-3">
          <button className={style.button} type="submit">Login</button>
          <Link to="/Register">Don't have an account!</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
