import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Form from './Form';

export function Stats({ row, setrow, isModalOpen, setIsModalOpen }) {

    const [rowToEdit, seteditToRow] = useState()

    const TABLE_HEAD = ["Original Link", "Shortened Link", "Visits", "Actions"];

    const token = localStorage.getItem('authToken');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", " application/json");
    myHeaders.append("auth-token", token);

    // Function to open the modal
    const openModal = (r) => {
        seteditToRow(r)
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        const raw = "";

        async function fetchData() {
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch("http://localhost:3000/api/links/alllinks", requestOptions).catch((error) => console.error(error));
            const json = await response.json()
            console.log(json)
            setrow(json)
        }

        fetchData();
    }, [])
    console.log(row)
    const handleClick = async (id) => {

        console.log(id)
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch("http://localhost:3000/api/links/deletelink/" + id, requestOptions).catch((error) => console.error(error));
        const json = await response.json()
        console.log(json)
        const newRow = row.filter((row) => { return row._id !== id })
        setrow(newRow)
    }
    return (
        <>
            {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Edit details</h2>
                        {/* Close Button */}
                        <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                            &times;
                        </button>
                    </div>
                    <Form row={row} setrow={setrow} rowToEdit={rowToEdit} setIsModalOpen={setIsModalOpen}/>
                </div>
            </div>}
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            row.map((r, index) => (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <a href={r['original']} target="_blank">
                                            {r['original']}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <a href={"http://localhost:3000/" + r['short']} target="_blank">
                                            {"http://localhost:3000/" + r['short']}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <p>
                                            {r['visits']}
                                        </p>
                                    </td>
                                    <td className="p-4 flex  gap-4">
                                        <button href="#" className="font-medium bg-yellow-200 p-2 rounded" onClick={openModal.bind(null, r)}>Edit</button>
                                        <button href="#" className="font-medium bg-red-700 p-2 rounded text-white" onClick={handleClick.bind(null, r['_id'])}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Card>
        </>
    );
}