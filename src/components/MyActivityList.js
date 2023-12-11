// components/ActivityList.js
import { useState, useEffect } from 'react';
import { BiExpandVertical } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import ReportHoursPopup from './ReportHoursPopup';
import { GiCancel } from "react-icons/gi";
import axios from 'axios';
import InfoBox from '@/components/Infobox';

const ActivityList = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

  const handleOpenPopup = (selectedRegistrationId) => {
    if (selectedRegistrationId != null) {
      setPopupVisible(true);
    }
  };
  const handleClosePopup = () => {
    setSelectedRegistrationId(null);
    setPopupVisible(false);
    setRefresh(!refresh);
  };

  const handleDelete = async (id) => { 
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations/` + id,
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error('Error reporting hours:', error);
    }
    setRefresh(!refresh);
  }
  

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
    fetchRegistrationData();
  }, [session, refresh]);
  // console.log(registrations) 
  // console.log(activities)
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My registrations</h1>
      <div className="grid grid-cols-1 gap-4">
        {registrations && registrations.map((registration, index) => (
          <motion.div key={registration.id} className="bg-white p-4 rounded shadow"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (0.2 + index/3), duration: 0.5 }}
          >
            <div className='relative'>
              <p className='mb-4'>
                <strong>Activity Name:</strong> {registration.attributes.activityId.data.attributes.name}
              </p>
              <div className='absolute right-0 top-0'>
                <GiCancel className='text-2xl cursor-pointer'
                  onClick={() => {handleDelete(registration.id)} }
                />
              </div>
            </div>
            <p className='mb-4'>
              <strong>Activity Description:</strong>{' '}
              {registration.attributes.activityId.data.attributes.description}
            </p>
            <p className='mb-4'>
              <strong>Activity Duration:</strong>{' '}
              {registration.attributes.duration}
            </p>
            <div className='grid grid-cols-4 grid-gap-4 mb-4'>
              <p><strong>Required Hours:</strong> {registration.attributes.requiredHours}</p>
              <p><strong>Reported Hours:</strong> {registration.attributes.reportedHours}</p>
              <p><strong>Left Hours:</strong> {registration.attributes.requiredHours - registration.attributes.reportedHours}</p>
              <button className='w-[6rem] bg-p1/80  text-p2 hover:bg-p1 text-white font-bold py-1 px-2 rounded'
                // onClick={() => {handleOpenPopup(registration.id) }}
                onClick={() => {setSelectedRegistrationId(registration.id); setTimeout(() => {handleOpenPopup(registration.id)}, 500)}}
              >
                Report
              </button>
            </div>
            {isPopupVisible && (
              <ReportHoursPopup
              registrationId={selectedRegistrationId}
                onClose={handleClosePopup}
              />
            )} 
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
