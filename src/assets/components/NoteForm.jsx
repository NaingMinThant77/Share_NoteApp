import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from 'formik'; // npm install formik --save
import StyleErrorMessage from "./StyleErrorMessage";

import * as Yup from "yup"; // npm install -S yup
import { useContext, useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from 'react-toastify'; // npm install --save react-toastify

import { UserContext } from "../../contexts/UserContext";

const NoteForm = ({ isCreate }) => {
    const { token } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false);
    const [oldNote, setOldNote] = useState({})
    const fileRef = useRef();
    const [previewImg, setPreviewImg] = useState(null);
    const [isUpload, setIsUpload] = useState(false)

    const { id } = useParams();

    const getOldNote = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`, {
            headers: {
                Authorization: `Bearer ${token.token}`
            },
        })
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
        note_id: isCreate ? "" : oldNote._id,
        cover_image: isCreate ? null : oldNote.cover_image
    }

    const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"]

    const NoteFormSchema = Yup.object({
        title: Yup.string()
            .min(3, "Title is too short!")
            .max(100, "Title is too long")
            .required("Title is required!"),
        content: Yup.string()
            .min(5, "Content is too short!")
            .required("Content is required!"),
        cover_image: Yup.mixed().nullable()
            .test("FILE_FORMAT", "File type is not support.", (value) => !value || SUPPORTED_FORMATS.includes(value.type))
    })

    const handleImageChange = (event, setFieldValue) => {
        const selectedImage = event.target.files[0]
        setPreviewImg(URL.createObjectURL(selectedImage))
        setFieldValue("cover_image", selectedImage)
    }

    const clearPreviewImg = (setFieldValue) => {
        setPreviewImg(null);
        setFieldValue("cover_image", null)
        fileRef.current.value = ""
    }

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

        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("content", values.content)
        formData.append("cover_image", values.cover_image)
        formData.append("note_id", values.note_id)

        const response = await fetch(API, {
            method,
            headers: {
                //     // "Content-Type": "application/json"
                //     "Content-Type": "multipart/form-data"
                Authorization: `Bearer ${token.token}`
            },
            // body: JSON.stringify(values) //{ content: values.content}
            body: formData
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
                {({ errors, touched, values, setFieldValue }) => (
                    <Form encType="multipart/form-data">
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
                        <div className='my-3'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="cover_image" className='font-medium block'>Cover Image <span className="text-xs font-medium">(Optional)</span> </label>
                                {
                                    previewImg && <p className="text-base font-medium text-teal-600 cursor-pointer" onClick={_ => {
                                        clearPreviewImg(_ => {
                                            setFieldValue
                                        })
                                    }}>Clear</p>
                                }
                            </div>
                            {
                                !isUpload ? (<p className="text-base font-medium text-teal-600 cursor-pointer" onClick={_ => {
                                    setIsUpload(true)
                                }}>Upload Cover Image</p>) : (<p className="text-base font-medium text-teal-600 cursor-pointer" onClick={_ => {
                                    setIsUpload(false)
                                }}>Disable Cover Image</p>)
                            }
                            {
                                isUpload && (<>  <input type="file" name="cover_image" id="cover_image" hidden ref={fileRef} onChange={e => handleImageChange(e, setFieldValue)} />
                                    <div className=" border border-dashed border-teal-600 flex items-center justify-center text-teal-600 h-60 cursor-pointer rounded-lg relative overflow-hidden" onClick={_ => {
                                        fileRef.current.click()
                                    }}>
                                        <FaUpload className="w-6 h-6 z-20" />
                                        {
                                            isCreate ? (<>
                                                {
                                                    previewImg && <img src={previewImg} alt={"prev"} className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden opacity-80 z-10" />
                                                }
                                            </>) : <img src={previewImg ? previewImg : `${import.meta.env.VITE_API}/${oldNote.cover_image}`} alt={"prev"} className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden opacity-80 z-10" />
                                        }
                                    </div></>)
                            }
                            <StyleErrorMessage name="cover_image" />
                        </div>
                        <button type="submit" className='text-white text-center font-medium bg-teal-600 py-3 w-full'>{isCreate ? "Share Note" : "Update Note"}</button>
                    </Form>

                )}
            </Formik>
        </section >
    )
}

export default NoteForm
