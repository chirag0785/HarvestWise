import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const [name, setname] = useState('');
    const [category, setcategory] = useState('');
    const [price, setprice] = useState(0);
    const [seller, setseller] = useState('');
    const [description, setdescription] = useState('');
    const [file, setfile] = useState(null);
    const fileInputRef=useRef();
    const navigate=useNavigate();
    const submitHandler=async (ev)=>{
        ev.preventDefault();
        const addItemHandler=async ()=>{
            const formData=new FormData();
            formData.append('name',name);
            formData.append('category',category);
            formData.append('price',price);
            formData.append('seller',seller);
            formData.append('description',description);
            formData.append('file',file);
            const {data}=await axios.post(`http://localhost:3000/admin/add-item`,formData);
            navigate(`/inventory`);
        }
        if(file && name && category && price && seller){
            await addItemHandler();
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setname('');
        setcategory('');
        setprice(0);
        setseller('');
        setdescription('');
        setfile(null);
    }
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={submitHandler} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Add New Item</h2>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter name of item"
                        onChange={(ev) => setname(ev.target.value)}
                        value={name}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter category of item"
                        onChange={(ev) => setcategory(ev.target.value)}
                        value={category}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter price of item"
                        onChange={(ev) => setprice(Number(ev.target.value))}
                        value={price}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="seller">
                        Seller
                    </label>
                    <input
                        type="text"
                        id="seller"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter seller of item"
                        onChange={(ev) => setseller(ev.target.value)}
                        value={seller}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter description of item"
                        onChange={(ev) => setdescription(ev.target.value)}
                        value={description}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="file">
                        Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        className="w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(ev) => setfile(ev.target.files[0])}
                        ref={fileInputRef}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Add Item
                </button>
            </form>
        </div>
    </>
  )
}

export default AddItem