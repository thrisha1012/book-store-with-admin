import React, { useEffect } from "react";
import axios from "axios";

const RecentlyAdded = () => {
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
                console.log("Full Response:", response);
                if (response.data) {
                    console.log("Response Data:", response.data);
                    if (response.data.data) {
                        console.log("Books Found:", response.data.data);
                    } else {
                        console.log("No books found in response.");
                    }
                } else {
                    console.log("Invalid response structure.");
                }
            } catch (error) {
                console.error("Error fetching recent books:", error);
            }
        };

        fetchBooks();
    }, []);

   
};

export default RecentlyAdded;
