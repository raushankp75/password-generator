import { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGenerator = () => {
    const [length, setLength] = useState(8)
    const [includeNumber, setIncludeNumber] = useState(false)
    const [includeSpecialChar, setIncludeSpecialChar] = useState(false)
    const [password, setPassword] = useState("")

    // useRef hooks
    const passwordRef = useRef(null)


    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (includeNumber) {
            str += "0123456789"
        }
        if (includeSpecialChar) {
            str += "!@#$%^&*_-+={}[]~`"
        }

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char);
        }

        setPassword(pass);

    }, [length, includeNumber, includeSpecialChar, setPassword])



    // copy password method
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select()
        // passwordRef.current?.setSelectionRange(0, 3)
        window.navigator.clipboard.writeText(password);
    }, [password])


    
    useEffect(() => {
        passwordGenerator();
    }, [length, includeNumber, includeSpecialChar, passwordGenerator])


    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='w-full max-w-sm mx-auto shadow-md rounded-lg px-4 py-8 my-8 bg-gray-800'>
                <h1 className='text-center mb-4 text-orange-500 font-bold text-2xl'>Password Generator</h1>
                <div className='flex shadow-sm rounded-lg overflow-hidden mb-4'>
                    <input
                        type="text"
                        value={password}
                        className='outline-none w-full py-1 px-3 tracking-wide'
                        placeholder='password'
                        readOnly
                        ref={passwordRef}
                    />

                    <button
                    onClick={copyPasswordToClipboard}
                        className='outline-none bg-blue-500 text-white py-1 px-3 shrink-0'
                    >Copy
                    </button>
                </div>

                <div className="flex flex-col text-sm gap-5 text-blue-500 font-bold tracking-widest">
                    <div className="flex items-center gap-x-1">
                        <input
                            type="range"
                            id='textBox'
                            min={4}
                            max={25}
                            value={length}
                            className='cursor-pointer'
                            onChange={(e) => { setLength(e.target.value) }}
                        />
                        <label htmlFor="textBox">Length: <span className='text-green-600 font-bold border-b-2 border-b-orange-500'>{length}</span></label>
                    </div>

                    <div className='flex justify-between gap-x-1'>
                        <div className="flex items-center gap-x-1">
                            <input
                                type="checkbox"
                                defaultChecked={includeSpecialChar}
                                id='characterInput'
                                onChange={() => { setIncludeSpecialChar((prev) => !prev) }}
                            />
                            <label htmlFor="characterInput">Special Character</label>
                        </div>

                        <div className="flex items-center gap-x-1">
                            <input
                                type="checkbox"
                                defaultChecked={includeNumber}
                                id='numberInput'
                                onChange={() => { setIncludeNumber((prev) => !prev) }}
                            />
                            <label htmlFor="numberInput">Numbers</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PasswordGenerator