import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import Swal from 'sweetalert2'
import Paginationpage from "../Shared/Paginationpage";


const Myappiontments = () => {
  const [user] = useAuthState(auth);
  
  const accesstoken = localStorage.getItem("accesstoken");
  const navigate = useNavigate();
  const [showPerPage, setShowPerPage] = useState(4);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onpaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  const {
    data: appiontments,
    isLoading,
    refetch,
  } = useQuery(
    "appiontments",
    async () =>
      await fetch(
        `https://dry-falls-30654.herokuapp.com/booking?email=${user?.email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      )
        .then((res) => res.json())
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
        })
  );
  console.log(appiontments);

  if (isLoading) {
    return <Loader />;
  }

  
  



  const removeAppiontment = (email) => {
     
    const swalWithBootstrapButtons = Swal.mixin({
     
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-error',
        
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this Appiontment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`https://dry-falls-30654.herokuapp.com/AppiontmentDelete/${email}`)
        .then(function (response) {
          // handle success
         
          if (response.data.deletedCount > 0){
            
            refetch();
          } 
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your Appiontment delete Successfully.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Appiontment is safe 😄',
          'error'
        )
      }
    })

    
   
  };

  return (
    
        <div class="">
          <div class="overflow-x-auto w-full">
           {appiontments.length? <table class="w-full">
              <thead class="border-b-4 border-secondary text-2xl dark:bg-black dark:text-white  ">
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
              <tbody className="dark:bg-black dark:text-white  ">
                {appiontments.slice(pagination.start, pagination.end).map((a, index) => (
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
                      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeAppiontment(a.email)}
                          className="btn btn-xs btn-accent"
                        >
                          Delete Appiontment
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>:<div className="flex justify-center items-center h-screen overflow-hidden">
            <h2 className="text-2xl text-white  ">No APPIONTMENTS YET!! 😢</h2>
              </div>}
         
      </div>
    {appiontments.length>=4?<Paginationpage
     showPerPage={showPerPage}
     onpaginationChange={onpaginationChange}
     total={appiontments?.length}
     refetch={refetch}
     ></Paginationpage>:null}
    </div>
  );
};

export default Myappiontments;
