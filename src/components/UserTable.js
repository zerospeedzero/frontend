import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const UserTable = ({setUserId}) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  const switchUser = (id) => {
    setUserId(null)
    setTimeout(() => {
      setUserId(id)
    }, 1000);
   }


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3337/api/users?populate[registrations][populate][0]=activityId');

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users?populate=*`, {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
            'Content-Type': 'application/json',
          },
        });
        // const data = await response.json();
        console.log(response)
        setUsers(response.data);
      } catch (e) {
        console.error("Fetching error: ", e);
        setError(e.message);
      }
    };
    if (session) {
      fetchData();
    }
  }, session);

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(users)
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Username</th>
            <th scope="col" className="py-3 px-6">Email</th>
            <th scope="col" className="py-3 px-6">Parent Firstname</th>
            <th scope="col" className="py-3 px-6">Parent Lastname</th>
            <th scope="col" className="py-3 px-6">Required Hours</th>
            <th scope="col" className="py-3 px-6">Reported Hours</th>
            <th scope="col" className="py-3 px-6">Registration ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6" onClick={()=>{switchUser(user.id)}} >{user.username}</td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.parent.firstName}</td>
              <td className="py-4 px-6">{user.parent.lastName}</td>
              <td className="py-4 px-6">{user.registrations.reduce((total, reg) => total + reg.requiredHours, 0)}</td>
              <td className="py-4 px-6">{user.registrations.reduce((total, reg) => total + reg.reportedHours, 0)}</td>
              <td className="py-4 px-6">{user.registrations.map(reg => reg.id).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

