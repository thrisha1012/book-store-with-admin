import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-book-from-fav", {
          headers,
        });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [favouriteBooks]);

  return (
    <div className="min-h-screen pt-10 px-4 sm:px-8 md:px-12 lg:px-16">

      <h2 className="text-3xl font-semibold text-white mb-6">Your Favourite Books</h2>
      
      {favouriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favouriteBooks.map((item) => (
            <div key={item._id}>
              <BookCard data={item}  favourite={true} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full">No favourite books found.</p>
      )}
    </div>
  );
};

export default Favourites;
