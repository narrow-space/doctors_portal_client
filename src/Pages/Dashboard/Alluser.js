import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import Paginationpage from "../Shared/Paginationpage";

import Userrow from "./Userrow";

const Alluser = () => {
  const accesstoken = localStorage.getItem("accesstoken");
  const [showPerPage, setShowPerPage] = useState(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onpaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  const { data, isLoading,refetch } = useQuery("users", async(currentpage) =>
    await fetch('http://localhost:5000/alluser', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }).then((res) => res.json())
  );
  
  if (isLoading) {
    return <Loader />;
  }



   

  
  
  return (
    <div>
      <h2>here is all users{data?.length}</h2>
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
                    Email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                     Action
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      Action
                    </th>
                    {/* <th
                      scope="col"
                      class="text-sm font-medium  px-6 py-4 text-left"
                    >
                      phone No
                    </th> */}
                  </tr>
                </thead>
                <tbody className=" dark:text-white  ">
                
                  {data.slice(pagination.start, pagination.end)
                    .map((user, index) => (
                      
                        <Userrow
                          key={user._id}
                          user={user}
                          index={index}
                          refetch={refetch}
                        ></Userrow>
                      
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Paginationpage
          showPerPage={showPerPage}
          onpaginationChange={onpaginationChange}
          total={data?.length}
        ></Paginationpage>

        
      </div>
    </div>
  );
};

export default Alluser;
