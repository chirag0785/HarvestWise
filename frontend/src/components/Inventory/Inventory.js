import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InventoryItem from '../InventoryItem/InventoryItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItemsCategoryWise } from '../../utils/items';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user);
    const [categoryWise, setCategoryWise] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getInventoryItems() {
            try {
                let { data } = await axios.get('http://localhost:3000/user/items');
                setItems(data.items);
                setLoading(false);

                const category = getItemsCategoryWise(data.items);
                console.log(category);
                setCategoryWise(category);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        getInventoryItems();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen bg-gray-900 text-red-400 text-xl">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen text-gray-100">
            {user.isLoggedIn && user.user.admin && (
                <div className="mb-8">
                    <button
                        onClick={() => navigate(`/addItem`)}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        Add New Item
                    </button>
                </div>
            )}

            {Object.keys(categoryWise).map((category) => (
                <div key={category} className="mb-12">
                    <h2 className="text-2xl font-bold text-purple-300 mb-6 pb-2 border-b-2 border-purple-500">{category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {categoryWise[category].map((item) => (
                            <div key={item._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-purple-500/50 transform hover:-translate-y-1">
                                <InventoryItem item={item} isAdmin={user.user.admin}/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Inventory