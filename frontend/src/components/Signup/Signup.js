import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSignup } from '../../functions/UserSlice/UserSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [view,setview]=useState(0);
    const dispatch=useDispatch();
    const data=useSelector(state=>state.user);
    const signupHandler=async (ev)=>{
        setview(view+1);
        ev.preventDefault();
        await dispatch(getUserSignup({username,password,email}));
    }
    useEffect(()=>{
        if(data.isLoggedIn){
            navigate(`/profile`);
        }
        if(data.msg==='Sign up success'){
            navigate(`/login`);
        }
        setemail('');
        setpassword('');
        setusername('');
    },[data])
  return (
    <>
        <form onSubmit={signupHandler} className='w-2/5 mx-auto flex flex-col gap-y-5 border border-stone-500 px-7 py-4 mt-16 text-black'>
            <input type='text' className='p-2 bg-orange-100' placeholder='Enter Username' onChange={(ev)=>setusername(ev.target.value)} value={username}/>
            <input type='text' className='p-2 bg-orange-100' placeholder='Enter Email' onChange={(ev)=>setemail(ev.target.value)} value={email}/>
            <input type='password' className='p-2 bg-orange-100' placeholder='Enter Password' onChange={(ev)=>setpassword(ev.target.value)} value={password}/>
            <button type='submit' className='w-32 mx-auto bg-zinc-950 p-1.5 rounded-2xl text-white'>SignUp</button>

            <div className='text-white'>{view==1?data.msg:""}</div>
        </form>
    </>
  )
}

export default Signup