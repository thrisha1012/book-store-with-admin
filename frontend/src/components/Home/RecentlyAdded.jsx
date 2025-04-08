import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Ensure correct import path
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
                console.log("Full Response:", response);

                if (response.data && Array.isArray(response.data.data)) {
                    console.log("Books Found:", response.data.data);
                    setData(response.data.data);
                } else {
                    console.log("No books found.");
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching recent books:", error);
                setError("Failed to fetch books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
            
            {loading ? (
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data.length > 0 ? (
                        data.map((item) => <BookCard key={item._id} data={item} />)
                    ) : (
                        <p className="text-red-500">No books found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecentlyAdded;
