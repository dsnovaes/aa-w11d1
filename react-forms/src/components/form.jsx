import {useState, useEffect, useRef} from 'react';
import './form.css'

function Form(props) {

    // declare variables
    // const [checked, setChecked] = useState(false);
    const [phoneType, setPhoneType] = useState('');

    const [user,setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        phoneType: phoneType,
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
        let validPhoneTypes = ["home", "work", "mobile"]
        if (!validPhoneTypes.includes(user.phoneType)) {
            errors.push("Phone type is invalid")
        }
        if (user.bio.length > 280) {
            errors.push("Bio should have less than 280 characters")
        }
        return errors;
    }

    // handle changes

    const handleChange = (incomingKey) => {
        return e => {
            const newObj = Object.assign({}, user, {[incomingKey]: e.target.value})
            setUser(newObj)
        }
    }

    const handleChecked = () => {
        // await setChecked(!checked)
        const newObj = Object.assign({}, user, {['signUpEmailNotifications']: !user.signUpEmailNotifications})
        setUser(newObj)
        console.log(user.signUpEmailNotifications)
    }

    // useEffect(() => {
    //     console.log(checked)
    //     const newObj = Object.assign({}, user, {['signUpEmailNotifications']: checked})
    //     setUser(newObj)
    // }, [checked])

    const handlePhoneType = (e) => {
        setPhoneType(e.target.value);
    }

    useEffect(() => {
        console.log(phoneType)
        const newObj = Object.assign({}, user, {['phoneType']: phoneType})
        setUser(newObj)
    }, [phoneType])



    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validate();

        if (errors.length) {
            setErrors(errors)
        } else {
            setUser({
                name: '',
                email: '',
                phoneNumber: '',
                phoneType: '',
                staff: '',
                bio: '',
                signUpEmailNotifications: false
            })
            console.log(user);
            setErrors([]);
        }
    }


    // handle errors
    const showErrors = () => {
        if (!errors.length) return null;
        return (
            <ul>
                {errors.map((error, i)=> <li key={i}> {error}</li>)}
            </ul>
        )
    }

    // = | = | = | = | = | = | = | = | = | = | = | = | = | = | = | = |

    // render form & errors

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name
                <input type="text" id="name" onChange={handleChange("name")} value={user.name} required />
            </label>
            <label htmlFor="email">E-mail
                <input type="email" id="email" onChange={handleChange("email")} value={user.email} required />
            </label>
            <label htmlFor="signUp">Would you like to sign up for email notifications?
                <input type="checkbox" id="signUp" onChange={handleChecked} checked={user.signUpEmailNotifications}/>
            </label>
            <label htmlFor="phone">Phone Number
                <input type="tel" id="phone" onChange={handleChange("phoneNumber")} value={user.phone} />
            </label>
            <label htmlFor="phoneType">Phone type
                <select name="phoneType" onChange={handlePhoneType}>
                    <option disabled>Select phone type</option>
                    <option value='home'>Home</option>
                    <option value='work'>Work</option>
                    <option value='mobile'>Mobile</option>
                </select>
            </label>
            <p>Staff</p>
            <label htmlFor="instructor">Instructor <input type="radio" name='staff' id="instructor" value="Instructor" onChange={handleChange("staff")} /></label>
            <label htmlFor="student">Student <input type="radio" name='staff' id="student" value="Student" onChange={handleChange("staff")} /></label>

            <label htmlFor="bio">Bio</label>
            <textarea id="bio" onChange={handleChange("bio")} maxLength="280" value={user.bio} ></textarea>

            <button>Submit</button>
            {showErrors()}

        </form>
        </>
    );
}

export default Form;
