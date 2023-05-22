import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
  
  
    const { userInfo } = useSelector((state) => state.auth);
  
    useEffect(() => {
      setName(userInfo.name);
      setEmail(userInfo.email)
    }, [userInfo.setName,userInfo.setEmail]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
       console.log('submit')
      }
    };

    return (
        <FormContainer>

            <h1>Update Profile</h1>

            <form onSubmit={ submitHandler }>

            <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={ name }
                    onChange={ (e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={ confirmPassword }
                    onChange={ (e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>

               

                
            </form>

        </FormContainer>
    )
}

export default ProfileScreen;