import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CreateNewUser from '../User/CreateUser';
import API from '../App/API/API'

const Login = ({settoken}) => {
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [validation, setValidation] = useState('');
    const api = new API();

    const handleSubmit = async e => {
        let token;
        try{
            e.preventDefault();
            token = await api.login({
                email: username,
                password: btoa(password)
            });
            token.email = username;
            settoken(token);
        }
        catch (err) {
            settoken(null);
            setValidation(`${err}`);
        }
    }

    const handleClosePopup = () => {
        setShowCreateUser(false);
    };
  return (
    <div className='body'>
        <div className="centered-div-no-boarder"></div>
        <div className="centered-div">
            <h1>Sign In Here</h1>
            <p>{`${validation}`}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>UserName </h2>
                    <input type="text" onChange={e => setusername(e.target.value)} className="textbox" required placeholder='JohnDoe'/>
                </div>
                <div>
                    <h2>Password </h2>
                    <input type="password" onChange={e => setpassword(e.target.value)} className="textbox" required placeholder='Please enter a strong password'/>
                </div>
                <div>
                    <p></p><button type="submit" className='button'>Submit</button>
                </div>
            </form>
            <button className="button" id="createBtn" onClick={() => setShowCreateUser(true)}>New User? Click here to create an account</button>
            <CreateNewUser onClose={handleClosePopup} showCreateUser={showCreateUser}/>
        </div>
    </div>
  )
}

Login.propTypes={
    settoken: PropTypes.func.isRequired
}

export default Login