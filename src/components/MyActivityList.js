// components/ActivityList.js
import { useState, useEffect } from 'react';
import { BiExpandVertical } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import axios from 'axios';

const ActivityList = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);



  // const handleRegister = async (activityId, monthlyId, weeklyId) => {
  //   const postData = {
  //     "data": {
  //       email: session.id,
  //       activityId: activityId,
  //       monthlyId: monthlyId | null,
  //       weeklyId: weeklyId | null
  //     }
  //   }
  //   // Handle registration logic here
  //   console.log(session.jwt)
  //   console.log(postData)
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations`, postData, {
  //       headers: {
  //         Authorization: `Bearer ${session.jwt}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations?populate=*`, {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
            'Content-Type': 'application/json',
          },          
        } );
        const data = await response.json();
        setRegistrations(data.data);
      } catch (error) {
        console.error('Error fetching registration:', error);
      }
    };
    
    fetchData();
  }, []);
  console.log(registrations) 
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Registrations List</h1>
      <div className="grid grid-cols-1 gap-4">
        {registrations && registrations.map((registration) => (
          <div key={registration.id} className="bg-white p-4 rounded shadow">
            <p className='mb-4'>
              <strong>Activity Name:</strong> {registration.attributes.activityId.data.attributes.name}
            </p>
            <p className='mb-4'>
              <strong>Activity Description:</strong>{' '}
              {registration.attributes.activityId.data.attributes.description}
            </p>
            <div className='grid grid-cols-3 grid-gap-4 mb-4'>
              <p><strong>Required Hours:</strong> {registration.attributes.requiredHours}</p>
              <p><strong>Reported Hours:</strong> {registration.attributes.recordedHours}</p>
              <p><strong>Left Hours:</strong> {registration.attributes.requiredHours - registration.attributes.recordedHours}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
