//import { LOGO_URL } from "../utils/constants";
import logo1 from "../../logo.jpg";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnlogin, setbtnlogin] = useState("Login");
  const { loggedInUser } = useContext(UserContext);
  const onLineStatus = useOnlineStatus();
  //subscribing to store using slector
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="flex justify-between bg-pink-100 shadow-lg m-2">
      <div className="logo-container">
        <img className="w-15 h-20" src={logo1} alt="Logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex">
          <li>Online Status:{onLineStatus ? "✅" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">HOME</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart({cartItems.length} items)</Link>
          </li>
          <button
            className="login"
            onClick={() => {
              btnlogin == "Login"
                ? setbtnlogin("Logout")
                : setbtnlogin("Login");
            }}
          >
            {btnlogin}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
