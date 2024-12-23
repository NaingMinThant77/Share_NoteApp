import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import StyleErrorMessage from "./StyleErrorMessage";
// Not formik, need to use useState, value, onChange, setTitle -  npm install formik --save
// two types of validations - validate, validationSchema

import * as Yup from "yup"; // npm install -S yup

const NoteForm = ({ isCreate }) => {
    const initialValues = {
        title: "",
        content: ""
    }

    // Validator
    // values = initialValues
    // const validate = (values) => {
    //     const errors = {}

    //     if (values.title.trim().length < 10) {
    //         errors.title = 'Title must have 10 lengths'
    //     }

    //     if (values.content.trim().length < 10) {
    //         errors.content = 'Content must have 10 lengths'
    //     }

    //     return errors
    // }

    const NoteFormSchema = Yup.object({
        title: Yup.string()
            .min(3, "Title is too short!")
            .max(30, "Title is too long")
            .required("Title is required!"),
        content: Yup.string()
            .min(5, "Content is too short!")
            .required("Content is required!")
    })

    const sumitHandler = (values) => {
        console.log(values)
    }

    return (
        <section>
            <div className="flex items-center justify-between">
                <h1 className='text-2xl font-bold mb-5'>{isCreate ? "Create a New Note Here" : "Update Your Note Here"}</h1>
                <Link to={"/"}><FaArrowAltCircleLeft className="w-8 h-8 text-teal-600" /></Link>
            </div>
            {/* validate={validate} */}
            <Formik initialValues={initialValues} validationSchema={NoteFormSchema} onSubmit={sumitHandler}>
                {/* {({ errors, touched }) => ( */}
                <Form>
                    <div className=''>
                        <label htmlFor="title" className='font-medium block'>Note Title</label>
                        <Field type="text" name="title" id="title" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                    </div>
                    {/* {
                            errors.title && touched.title && <p>{errors.title}</p>
                        } */}
                    <StyleErrorMessage name="title" />
                    <div className='mt-3'>
                        <label htmlFor="content" className='font-medium block'>Note Description</label>
                        <Field as="textarea" rows={4} name="content" id="content" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                    </div>
                    <StyleErrorMessage name="content" />
                    <button type="submit" className='text-white text-center font-medium bg-teal-600 py-3 w-full'>Save</button>
                </Form>

                {/* )} */}
            </Formik>
        </section>
    )
}

export default NoteForm