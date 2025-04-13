/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../redux/jobSlice'; // Ensure correct import path

export const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim() === "") return; // Prevent searching with an empty query
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };

    return (
        <section className="hero-section bg-gray-50 py-20">
            <div className="hero-content text-center max-w-3xl mx-auto">
                <span className="px-4 py-2 inline-block rounded-full bg-gray-100 text-[#f83002] font-medium">
                    NO.1 Job Hunt Website
                </span>
                <h1 className="hero-title text-5xl font-extrabold text-gray-800 mt-6">
                    Your <span className="text-[#8432a2]">Dream Job</span> Awaits
                </h1>
                <p className="hero-subtitle text-lg text-gray-600 mt-4">
                    Find jobs that match your skills and career aspirations.
                </p>
                <div className="search-bar mt-8 flex flex-wrap justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Job title, keywords, or company"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input border border-gray-300 p-3 rounded-lg shadow-sm w-72 focus:ring-2 focus:ring-[#8432a2] focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        className="search-input border border-gray-300 p-3 rounded-lg shadow-sm w-72 focus:ring-2 focus:ring-[#8432a2] focus:outline-none"
                    />
                    <button
                        onClick={searchJobHandler}
                        className="search-btn bg-[#f83002] text-white px-6 py-3 rounded-lg shadow hover:bg-[#d82601] transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
};
