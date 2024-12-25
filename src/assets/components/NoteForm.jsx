import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from 'formik'; // npm install formik --save
import StyleErrorMessage from "./StyleErrorMessage";

import * as Yup from "yup"; // npm install -S yup
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify'; // npm install --save react-toastify

const NoteForm = ({ isCreate }) => {
    const [redirect, setRedirect] = useState(false);
    const [oldNote, setOldNote] = useState({})

    const { id } = useParams();

    const getOldNote = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`)
        if (response.status === 200) {
            const note = await response.json();
            setOldNote(note)
        } else {
            setRedirect(true)
        }
    }

    useEffect(_ => {
        if (!isCreate) {
            getOldNote()
        }
    }, [])

    const initialValues = {
        title: isCreate ? "" : oldNote.title,
        content: isCreate ? "" : oldNote.content,
        note_id: isCreate ? "" : oldNote._id
    }

    const NoteFormSchema = Yup.object({
        title: Yup.string()
            .min(3, "Title is too short!")
            .max(100, "Title is too long")
            .required("Title is required!"),
        content: Yup.string()
            .min(5, "Content is too short!")
            .required("Content is required!")
    })

    const sumitHandler = async (values) => {
        let API = `${import.meta.env.VITE_API}`;
        let method;

        if (isCreate) {
            API = `${import.meta.env.VITE_API}/create`
            method = "POST"
        } else {
            API = `${import.meta.env.VITE_API}/edit`
            method = "PUT"
        }
        const response = await fetch(API, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values) //{ content: values.content}
        });

        if (response.status === 201 || response.status === 200) {
            setRedirect(true)
        } else {
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <section>
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
            <div className="flex items-center justify-between">
                <h1 className='text-2xl font-bold mb-5'>{isCreate ? "Create a New Note Here" : "Update Your Note Here"}</h1>
                <Link to={"/"}><FaArrowAltCircleLeft className="w-8 h-8 text-teal-600" /></Link>
            </div>
            {/* validate={validate} */}
            <Formik initialValues={initialValues} validationSchema={NoteFormSchema} onSubmit={sumitHandler} enableReinitialize={true}>
                {/* {({ errors, touched }) => ( */}
                <Form>
                    <div className=''>
                        <label htmlFor="title" className='font-medium block'>Note Title</label>
                        <Field type="text" name="title" id="title" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                        {/* {
                            errors.title && touched.title && <p>{errors.title}</p>
                        } */}
                        <StyleErrorMessage name="title" />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="content" className='font-medium block'>Note Description</label>
                        <Field as="textarea" rows={4} name="content" id="content" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                        <StyleErrorMessage name="content" />
                    </div>
                    <Field type="text" name="note_id" id="note_id" hidden />
                    <button type="submit" className='text-white text-center font-medium bg-teal-600 py-3 w-full'>{isCreate ? "Share Note" : "Update Note"}</button>
                </Form>

                {/* )} */}
            </Formik>
        </section >
    )
}

export default NoteForm
