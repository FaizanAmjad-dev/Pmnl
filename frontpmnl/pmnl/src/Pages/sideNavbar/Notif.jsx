import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi'; // react-icons use karte hue
import { AllData } from '../../ContextAPI/UserContext';



function Notif() {
  const { globalnot, setGlobalnot } = useContext(AllData)

  const token = localStorage.getItem('access-token')
  // ya api hai 
  const API = "http://127.0.0.1:8000/parentapi/notificatoin/"
  // ys fake arry hai 
  const [reciever, setReceiver] = useState([])
  useEffect(() => {
    const getNotifications = () => {
      fetch(API, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setReceiver(data);
          setGlobalnot(data.length);
        });
    };

    getNotifications();
    const interval = setInterval(getNotifications, 5000);
    return () => clearInterval(interval);
  }, [token]);


  const Delete = (id) => {
    fetch(`${API}${id}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(() => {
        setReceiver((all) => all.filter((prev) => prev.id !== id))
        setGlobalnot((prev) => prev > 0 ? prev - 1 : 0)
      })
  }


  return (
    <div className="min-h-screen px-40 py-6">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-t border-gray-200">
            <th className="py-3 px-4 font-bold text-gray-700 text-lg">ID</th>
            <th className="py-3 px-4 font-bold text-gray-700 text-lg">Description</th>
            <th className="py-3 px-4 font-bold text-gray-700 text-lg">Date</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {reciever.map((list, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 ">
              <td className="py-4 px-3 text-gray-600 text-sm">{list.id}</td>
              <td className="py-4 px-3 text-gray-600 text-sm min-w-40 whitespace-nowrap">{list.message}</td>
              <td className="py-4 px-3 text-gray-600 text-sm whitespace-nowrap">{new Date(list.created_at).toLocaleString()}</td>
              <td className="py-4 px-3 text-right">
                <button
                  onClick={() => Delete(list.id)}
                  className="bg-red-700 text-white px-3 py-2 rounded flex items-center gap-1.5 ml-auto text-xs font-medium">
                  <HiOutlineTrash size={14} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notif;