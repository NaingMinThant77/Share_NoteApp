import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { Watch } from "react-loader-spinner"
import { format } from "date-fns"

const Details = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNote = async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`)
        const note = await response.json();
        setNote(note);
        setLoading(false);
    }
    useEffect(_ => {
        getNote()
    }, [])

    return (
        <>
            {
                loading ? (<div className="flex justify-center items-center w-full">
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
                </div>) : (<section className='px-10 mt-10'>
                    <div className="flex justify-end mr-4">
                        <Link to={"/"}>
                            <FaArrowAltCircleLeft className="w-9 h-9 text-teal-600 " />
                        </Link>
                    </div>
                    <div className='border-t-4 border-t-teal-600 shadow-lg p-3 mt-4'>
                        {
                            note.cover_image && (
                                <img src={`${import.meta.env.VITE_API}/${note.cover_image}`} alt={note.title} className="my-10 h-64 w-full object-cover" />
                            )
                        }
                        <h3 className='text-3xl font-medium'>{note.title}</h3>
                        <div className="flex gap-4 my-2">
                            <p className="flex items-center gap-1 font-medium text-gray-600 text-sm"><FaUserCircle className="w-4 h-4" /> {note.creater}</p>
                            <p className="flex items-center gap-1 font-medium text-gray-600 text-sm"> <SlCalender className="w-4 h-4" /> {note.createdAt
                                ? format(note.createdAt, "yyyy-MM-dd")
                                : "Unknown Date"}</p>
                        </div>
                        <p className='text-base mt-2'>
                            {note.content}
                        </p>
                    </div>
                </section>)
            }
        </>
    )
}

export default Details