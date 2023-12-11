import React, {useState} from 'react'
import PropTypes from 'prop-types'
import CreateNewUser from '../User/CreateUser';
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    //.then(data => data.json())
    .then(response => {
        // Check if the response status is OK (200)
        if (response.ok) {
          return response.json(); // or response.text() depending on the expected response type
        }
        else {
          throw new Error(`Invalid Username or Password`);
        }
      })
}

const Login = ({settoken}) => {
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [validation, setValidation] = useState('');

    const handleSubmit = async e => {
        let token;
        try{
            e.preventDefault();
            token = await loginUser({
                email: username,
                password: password
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
    <>
    <div >
        <div>
            <div>
                <div className="my-component-container">
                    <h1>Sign In Here</h1>
                    <p>{`${validation}`}</p>
                    <form onSubmit={handleSubmit}>
                        <p>UserName</p>
                        <input type="text" onChange={e => setusername(e.target.value)} className="textbox" required placeholder='JohnDoe'/>
                        <p>Password</p>
                        <input type="password" onChange={e => setpassword(e.target.value)} className="textbox" required placeholder='Please enter a strong password'/>
                        <button type="submit" className='button'>Submit</button>
                        <div>
                            <p><input type="checkbox" />Remember Me</p>
                        </div>
                    </form>
                    <button className="button" id="createBtn" onClick={() => setShowCreateUser(true)}>New User? Click here to create an account</button>
                    <CreateNewUser onClose={handleClosePopup} showCreateUser={showCreateUser}/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

Login.propTypes={
    settoken: PropTypes.func.isRequired
}

export default Login