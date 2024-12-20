import { MdDeleteForever } from "react-icons/md";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Note = () => {
    return (
        <div className='w-2/5  border-t-4 border-t-teal-600 shadow-lg p-3'>
            <h2 className='text-xl font-bold'>Lorem ipsum dolor sit amet</h2>
            <p className='text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quidem, nesciunt deserunt veritatis maxime numquam nobis laborum dolorum natus labore, saepe maiores vel minus id eveniet porro alias quis magni!
            </p>
            <div className="flex items-center justify-end gap-2">
                <MdDeleteForever className="w-7 h-7 text-red-600" />
                <Link to={"/edit/1"}><FaRegEdit className="w-6 h-6 text-teal-600" /></Link>
                <Link to={"/notes/1"}><FaEye className="w-6 h-6 text-gray-600" /></Link>
            </div>
        </div>
    )
}

export default Note