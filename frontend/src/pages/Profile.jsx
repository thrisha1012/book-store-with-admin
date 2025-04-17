import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import axios from "axios";

const Profile = () => {
  const [Profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-user-information", { headers });
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!Profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
