import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();  

  useEffect(() => {
    fetchCreations();
  }, []);

  const fetchCreations = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if(data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
      } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

const imageLikeToggle = async (id) => {
  try {
    const token = await getToken(); // ✅ fetch token here
    const { data } = await axios.post(
      "/api/user/toggle-like-creation",
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      await fetchCreations();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
  useEffect(() => {
    if(user){
      fetchCreations()
    }
  },[user])

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h2 className="text-lg font-semibold">Creations</h2>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-4">
        {creations.map((creations, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creations.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />

            <div
              className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end 
            group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg"
            >
              <p className="text-sm hidden group-hover:block">
                {creations.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creations.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creations.id)}
                  className={` min w-5 h-5 hover:scale-110 cursor-pointer 
                  ${
                    creations.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
        {/* {creations.length > 0 ? (
          creations.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 py-2 text-sm text-gray-700"
            >
              {item.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No creations available.</p>
        )} */}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
    </div>
  );
};

export default Community;
 