import img from '../asset/icon.jpg'
import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Icon} from '@iconify/react';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import * as Yup from "yup";
import axios from "axios";
import "./index.module.css";

const LogIn = () => {

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
            .required('Username is required'),

        password: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Password should contain strong characters')
            .required('Password is required'),

    });

    const handleLogIn = async (values, {resetForm}) => {
        setIsLoading(true);
        try {
            const payload = {
                username: values.username,
                password: values.password,
            };


            const logInResponse = await axios.post("http://localhost:8080", payload);

            if (logInResponse.data.success) {
                toast.success("Hi", {
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
                toast.error('Log in failed. Please try again', {
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
            console.error('Error during log in:', error);
            toast.error('Log in failed. Please try again', {
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
        <div className='mainContainer'>
            <div className="imageContainer" >
                <img src={img} alt="page imagine" className="image2"/>
            </div>

            <div className="formContainer">
                <div>
                    <h1 className="header">Welcome to Precious Note Management System</h1>
                    <p className="title">Sign up by entering the information below</p>
                    <Formik
                        initialValues={{username: '',  password: ""}}
                        validationSchema={validationSchema}
                        onSubmit={handleLogIn}
                    >
                        {({values, errors, touched, handleChange, handleBlur}) => (
                            <Form>
                                <div style={{marginBottom: '10px'}}>
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="input"
                                    />
                                    <ErrorMessage name="username" component="div" className="error"/>
                                </div>
                                <div style={{marginBottom: '10px'}}>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
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
                                        {isLoading ? <Icon icon={loadingLoop} width="24"/> : "Log In"}
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

};

export default LogIn;


























































