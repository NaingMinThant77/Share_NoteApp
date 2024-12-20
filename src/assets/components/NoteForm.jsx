import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoteForm = ({ isCreate }) => {
    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className='text-2xl font-bold mb-5'>{isCreate ? "Create a New Note Here" : "Update Your Note Here"}</h1>
                <Link to={"/"}><FaArrowAltCircleLeft className="w-8 h-8 text-teal-600" /></Link>
            </div>
            <form>
                <div className='mb-3'>
                    <label htmlFor="title" className='font-medium block'>Note Title</label>
                    <input type="text" name="title" id="title" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="description" className='font-medium block'>Note Description</label>
                    <textarea rows={4} name="description" id="description" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg'></textarea>
                </div>
                <button className='text-white text-center font-medium bg-teal-600 py-3 w-full'>Save</button>
            </form>
        </section>
    )
}

export default NoteForm