import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { toast } from "material-react-toastify";

import { useEffect, useState } from "react";
const Navbar = () => {
  const [user] = useAuthState(auth);
  const [theme, setTheme] = useState("null");
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("photoURL");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("displayName");
    

    toast("Logout successfully 👍✅✅", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const userDp = localStorage.photoURL;

  useEffect(() => {
    if (
      localStorage.darktheme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darktheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handlethemeswitcher = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("darktheme", "light");
  };

  const Menuitems = (
    <>
      {/* <input
        type="checkbox"
        class="toggle"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
      /> */}
      <button
        className="bg-indigo-500 text-lg p-1 rounded-md"
        type="button"
        onClick={handlethemeswitcher}
      >
        {theme === "dark" ? "🌙" : "🌞"}
      </button>

      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/appiontment">Appiontment</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li>
        <Link to="/contactus">Contact US</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </li>

      <li>
        {user ? (
          <>
            <button  onClick={logout} className="btn btn-ghost flex justify-start items-start">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown  dark:bg-slate-900 dark:text-white">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-normal  dark:bg-slate-900 dark:text-white"
          >
            {Menuitems}
            <div className="dropdown relative">
              <Link
                to=""
                className="dropdown-toggle flex items-center hidden-arrow"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {localStorage.photoURL ? (
                  <div className="avatar  ">
                    <div className="w-12 mx-6 rounded-full ">
                      <img className="" 
                      src={userDp} alt="" />
                    </div>
                  </div>
                ) : (
                  user?.photoURL && (
                    <div className="avatar">
                      <div className="w-12 rounded-full	mx-6 ">
                        <img className="" src={user?.photoURL} alt="" />
                      </div>
                    </div>
                  )
                )}
              </Link>

              <ul
                className="
                dark:bg-slate-900 dark:text-white
        dropdown-menu
        min-w-max
        absolute
        hidden
        bg-white
        text-base
        z-50
        float-left
        py-2
        list-none
        text-left
        rounded-lg
        shadow-lg
        mt-1
        hidden
        m-0
        bg-clip-padding
        border-none
        left-auto
        right-0
      "
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <Link
                    to="/"
                    className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
                    href="#"
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="
            dropdown-item
            text-sms
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
                    href="#"
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
                    href="#"
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 font-normal	">
          {Menuitems}
          <div className="dropdown relative">
            <Link
              to="/"
              className="dropdown-toggle flex items-center hidden-arrow"
              href="#"
              id="dropdownMenuButton2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {localStorage.photoURL ? (
                <div className="avatar  ">
                  <div className="w-12	 rounded-full">
                    <img className="flex justify-items-center" src={userDp} alt="" />
                  </div>
                </div>
              ) : (
                user?.photoURL && (
                  <div className="avatar ">
                    <div className="w-12 	 rounded-full">
                      <img className="flex justify-items-center " src={user?.photoURL} alt="" />
                    </div>
                  </div>
                )
              )}
            </Link>

            <ul
              className="
        dropdown-menu
        min-w-max
        absolute
        hidden
        bg-white
        text-base
        z-50
        float-left
        py-2
        list-none
        text-left
        rounded-lg
        shadow-lg
        mt-1
        hidden
        m-0
        bg-clip-padding
        border-none
        left-auto
        right-0
      "
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link
                  to="/"
                  className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
                  href="#"
                >
                  Action
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="
            dropdown-item
            text-sms
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
                  href="#"
                >
                  Another action
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100
          "
                  href="#"
                >
                  Something else here
                </Link>
              </li>
            </ul>
          </div>
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <label
          tabIndex="1"
          htmlFor="my-drawer-2"
          className=" drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
