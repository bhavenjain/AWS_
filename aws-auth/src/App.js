import { useState } from 'react'

import './App.css'
// import AboutYou from './Components/AboutYou/AboutYou'
import { Amplify, Auth, Hub } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'

import awsExports from './aws-exports'
Amplify.configure(awsExports)

function App () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  Hub.listen('auth', data => {
    switch (data.payload.event) {
      case 'signIn':
        console.log('user signed in')
        break
      case 'signUp':
        console.log('user signed up')
        break
      case 'signIn_failure':
        console.log('user sign in failed')
        break
      case 'confirmSignUp':
        console.log('SignUp confirmed')
        break
      case 'configured':
        console.log('the Auth module is configured')
        break
      default:
        console.log('over')
        break
    }
  })

  Hub.listen('confirm', data => {
    switch (data.payload.event) {
      case 'confirmSignUp':
        console.log('User is verified')
        break
      default:
        console.log('over')
    }
  })

  const signUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const confirm = async () => {
    await Auth.confirmSignUp(email, otp)
    Hub.dispatch('confirm', {
      event: 'confirmSignUp',
      data: { color: 'blue' },
      message: 'Sign In'
    })
  }

  const handleEmail = e => setEmail(e.target.value)

  const handlePassword = e => setPassword(e.target.value)

  const handleOtp = e => setOtp(e.target.value)

  return (
    <div className='app'>
      {/* <AboutYou /> */}
      {/* <Authenticator loginMechanisms={['username']}>
        {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
      </Authenticator> */}
      Email
      <input type='text' onChange={handleEmail} name='Email' id='email' />
      password
      <input
        type='password'
        onChange={handlePassword}
        name='Password'
        id='password'
      />
      <button onClick={signUp}>Sign up</button>
      Otp
      <input type='text' onChange={handleOtp} name='otp' id='otp' />
      <button onClick={confirm}>Confirm</button>
    </div>
  )
}

export default App
