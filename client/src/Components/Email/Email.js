import "./Email.css"

import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import { TfiEmail } from "react-icons/tfi";
import { ImCross } from "react-icons/im";

export default function Email({
    setSendEmail
}){

    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false); // New loading state

    const formSchema = yup.object().shape({
        respondAddress: yup
            .string()
            .email("Invalid email address")  
            .required("Must enter email"),
        senderCompany: yup
            .string()
            .required("Must enter company name"),
        emailSubject: yup
            .string()
            .required("Must enter subject"),
        emailMessage: yup
            .string()
            .required("Must enter message")
            .min(20, "Message must be at least 20 characters"),
    });

    const formik = useFormik({
        initialValues: {
            respondAddress: "",
            senderCompany: "",
            emailSubject: "",
            emailMessage: "",
            userEmail: "kabuke13@gmail.com",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            setLoading(true); // Set loading to true when submission starts
            fetch("/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                setLoading(false); // Stop loading when response is received
                if (res.status === 201) { 
                    setEmailSent(true);
                }
            }).catch(() => {
                setLoading(false); // Stop loading if an error occurs
            });
        },
    });

    const emailInput = (pH, variable) => {
        return (
            <div
                className="emailContainer"
            >
                <input 
                    placeholder={pH}
                    name={variable}  
                    className="emailInput"
                    onChange={formik.handleChange}
                    value={formik.values[variable]}
                />
                <p style={{ color: "red" }}>
                    {formik.errors[variable]}
                </p>
            </div>
        );
    };

    return(
        <div
            id="popUp"
        >
            <form
                id="emailContainer"
                onSubmit={formik.handleSubmit}
            >
                <div
                    id="emailHeader"
                >
                    <TfiEmail 
                        className="emailIcon"
                    />

                    <h2>Send me an email!</h2>

                    <ImCross 
                        className="emailCrossIcon"
                        onClick={() => setSendEmail(false)}
                    />
                </div>

                {emailSent ? 
                <div>
                    <h2>Thank you for your email</h2>
                    <h3>I will get back to you as soon as possible</h3>
                </div>
                :
                <div>
                    {emailInput("Please enter YOUR email", "respondAddress")}
                    {emailInput("Please enter the name of your company", "senderCompany")}
                    {emailInput("Please enter the SUBJECT you wish to talk about", "emailSubject")}
                    <div
                        className="emailContainer"
                    >
                        <textarea 
                            placeholder="Please type a message for me to respond to"
                            name={"emailMessage"}
                            className="emailMessage"
                            onChange={formik.handleChange}
                            value={formik.values["emailMessage"]}
                        />
                        <p style={{color: "red"}}>
                            {formik.errors["emailMessage"]}
                        </p>
                    </div>
                    {/* {emailInput("Please type a message for me to respond to", "emailMessage")} */}

                    {loading ? (
                        <p>Sending email...</p> // Loading indicator
                    ) : (
                        <button
                            type="submit"
                            id="sendEmailButton"
                        >
                            Send Email
                        </button>
                    )}
                </div>
                }
            </form>
        </div>
    )
}