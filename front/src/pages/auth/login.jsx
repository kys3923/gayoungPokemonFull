import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

  const [ submitForm, setSubmitForm ] = useState({
    email: '',
    password: '',
  })
  const [ message, setMessage ] = useState()

  const navigate = useNavigate()

  const { email, password } = submitForm

  const formChangeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const inputValidation = (email, password) => {

    if (!email) {
      setMessage('Please enter your email')
      return false
    }
    
    if(!password) {
      setMessage('Please enter password')
      return false
    }

    return true
  }

  const clickHandler = (e) => {
    e.preventDefault()

    if(!inputValidation(email, password)) {
      return
    }

    // TODO: API call
    const sendOutForm = {
      email: email,
      password: password,
    }

    const requestToAPI = async (form) => {
      try {
        const request = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/login`, form)
        if(request.data) {
          sessionStorage.setItem('authToken', request.data.token)
          sessionStorage.setItem('userId', request.data.userId)
          navigate('/')
        }
      } catch (e) {
        setMessage(e.response.data.message)
      }
    } 
    requestToAPI(sendOutForm)
  }

  useEffect(() => {
    if(sessionStorage.token) {
      navigate('/')
    }
  },[])

  return (
    <div className='bg-green-900 text-white flex flex-col items-center p-8 gap-4'>
      <p className='font-bold text-xl'>Login</p>
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
export default Login;