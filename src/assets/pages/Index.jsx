import { useEffect, useState } from "react"
import Note from "../components/Note"
import { Watch } from "react-loader-spinner" // npm install react-loader-spinner --save

import { ToastContainer, toast } from 'react-toastify';

const Index = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNotes = async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/notes`)
        const notes = await response.json();
        setNotes(notes);
        setLoading(false);
    }
    useEffect(_ => {
        getNotes()
    }, [])

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
                loading && notes.length < 1 ? (<div className="flex justify-center items-center w-full">
                    <Watch
                        visible={loading}
                        height="80"
                        width="80"
                        radius="48"
                        color="#4fa94d"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>) : notes.map(note => (<Note key={note._id} note={note} getNotes={getNotes} customAlert={customAlert} />))
            }
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
