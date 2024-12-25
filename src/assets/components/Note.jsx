import { MdDeleteForever } from "react-icons/md";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import { format } from "date-fns" // npm install date-fns --save

const Note = ({ note, getNotes, customAlert }) => {
    const { _id, title, content, createdAt } = note;

    const deleteNote = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
            method: "DELETE"
        })
        if (response.status === 204) {
            customAlert("Post deleted")
            getNotes();
        }
    }

    return (
        <div className='w-2/5 h-fit border-t-4 border-t-teal-600 shadow-lg p-3'>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-sm'> {content.substr(0, 120)}</p>
            <div className="flex items-center justify-between gap-2 mt-2 border-t pt-3">
                <p className="text-base font-medium">{format(createdAt, 'yyyy-MM-dd')}</p>
                <div className="flex items-center justify-end gap-2">
                    <MdDeleteForever className="w-7 h-7 text-red-600 cursor-pointer" onClick={deleteNote} />
                    <Link to={"/edit/" + _id}><FaRegEdit className="w-6 h-6 text-teal-600" /></Link>
                    <Link to={"/notes/" + _id}><FaEye className="w-6 h-6 text-gray-600" /></Link>
                </div>
            </div>
        </div>
    )
}

export default Note