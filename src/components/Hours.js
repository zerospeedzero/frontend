// components/ActivityList.js
import { useState, useEffect } from 'react';
import { BiExpandVertical } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import ReportHoursPopup from './ReportHoursPopup';
import { GiCancel } from "react-icons/gi";
import axios from 'axios';

const ActivityList = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const totalRequiredHours = registrations.reduce(
    (sum, registration) => sum + registration.attributes.requiredHours,
    0
  );

  const totalReportedHours = registrations.reduce(
    (sum, registration) => sum + registration.attributes.reportedHours,
    0
  );


  useEffect(() => {
    if (!session) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities?populate=*`, {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
            'Content-Type': 'application/json',
          },          
        });
        const data = await response.json();
        setActivities(data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchData();    
    const fetchRegistrationData = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations??filters[email][id]=${session.id}&populate=*`, {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations?filters[email][id]=${session.id}&populate=*`, {
  
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
    fetchRegistrationData();
  }, [session, refresh]);
  console.log(registrations) 
  console.log(activities)
  return (
    <div className="container mx-auto mt-8 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">My required and reported hours</h1>
      <div className='grid grid-cols-3 gap-4 mt-8'>
        <div className="flex flex-col justify-center items-center bg-p1 text-white p-6 space-y-4 rounded-lg">
          <h2 className="text-xl font-bold mr-2">Required hours</h2>
          <h2 className="text-2xl font-bold">{totalRequiredHours}</h2>
        </div>
        <div className="flex flex-col justify-center items-center bg-p1 text-white p-6 space-y-4 rounded-lg">
          <h2 className="text-xl font-bold mr-2">Reported hours</h2>
          <h2 className="text-2xl font-bold">{totalReportedHours}</h2>
        </div>
        <div className="flex flex-col justify-center items-center bg-p1 text-white p-6 space-y-4 rounded-lg">
          <h2 className="text-xl font-bold mr-2">Still needed</h2>
          <h2 className="text-2xl font-bold">{totalRequiredHours - totalReportedHours}</h2>
        </div>                
      </div>
    </div>
    );
  };

export default ActivityList;
