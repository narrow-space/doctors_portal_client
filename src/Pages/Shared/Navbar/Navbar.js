import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { toast } from "material-react-toastify";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
const Navbar = ({theme,setTheme}) => {
  const [user] = useAuthState(auth);
 
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("photoURL");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("displayName");
    

    let timerInterval
    Swal.fire({
      title: 'please wait',
      html: 'you will be logout in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        
      }
    })
  };

  const userDp = localStorage.photoURL;

  useEffect(() => {
    if (
      localStorage.darktheme === "dark" 
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
        className=""
        type="button"
        onClick={handlethemeswitcher}
      >
        {theme === "dark" ? <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg> : <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>}
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
        <div className="dropdown dark:bg-black   dark:text-white">
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
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-normal dark:bg-black  dark:text-white"
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
                dark:bg-black   dark:text-white
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
