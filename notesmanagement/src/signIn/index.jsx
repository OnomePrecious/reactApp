import userImage from "../asset/icon.jpg";
import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Icon} from '@iconify/react';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import * as Yup from "yup";
import axios from "axios";
import style from "./index.module.css"

const SignIn = () => {

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            // .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
            .required('Username is required'),

        password: Yup.string()
            // .matches(/^[a-zA-Z\s]+$/, 'Password should contain strong characters')
            .required('Password is required'),

        email: Yup.string()
            .email('Invalid email address')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must be a valid email Address')
            .required('Email Address is required'),
    });

    const handleSignUp = async (values, {resetForm}) => {
        setIsLoading(true);
        try {
            const payload = {
                username: values.username,
                email: values.email,
                password: values.password,
            };


            const response = await axios.post("http://localhost:8085/notes/Register", payload);

            if (response.data.successful) {
                toast.success("Registration successful", {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetForm();
            } else {
                toast.error('Registration failed. Please try again', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            toast.error('Sign in failed. Please try again', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.imageContainer} >
                <img src = {userImage} alt="Login page" className={style.image}/>
            </div>

            <div className={style.formContainer}>
                <div>
                    <h1 className="header">Welcome to Precious Note Management System</h1>
                    <p className="title">Sign up by entering the information below</p>
                    <Formik
                        initialValues={{username: '', email: '', password: ""}}
                        validationSchema={validationSchema}
                        onSubmit={handleSignUp}
                    >
                        {({values, handleChange, handleBlur}) => (
                            <Form>
                                <div style={{marginBottom: '10px'}}>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Enter username..."
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="input"
                                    />
                                    <ErrorMessage name="username" component="div" className="error"/>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="Enter Email Address.."
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage name="email" component="div" className="error"/>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter password..."
                                        value={values.password}
                                        required={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="input"
                                    />
                                    <ErrorMessage name="password" component="div" className="error"/>
                                </div>

                                <div style={{marginBottom: '10px'}}>
                                    <button
                                        type="submit"
                                        className="btn"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Icon icon={loadingLoop} width="24"/> : "Sign In"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer/>

                </div>
            </div>
        </div>
    );

}

export default SignIn;