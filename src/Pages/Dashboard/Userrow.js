import axios from "axios";
import { toast } from "material-react-toastify";
import React from "react";

const Userrow = ({ user, index,refetch }) => {
  const { email, role } = user;
  const accesstoken = localStorage.getItem("accesstoken");
  const url = `https://stormy-tundra-64733.herokuapp.com/user/admin/${email}`;
  const config = {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  };
  const makeAdmin = () => {
    axios.put(url, config).then(
      (res) => {
        if(res.data.modifiedCount >0 ){
            console.log(res);
            toast.success("admin make Successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            refetch()
        }
      },
      (error) => {
        if(error.response.status === 401){
            toast.error('Failed to Make an admin',{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
        }
      }
    );
  };
  return (
    <tr key={user._id} class="dark:border-b border-secondary ">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">
        {index + 1}
      </td>
      <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
        {user.email}
      </td>
      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap ">
        <div className="btn-group">
          {role === "admin" ? (
            <div className="badge bg-[#F28C18] border-none text-black">Admin</div>
          ) : (
            <button
              onClick={makeAdmin}
              data-theme="halloween"
              className="btn btn-xs btn-active"
            >
              Make Admin
            </button>
          )}
        </div>
      </td>
      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap  ">
        <div className="btn-group">
          <button data-theme="forest" className="btn btn-xs btn-active">
            Remove User
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Userrow;
