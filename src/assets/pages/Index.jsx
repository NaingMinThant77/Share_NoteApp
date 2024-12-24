import { useEffect, useState } from "react"
import Note from "../components/Note"
import Plus from "../components/Plus"
import { Watch } from "react-loader-spinner" // npm install react-loader-spinner --save

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
    return (
        <section className='flex flex-wrap gap-6 px-10 mt-10'>
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
                </div>) : notes.map(note => (<Note key={note._id} note={note} />))
            }
            <Plus />
        </section>
    )
}

export default Index

// 57: 02