import { useEffect, useState } from "react"
import Note from "../components/Note"
import { TailSpin } from "react-loader-spinner" // npm install react-loader-spinner --save

import { ToastContainer, toast } from 'react-toastify';

const Index = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getNotes = async (pageNum) => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/notes?page=${pageNum}`)
        const { notes, totalNotes, totalPages } = await response.json();
        setTotalPages(totalPages);
        setNotes(notes);
        setLoading(false);
    }

    useEffect(_ => {
        getNotes(currentPage)
    }, [currentPage])

    const handlePre = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const customAlert = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <section className='flex justify-center flex-wrap gap-6 px-10 mt-10'>
            {
                loading ? (<div className="flex justify-center items-center w-full">
                    <TailSpin
                        visible={loading}
                        height="80"
                        width="80"
                        radius="1"
                        color="#4fa94d"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>) : notes.length === 0 ? (
                    <div className="flex justify-center items-center w-full">
                        <p>No Note was shared yet!</p>
                    </div>
                ) : notes.map(note => (<Note key={note._id} note={note} getNotes={getNotes} customAlert={customAlert} />))
            }
            <div className="w-full flex items-center justify-center gap-3">
                {
                    currentPage > 1 && (
                        <button type="button" className="text-white font-medium bg-teal-600 px-3 py-1" onClick={handlePre}>Prev Page</button>
                    )
                }
                {
                    currentPage < totalPages && (
                        <button type="button" className="text-white font-medium bg-teal-600 px-3 py-1" onClick={handleNext}>Next Page</button>
                    )
                }
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    )
}

export default Index
