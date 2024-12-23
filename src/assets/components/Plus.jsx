import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Plus = () => {
    return (
        <Link to={"/create"} className="absolute  bottom-28 right-52 bg-teal-600 p-2 text-white rounded-full ">
            <FaPlus className="w-8 h-8" />
        </Link>
    )
}

export default Plus