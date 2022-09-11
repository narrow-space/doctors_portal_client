import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const pageSize = 8;
const Myappiontments = () => {
  const [user] = useAuthState(auth);
  const [appiontments, setAppiontments] = useState([]);
  const [paginate, setPaginate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const accesstoken = localStorage.getItem("accesstoken");
  const navigate = useNavigate();
  console.log(appiontments);
  useEffect(() => {
    const url = `https://stormy-tundra-64733.herokuapp.com/booking?email=${user?.email}`;
    const config = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    if (user) {
      axios
        .get(url, config)
        .then((res) => {
          console.log(res);

          setAppiontments(res.data.reverse());

          setPaginate(_(res.data).slice(0).take(pageSize).value());
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 403) {
            //// navigate to home
            navigate("/");
            signOut(auth);
            localStorage.removeItem("photoURL");
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("displayName");
          }
          console.log(err);
        });
    }

    // axios
    //   .get(`https://stormy-tundra-64733.herokuapp.com/booking?email=${user?.email}`,{
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
    //     }
    //   })
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     setAppiontments(response.data);
    //     setPaginate(_(response.data).slice(0).take(pageSize).value());
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  }, [user, accesstoken]);

  const pageCount = appiontments
    ? Math.ceil(appiontments.length / pageSize)
    : 0;
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;

    const paginate = _(appiontments).slice(startIndex).take(pageSize).value();
    console.log(paginate);
    setPaginate(paginate);
  };

  return (
    <div class="flex flex-col lg:overflow-hidden">
      <div class="sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-hidden">
            <table class="w-full">
              <thead class="border-b-4 border-secondary text-2xl dark:text-white  ">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium px-6 py-4 text-left"
                  >
                    Serial
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium  px-6 py-4 text-left"
                  >
                    Treatment
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium  px-6 py-4 text-left"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium  px-6 py-4 text-left"
                  >
                    phone No
                  </th>
                </tr>
              </thead>
              <tbody className=" dark:text-white  ">
                {paginate?.map((a, index) => (
                  <>
                    <tr key={index} class="dark:border-b border-secondary ">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                        {index + 1}
                      </td>
                      <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
                        {a.patientName}
                      </td>
                      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap">
                        {a.treatment}
                      </td>
                      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap">
                        {a.slot}
                      </td>
                      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap">
                        {a.number}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="btn-group mt-7">
        
          {pages?.map((page) => (
            <button
              data-theme="winter"
              onClick={() => pagination(page)}
              className={page === currentPage ? "btn btn-active" : "btn"}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myappiontments;
