import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const role=useSelector((state)=>state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        console.log("Full Response:", response);

        if (response.data && response.data.data) {
          console.log("Book Found:", response.data.data);
          setData(response.data.data);
        } else {
          console.log("No book found.");
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to fetch book.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  
  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="text-gray-400">Book not found.</p>;

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/add-book-to-fav",
        { bookid: id }, // Pass the bookid in request body
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to favourites:", error.response?.data?.message || error.message);
      alert("Failed to add book to favourites.");
    }
  };
  

  const handleCart=async()=>{
    const response=await axios.put("http://localhost:3000/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  }
  
  return (
    <>
      {data && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row">
          {/* Image Section with icons */}
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 relative flex justify-center items-center">
            <img
              src={data.imageUrl ? `http://localhost:3000/images/${data.imageUrl}` : "/default-placeholder.jpg"}
              alt={data.title || "Book Image"}
              className="h-[50vh] lg:h-[70vh] object-contain rounded"
              onError={(e) => { e.target.src = "/default-placeholder.jpg"; }}
            />
            
            {/* Icons inside the image box */}
            <div className="absolute top-4 right-4 flex flex-col gap-4">
              <button className="bg-white rounded-full text-3xl p-3 flex items-center justify-center hover:text-red-500 transition-all duration-300" onClick={handleFavourite}>
                <FaHeart />{" "}
                <span className="ms-4 block lg:hidden">Favourites</span>
              </button>
              <button className="bg-white rounded-full text-3xl p-3 flex items-center justify-center hover:text-blue-500 transition-all duration-300" onClick={handleCart}>
                <FaShoppingCart />{" "}
                <span className="ms-4 block lg:hidden">Add to cart</span>
              </button>
            </div>
          </div>

          {/* Book Details */}
          <div className="p-4 w-full lg:w-3/6 flex flex-col justify-between">
            <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
            <p className="text-zinc-400 mt-1 text-3xl">by {data.author}</p>
            <p className="text-xl mt-4 text-zinc-500 font-semibold">{data.desc}</p>
            <p className="mt-4 flex items-center justify-start text-xl text-zinc-400">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: ₹ {data.price}
            </p>
          </div>
        </div>
      )}

      {/* Loader fallback */}
      {!data && !loading && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader /> {/* Assuming you have a Loader component */}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
