/// --- REGISTER.JSX --- ///
import "./Register.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postRegistration } from "../../utils/forms/postRegistration";

const Register = ({ setLoggedInUser, setShowRegisterModal }) => {
	const [userNameInvalid, setUserNameInvalid] = useState(false);
	const [firstNameInvalid, setFirstNameInvalid] = useState(false);
	const [lastNameInvalid, setLastNameInvalid] = useState(false);
	const [emailInvalid, setEmailInvalid] = useState(false);
	const [passwordInvalid, setPasswordInvalid] = useState(false);
	const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
	// TODO provide the option to manually set location
	//on formsubmit

	//FORMVALIDATION
	//after formvalidation get location
	const handleSubmit = async (e) => {
		e.preventDefault();

		// check if there is a  value in the e.target field, if there is, the state of ....InputInvalid will be set to false, if there is no valid value ...InputInvalid state will be set to true, which will trigger the error message to be displayed
		setUserNameInvalid(e.target.userName.value ? false : true);
		setFirstNameInvalid(e.target.firstName.value ? false : true);
		setLastNameInvalid(e.target.lastName.value ? false : true);
		setEmailInvalid(e.target.email.value ? false : true);
		setPasswordInvalid(e.target.password.value ? false : true);
		setConfirmPasswordInvalid(e.target.password ? false : true);

		if (e.target.password.value !== e.target.confirmPassword.value) {
			// alert("passwords don't match");
			return setConfirmPasswordInvalid(true);
		}

		if (
			e.target.userName.value &&
			e.target.firstName.value &&
			e.target.lastName.value &&
			e.target.email.value &&
			e.target.password.value &&
			e.target.confirmPassword.value
		) {
			// try catch instead of then catch when using async await
			try {
				const user = await postRegistration(e);
				console.log(user);
				setLoggedInUser(user);
				e.target.reset();
			} catch (e) {
				// e.response.data is the error message, set in the server.
				// alert(e.response.data.message);
				if (
					e.response.data.message.toLowerCase().includes("username")
				) {
					setUserNameErrorMessage(e.response.data.message);
				} else if (
					e.response.data.message.toLowerCase().includes("first")
				) {
					setFirstNameInvalid(true);
				} else if (
					e.response.data.message.toLowerCase().includes("last")
				) {
					setLastNameInvalid(true);
				} else if (
					e.response.data.message.toLowerCase().includes("email")
				) {
					setEmailErrorMessage(e.response.data.message);
				} else console.log("error handling registrationform", e);
			}
		}
	};

	return (
		<section className="register-modal">
			<div className="register-modal__container">
				<p
					className="register-modal__close-modal"
					onClick={() => {
						setShowRegisterModal(false);
					}}>
					X
				</p>
				<h1 className="register-modal__title ">Register</h1>

				<form
					className="register-modal__form"
					// type="submit"

					//because handle submit is an async function i have to await it when i call it here
					onSubmit={async (e) => {
						await handleSubmit(e);
					}}>
					<input
						className="register-modal__input"
						type="text"
						placeholder="User name"
						name="userName"
					/>
					{userNameInvalid && (
						<p className="register-modal__input--error">
							Please enter a username.
						</p>
					)}

					{userNameErrorMessage && (
						<p className="register-modal__input--error">
							{userNameErrorMessage}
						</p>
					)}

					<input
						className="register-modal__input"
						type="text"
						placeholder="First name"
						name="firstName"
					/>
					{firstNameInvalid && (
						<p className="register-modal__input--error">
							Please enter a first name.
						</p>
					)}
					<input
						className="register-modal__input"
						type="text"
						placeholder="Last Name"
						name="lastName"
					/>
					{lastNameInvalid && (
						<p className="register-modal__input--error">
							Please enter a last name.
						</p>
					)}

					<input
						className="register-modal__input"
						type="text"
						placeholder="Email"
						name="email"
					/>
					{emailInvalid && (
						<p className="register-modal__input--error">
							Please enter a valid email address.
						</p>
					)}

					<input
						type="password"
						name="password"
						placeholder="Password"
					/>
					{passwordInvalid && (
						<p className="register-modal__input--error">
							Please enter a password.
						</p>
					)}
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm password"
					/>
					{confirmPasswordInvalid && (
						<p className="register-modal__input--error">
							Please make sure passwords match.
						</p>
					)}

					{emailErrorMessage && (
						<p className="register-modal__input--error">
							{emailErrorMessage}
						</p>
					)}

					<p className="register-modal__disclaimer">
						When signing up you will be asked by your browser to
						allow us to use your location. This is needed for our
						app to work.
					</p>
					<div className="register-modal__permission">
						<input
							type="checkbox"
							name="locationPermission"
							value="false"
						/>

						<label
							htmlFor="locationPermission"
							className="register-modal__permission-text">
							I'd rather enter my location manually
						</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Sign up
					</button>
				</form>
			</div>
		</section>
	);
};

export default Register;
