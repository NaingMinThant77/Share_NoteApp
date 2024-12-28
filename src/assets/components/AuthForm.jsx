import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import StyleErrorMessage from "./StyleErrorMessage";

const AuthForm = ({ isLogin }) => {
    const initialValues = {
        username: "",
        email: "",
        password: ""
    }

    const AuthFormSchema = Yup.object({
        username: Yup.string().min(3, "Username is too short")
            .max(20, "Username is too long")
            .required("Username is required!"),
        email: Yup.string().required("Email is required!")
            .email("Please enter a valid email!"),
        password: Yup.string().min(4, "Username is too short")
            .required("Password is required!")
    })

    const submitHandler = (values) => {
        console.log(values)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={AuthFormSchema} onSubmit={submitHandler} >
            {() => (
                <Form className='w-1/2 mx-auto'>
                    <h1 className='text-center font-bold text-4xl text-teal-600 my-4'>{isLogin ? "Login" : "Register"}</h1>
                    <div className='mb-3'>
                        <label htmlFor="username" className='font-medium block'>Username</label>
                        <Field type="text" name="username" id="username" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                        <StyleErrorMessage name="username" />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className='font-medium block'>Email</label>
                        <Field type="email" name="email" id="email" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                        <StyleErrorMessage name="email" />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='font-medium block'>Password</label>
                        <Field type="password" name="password" id="password" className='text-lg border-2 border-teal-600 py-1 w-full rounded-lg' />
                        <StyleErrorMessage name="password" />
                    </div>
                    <button type="submit" className='text-white text-center font-medium bg-teal-600 py-3 w-full'>{isLogin ? "Login" : "Register"}</button>
                </Form>
            )}
        </Formik>
    )
}

export default AuthForm