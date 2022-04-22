/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import './NewLogin.css'

export default function NewLogin () {
  const [inputs, setinputs] = useState({
    email: '',
    password: ''
  })

  const [warnemail, setwarnemail] = useState(false)
  const [warnpass, setwarnpass] = useState(false)
  const [danger, setdanger] = useState(true)

  const [eye, seteye] = useState(true)
  const [pass, setpass] = useState('password')

  const inputEvent = event => {
    const name = event.target.name
    const value = event.target.value
    if (name === 'email') {
      if (value.length > 0) {
        setdanger(true)
      }
    }
    setinputs(lastValue => {
      return {
        ...lastValue,
        [name]: value
      }
    })
  }

  const submitForm = e => {
    e.preventDefault()
    setwarnemail(false)
    setwarnpass(false)
    if (inputs.email.length < 1) {
      setdanger(false)
    }
    if (inputs.email === '') {
      setwarnemail(true)
    } else if (inputs.password === '') {
      setwarnpass(true)
    } else {
      alert('Logged in Successfully')
    }
  }
  const Eye = () => {
    if (pass === 'password') {
      setpass('text')
      seteye(false)
    } else {
      setpass('password')
      seteye(true)
    }
  }

  const isMobile = window.innerWidth < 550
  const rightmd = isMobile ? 'right-side' : 'right-side-mobile'
  const btnmd = isMobile ? 'btnmobile' : 'btn'
  const hellomd = isMobile ? 'hello-mobile' : 'hello'

  return (
    <div
      css={{
        display: 'wrap',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '3.125rem',
        paddingBottom: '6rem',
        backgroundColor: '#252525',
        '@media only screen and (max-width: 850px)': {
          paddingBottom: '0rem',
          paddingTop: '0rem'
        }
      }}
    >
      <div className='container'>
        <div className='card'>
          <div className='form'>
            <div className={rightmd}>
              <div className={hellomd}>
                <h2>Login</h2>
              </div>

              <form onSubmit={submitForm}>
                <div className='input_text'>
                  <input
                    className={` ${warnemail ? 'warning' : ''}`}
                    type='text'
                    placeholder='Phone number'
                    name='email'
                    value={inputs.email}
                    onChange={inputEvent}
                  />
                  <p className={` ${danger ? 'danger' : ''}`}>
                    <i className='fa fa-warning'></i>Please enter a valid email
                    address.
                  </p>
                </div>
                <div className={btnmd}>
                  <button type='submit'>Verify</button>
                </div>
              </form>

              <hr />
              <div className='or'>
                <p>or signin with</p>
              </div>
              <div className='boxes'>
                <span>
                  <img src='https://imgur.com/XnY9cKl.png' />
                </span>
                <span>
                  <img src='https://imgur.com/mPBRdQt.png' />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
