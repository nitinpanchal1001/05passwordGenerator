import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [Password , setPassword] = useState()
  
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*(){}"
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length , numberAllowed , charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(Password)
  } , [Password])

  useEffect(() => {
    PasswordGenerator()
  },[length,numberAllowed,charAllowed,PasswordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-400 bg-gray-900'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
          <button onClick={copyPasswordToClipboard}  className='outline-none text-white bg-blue-700 px-3 py-0.5 shrink-0' >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>
                Length:{length}
              </label>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="checkbox"
                  defaultChecked = {numberAllowed}
                  id = "numberInput"
                  onChange={() =>{
                    setNumberAllowed((prev) => !prev);
                    }}
                />
                <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                  type="checkbox"
                  defaultChecked = {charAllowed}
                  id = "charInput"
                  onChange={() =>{
                    setCharAllowed((prev) => !prev);
                    }}
                />
                <label htmlFor="charInput">Characters</label>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
