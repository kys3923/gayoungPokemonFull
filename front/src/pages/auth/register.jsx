import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {

  const [ submitForm, setSubmitForm ] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [ message, setMessage ] = useState()
  const navigate = useNavigate()

  const { email, password, confirmPassword } = submitForm

  const formChangeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const inputValidation = (email, password, passwordConfirm) => {

    if (!email) {
      setMessage('Please enter your email')
      return false
    }
    
    if(!password) {
      setMessage('Please enter password')
      return false
    }
    
    if (!passwordConfirm) {
      setMessage('Please enter confirming password')
      return false
    }
    
    if(password !== passwordConfirm) {
      setMessage('Your passwords do not match')
      return false
    }

    return true
  }

  const clickHandler = (e) => {
    e.preventDefault()

    if(!inputValidation(email, password, confirmPassword)) {
      return
    }

    // TODO: API call
    const sendOutForm = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    const requestToAPI = async (form) => {
      try {
        const request = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/register`, form)
  
        if(request.data) {
          sessionStorage.setItem('authToken', request.data.token)
          sessionStorage.setItem('userId', request.data.userId)
          navigate('/')
        }
        
      } catch (error) {
        setMessage(error.response.data.message)
      }
    }

    requestToAPI(sendOutForm)
  }

  useEffect(() => {
    if(sessionStorage.authToken) {
      navigate('/')
    }
  },[])


  return (
    <div className='bg-green-900 text-white flex flex-col items-center p-8 gap-4'>
      <p className='font-bold text-xl'>Register Account</p>
      {message && <p className='text-red-500'>{message}</p>}
      <form className='flex flex-col gap-4' onSubmit={clickHandler}>
        <div>
          <p className='text-xs'>Email</p>
          <input type='email' name='email' value={email} onChange={formChangeHandler} className='text-gray-700'/>
        </div>
        <div>
          <p className='text-xs'>Password</p>
          <input type='password' name='password' value={password} onChange={formChangeHandler} className='text-gray-700' />
        </div>
        <div>
          <p className='text-xs'>Confirm Password</p>
          <input type='password' name='confirmPassword' value={confirmPassword} onChange={formChangeHandler} className='text-gray-700' />
        </div>
        <button type='submit'>Register Account</button>
      </form>
    </div>
  );
}
export default Register;