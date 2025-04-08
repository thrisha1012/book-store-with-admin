import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
    console.log(data);

    return (
        <Link to={`/view-book-details/${data._id}`}> {/* Use _id for dynamic routing */}
            <div className="bg-zinc-800 rounded p-4 flex flex-col">
                <div className="bg-zinc-900 rounded flex items-center justify-center">
                <img 
                   src={`http://localhost:3000/images/${data.imageUrl}`}  
                   alt={data.title}  
                   className="h-[25vh]"  
                   onError={(e) => { e.target.src = "/default-placeholder.jpg"; }}  
                />


                </div>
                
                    <h2 className="mt-4 text-xl text-zinc-200 font-semibold">{data.title}</h2>
                    <p className="mt-2 text-zinc-400 font-semibold">By {data.author}</p>
                    <p className="mt-2 text-zinc-200 font-semibold text-xl">₹{data.price}</p>
                
            </div>
        </Link>
    );
};

export default BookCard;
