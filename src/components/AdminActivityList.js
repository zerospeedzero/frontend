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
  const [activities, setActivities] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterEndDate, setFilterEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const handleTimeFilter = (value) => {
    if (value === 'one-month') {
      setFilterStartDate(new Date().toISOString().split('T')[0]);
      setFilterEndDate(new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]);
    } else if (value === 'three-months') {
        setFilterStartDate(new Date().toISOString().split('T')[0]);
        setFilterEndDate(new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]);
    } else if (value === 'future') {
      setFilterStartDate(new Date().toISOString().split('T')[0]);
      setFilterEndDate(new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0]);
    } else if (value === 'all') {
      setFilterStartDate(new Date(new Date().setFullYear(new Date().getFullYear() - 10)).toISOString().split('T')[0]);
      setFilterEndDate(new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0]);
    }
  }
  const handleRegister = async (activityId, monthlyId, weeklyId, requiredHours) => {
    const postData = {
      "data": {
        email: session.id,
        activityId: activityId,
        monthlyId: monthlyId | null,
        weeklyId: weeklyId | null,
        requiredHours: requiredHours | 12,
        recordedHours: 0
      }
    }
    // Handle registration logic here
    console.log(session.jwt)
    console.log(postData)
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations`, postData, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities?_sort=endDate:DESC&populate=*`, {
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
  }, []);
  
  console.log(activities)
  return (
    <div className="flex flex-col text-p1 space-y-4">
      <div className='flex flex-row justify-end items-center mb-2'>
      <input type="text" placeholder="Search..." className="input input-bordered max-w-ws mr-4 max-w-xs"
        onChange={e=> {handleSearch(e.target.value)}}
      />
        <select className="select  select-bordered max-w-xs"
          onChange={e=> handleTimeFilter(e.target.value)}
        >
          <option value='one-month'>One month</option>
          <option value='three-months' selected>Three months</option>
          <option value='future'>Future</option>
          <option value='all'>All</option>
        </select>        
      </div>
      {activities
        .filter((activity) => activity.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((activity, index) => (
        <motion.div key={activity.id} className="bg-gray-100 p-4 rounded space-y-4"
          initial={{ opacity: 0, x: (-100 * index) }}
          animate={{ opacity: 1, x:0 }}
          transition={{ delay: (index/4), duration: 1}}
        >
          <h2 className="text-xl font-semibold mb-6">Activity: {activity.attributes.name}</h2>
          <p className="text-gray-600">Description: {activity.attributes.description}</p>
          <p>Start Date: {activity.attributes.startDate} End Date: {activity.attributes.endDate}</p>
          <p>Start time: {activity.attributes.startTime} End time: {activity.attributes.endTime}</p>
          <p>Expected earned hour per session: {activity.attributes.estimatedHoursEarned}</p>
          <div className="mt-4">
            {/* One Time */}
            {(activity.attributes.weeklyFields.length == 0 && activity.attributes.monthlyFields.length == 0 )&& (
              <div className='flex flex-row justify-between items-center'>
                <div>
                  <p>Seats: {activity.attributes.seats}</p>
                  <p>Available seats: {activity.attributes.availableSeats}</p>
                </div>
                <button
                  onClick={() => handleRegister(activity.id,null, null, activity.attributes.estimatedHoursEarned)}
                  disabled={activity.availableSeats === 0}
                  className={`ml-4 px-4 py-2 rounded ${
                    activity.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-p2 text-black'
                  }`}
                >
                  {activity.availableSeats === 0 ? 'Full' : 'Register'}
                </button>                
              </div>
            )}
            {/* Weekly Fields */}
            {activity.attributes.weeklyFields && activity.attributes.weeklyFields.length > 0 && (
              <div className='collapse  border border-gray-200 bg-p1/400'>
                <input type="checkbox"/>
                <div className='collapse-title collapse-plus flex flex-row justify-between items-center rounded-none mb-2 bg-p1/20'>
                  <h3 className="text-lg font-semibold mb-2">Weekly slots</h3>
                  <BiExpandVertical/>
                </div>
                <div className='collapse-content'>
                  <ul className=" list-disc pl-4">
                    {activity.attributes.weeklyFields
                      .filter((weeklyField) => new Date(weeklyField.weekStartDate) >= new Date(filterStartDate) && new Date(weeklyField.weekEndDate) <= new Date(filterEndDate))
                      .map((weeklyField, index) => (
                      <motion.li
                        key={weeklyField.id}
                        className={`grid grid-cols-5 justify-between items-center space-x-4 p-2 rounded shadow mb-2 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                        }`}
                        initial={{ opacity: 0, y: (-10 * index) }}
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ delay: (index * 0.07), duration: 0.3, type: 'spring', bounce: 0.25 }}
                      >
                        <span className='col-span-2' >{`Week: ${weeklyField.weekStartDate} - ${weeklyField.weekEndDate}`}</span>
                        <span className='col-span-1'>{`Seats: ${weeklyField.seats}`}</span>
                        <span className='col-span-1'>{`Available Seats: ${weeklyField.availableSeats}`}</span>
                        <button
                          onClick={() => handleRegister(activity.id, '', weeklyField.id, weeklyField.estimatedHoursEarned)}
                          disabled={weeklyField.availableSeats === 0}
                          className={`ml-4 px-4 py-2 justify-self-end rounded-md col-span-1  ${
                            weeklyField.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-p2 text-black'
                          }`}
                        >
                          {weeklyField.availableSeats === 0 ? 'Full' : 'Register'}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Monthly Fields */}
            {activity.attributes.monthlyFields && activity.attributes.monthlyFields.length > 0 && (
              <div className='collapse  border border-gray-200 bg-p1/400 rounded-md' >
                <input type="checkbox"/> 
                <div className='collapse-title  flex flex-row justify-between items-center rounded-none mb-2 bg-p1/20'>
                  <h3 className="text-lg font-semibold  py-0 mb-2 mt-2">Monthly slots</h3>
                  <BiExpandVertical/>
                </div>
                <div className='collapse-content'>
                  <ul className="list-disc pl-4">
                    {activity.attributes.monthlyFields
                      .filter((monthlyField) => new Date(monthlyField.monthName) >= new Date(filterStartDate) && new Date(monthlyField.monthName) <= new Date(filterEndDate))
                      .map((monthlyField, index) => (
                      <motion.li
                        key={monthlyField.id}
                        className={`grid grid-cols-4 justify-between items-center space-x-4 p-2 rounded shadow mb-2 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                        }`}
                        initial={{ opacity: 0, y: (-10 * index) }}
                        whileInView={{ opacity: 1, y:0 }}
                        transition={{ delay: (index * 0.07), duration: 0.3, type: 'spring', bounce: 0.25 }}
                      >
                        <span className='col-span-1'>{`Month: ${monthlyField.monthName}`}</span>
                        <span className='col-span-1'>{`Seats: ${monthlyField.seats}`}</span>
                        <span className='col-span-1'>{`Available Seats: ${monthlyField.availableSeats}`}</span>
                        <button
                          onClick={() => handleRegister(activity.id, monthlyField.id, '', monthlyField.estimatedHoursEarned)}
                          disabled={monthlyField.availableSeats === 0}
                          className={`ml-4 px-4 py-2 justify-self-end rounded col-span-1 ${
                            monthlyField.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-p2 text-black'
                          }`}
                        >
                          {monthlyField.availableSeats === 0 ? 'Full' : 'Register'}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityList;
