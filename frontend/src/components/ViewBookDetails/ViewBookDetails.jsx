import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {GrLanguage}from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
    {data && <div className="px-8 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row">
      <div className="bg-zinc-800 rounded p-4  h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center">
      <img 
        src={data.imageUrl ? `http://localhost:3000/images/${data.imageUrl}` : "/default-placeholder.jpg"}  
        alt={data.title || "Book Image"}  
        className=" h-[50vh] lg:h-[70vh] rounded"  
        onError={(e) => { e.target.src = "/default-placeholder.jpg"; }}  
      />

      </div>
      
      <div className="p-4 w-full lg:w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
        <p className="text-zinc-400 mt-1  text-3xl">by {data.author}</p>
        <p className="text-xl mt-4 text-zinc-500 font-semibold">{data.desc}</p>
        <p className="mt-4 flex items-center justify-start text-xl text-zinc-400">
          <GrLanguage className="me-3"/>{data.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
          Price : ₹ {data.price}{" "} 
        </p>
      </div>
    </div>}
    {!data &&(
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />{" "}</div>
    )}
    </>
  );
};

export default ViewBookDetails;
