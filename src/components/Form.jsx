import React, { useState } from 'react';

export default function Form({ token }) {
    const [formData, setFormData] = useState({
        original: '',
        short: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Original:', formData.original);
        console.log('Short Link:', formData.short);

        const token = localStorage.getItem('authToken');
        
        const raw = JSON.stringify(formData);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", " application/json");
        console.log(token)
        myHeaders.append("auth-token", token);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/links/createlink", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error))
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center  py-10">
            <form
                className="bg-white p-6 rounded-lg shadow-lg w-full mx-40"
                onSubmit={handleSubmit}
            >
                <h2 className="text-4xl font-bold mb-6 text-center">Link shortner</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="original">
                        Original
                    </label>
                    <input
                        id="original"
                        type="text"
                        name="original"
                        value={formData.original}
                        onChange={handleChange}
                        placeholder="Enter your original link"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="short">
                        Short Link
                    </label>
                    <input
                        id="short"
                        type="text"
                        name="short"
                        value={formData.short}
                        onChange={handleChange}
                        placeholder="Enter your short string"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
