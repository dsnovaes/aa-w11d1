import {useState, useEffect, useRef} from 'react';
import './form.css'

function Form(props) {

    // declare variables
    const [user,setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        phoneType: '',
        staff: '',
        bio: '',
        signUpEmailNotifications: false
    });
    const [errors,setErrors] = useState([]);

    // validate form

    const validate = () => {
        let errors = [];
        if (user.name.length === 0) {
            errors.push("Name can't be empty")
        }
        if (user.email.length === 0 || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(user.email)) {
            errors.push("E-mail is invalid")
        }
        if (user.phoneNumber.length === 0 || !(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g).test(user.phoneNumber)) {
            errors.push("Phone is invalid")
        }
        let validPhoneTypes = ["Home", "Work", "Mobile"]
        if (validPhoneTypes.includes(user.phoneType)) {
            errors.push("Phone type is invalid")
        }
        if (user.bio.length > 280) {
            errors.push("Bio should have less than 280 characters")
        }
    }

    // handle changes

    const handleChange = () => {
        
    }

    // handle submit


    // handle errors


    // = | = | = | = | = | = | = | = | = | = | = | = | = | = | = | = | 

    // render form & errors

    return (
        <form>
            <label htmlFor="name">Name
                <input type="text" id="name" onChange={handleChange("name")} required />
            </label>
            <label htmlFor="email">E-mail
                <input type="email" id="email" onChange={handleChange("email")} required />
            </label>
            <label htmlFor="signUp">Would you like to sign up for email notifications?
                <input type="checkbox" id="signUp" onChange={handleChange("signUpEmailNotifications")} />
            </label>
            <label htmlFor="phone">Phone Number
                <input type="tel" id="phone" onChange={handleChange("phoneNumber")} />
            </label>
            <label htmlFor="phoneType">Phone type
                <select name="phoneType" onChange={handleChange("phoneType")}>
                    <option disabled>Select phone type</option>
                    <option>Home</option>
                    <option>Work</option>
                    <option>Mobile</option>
                </select>
            </label>
            <p>Staff</p>
            <label htmlFor="instructor">Instructor <input type="radio" id="instructor" value="Instructor" onChange={handleChange("staff")} /></label>
            <label htmlFor="student">Student <input type="radio" id="student" value="Student" onChange={handleChange("staff")} /></label>

            <label htmlFor="bio">Bio</label>
            <textarea id="bio" onChange={handleChange("bio")} maxLength="280" ></textarea>

            <button>Submit</button>

        </form>
    );
}

export default Form;
