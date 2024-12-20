import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const Details = () => {
    return (
        <section className='px-10 mt-10'>
            <div className="flex justify-end mr-4">
                <Link to={"/"}>
                    <FaArrowAltCircleLeft className="w-9 h-9 text-teal-600 " />
                </Link>
            </div>
            <div className='border-t-4 border-t-teal-600 shadow-lg p-3 mt-4'>
                <h2 className='text-3xl font-medium'>Lorem ipsum dolor sit amet</h2>
                <p className='text-base mt-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quidem, nesciunt deserunt veritatis maxime numquam nobis laborum dolorum natus labore, saepe maiores vel minus id eveniet porro alias quis magni!
                </p>
            </div>
        </section>
    )
}

export default Details