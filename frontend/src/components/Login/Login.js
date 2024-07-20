import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogin, setSocketConnection } from '../../functions/UserSlice/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [view, setview] = useState(0);
    const data = useSelector(state => state.user);
    const dispatch = useDispatch();

    const loginHandler = async (ev) => {
        ev.preventDefault();
        setview(view + 1);
        await dispatch(getUserLogin({
            username,
            password,
            email
        }));
    };

    useEffect(() => {
        if (data.isLoggedIn) {
            navigate(`/profile`);
        }
        setemail('');
        setpassword('');
        setusername('');
    }, [data]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={loginHandler} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Username"
                        onChange={(ev) => setusername(ev.target.value)}
                        value={username}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Email"
                        onChange={(ev) => setemail(ev.target.value)}
                        value={email}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Password"
                        onChange={(ev) => setpassword(ev.target.value)}
                        value={password}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Login
                </button>
                <div className="text-white text-center mt-4">
                    New User? <Link to={'/signup'} className='hover:text-emerald-500'>Signup</Link>
                </div>
                <div className="text-white text-center mt-2">
                    {view === 1 ? data.msg : ""}
                </div>
            </form>
        </div>
    );
};

export default Login;
