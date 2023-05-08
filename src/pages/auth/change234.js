import { Login } from '@mui/icons-material';
import React, { useState } from 'react'
import validator from 'validator';
import routeNames from "../../../routes/routeName";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Password from 'antd/es/input/Password';
const ChangePassword = () => {

    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successClass, setSuccessClass] = useState("");
    const [validationError, setValidationError] = useState("");



    let userId = localStorage.getItem("UserId");



    const validate = (value) => {
        if (
            validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            setErrorMessage("Is Strong Password");
            setSuccessClass("text-success");
        } else {
            if (value === "") {
                setErrorMessage("");
            } else {
                setErrorMessage(
                    "Is Not Strong Password(Must contain min 8 letter,Upper letter,any Symbol,Number)"
                );
                setSuccessClass("text-danger");
            }
        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        let payload = {
            userID: userId,
            passwordResetKey: oldPassword,
            password: newPassword,

            // loginId: loginId
        };

        if (oldPassword != "" && newPassword != "") {
            if (newPassword === confirmPassword) {
                let result = await axios
                    .post(`${process.env.REACT_APP_API_BASE_URL}Account/SetPassword`, payload)
                    .then((res) => {
                        setErrorMessage(res.data.message);
                        let userId = res.data.userID;
                        let loginId = res.data.loginId;
                        let Password = res.data.Password;

                        localStorage.setItem("UserId", userId);
                        localStorage.setItem("LoginId", loginId);
                        localStorage.setItem("Password", Password);

                        navigate(routeNames.DASHBOARD)
                    }

                    )
                    .catch((err) => {
                        setErrorMessage(err.errorMessage);
                    })
            }
            else {
                setValidationError("New password and confirm password do not match.");
                alert("hdjkfh")
            }
        }
        else {
            setValidationError("All fields are required")
        }
    };






    return (
        <div style={{ padding: "8vmax 18vmax" }}>





            <div className='card shadow-sm p-5 mb-5 bg-white rounded  mx-auto'>
                <h1 className='text-center'>Reset Password</h1>

                <p className={`m-0 text-danger text-center`}>{validationError}</p>
                <form onSubmit={(e) => handleSubmit(e)} className='d-flex flex-column align-center'>
                    <div class="mb-3 d-flex">
                        <label for="oldPassword" class="form-label fs-5 mr-5 ">
                            Old Password
                        </label>
                        <input
                            style={{ maxWidth: "25vmax" }}
                            autocomplete="off"
                            placeholder="Enter your Password"
                            type="password"
                            class="form-control w-100"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div class="mb-3 d-flex">
                        <label for="newPassword" class="form-label fs-5 mr-5">
                            New Password
                        </label>
                        {errorMessage && <p className={`m-0 ${successClass}`}>{errorMessage}</p>}


                        <input
                            style={{ maxWidth: "25vmax" }}
                            autocomplete="off"
                            placeholder="Enter new Password"
                            type="password"
                            class="form-control w-100"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => (setNewPassword(e.target.value), validate(e.target.value))}
                        />

                    </div>
                    <div class="mb-3 d-flex">
                        <label for="confirmPassword" class="form-label fs-5 mr-4">
                            Confirm Password
                        </label>

                        <input
                            style={{ maxWidth: "25vmax" }}
                            autocomplete="off"
                            placeholder="Enter Password Again"
                            type="text"
                            class="form-control w-100"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => (setConfirmPassword(e.target.value))}
                        />
                    </div>
                    <div className="submit-btn mt-3 text-center">
                        <button className='btn btn-primary ' >Change Password</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ChangePassword
