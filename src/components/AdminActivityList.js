// components/ActivityList.js
import { useState, useEffect } from 'react';
import { BiExpandVertical } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import axios from 'axios';
import Link from 'next/link';

const ActivityList = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterEndDate, setFilterEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('')
  const [refresh, setRefresh] = useState(false)

  const [isPopupVisible, setPopupVisible] = useState(false);

  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const [sortedRegistrations, setSortedRegistrations] = useState([]);

  useEffect(() => {
    if (selectedRegistrationId) {
      const sortedData = [...selectedRegistrationId].sort((a, b) => {
        // Assuming duration is a number, adjust the comparison logic if it's not
        return a.attributes.duration - b.attributes.duration;
      });
      setSortedRegistrations(sortedData);
    }
  }, [selectedRegistrationId]);


  const handleOpenPopup = (selectedRegistrationId) => {
    // if (selectedRegistrationId != null) {
      setPopupVisible(true);
    // }
  };
  const handleClosePopup = () => {
    setSelectedRegistrationId(null);
    setPopupVisible(false);
    setRefresh(!refresh);
  };

  const calculateAvailableSeats = (activities) => {
    var newActivities = [...activities]
    newActivities.forEach((activity, iindex) => {
      activity.attributes.registrations.data.forEach((registration, rindex) => {
        if (registration.attributes.weeklyId > 0) {
          const weeklyIndex = newActivities[iindex].attributes.weeklyFields.findIndex(weeklyField => weeklyField.id === registration.attributes.weeklyId)
          newActivities[iindex].attributes.weeklyFields[weeklyIndex].availableSeats = newActivities[iindex].attributes.weeklyFields[weeklyIndex].availableSeats  - 1
        } else if (registration.attributes.monthlyId > 0) {
          const monthlyIndex = newActivities[iindex].attributes.monthlyFields.findIndex(monthlyField => monthlyField.id === registration.attributes.monthlyId)
          newActivities[iindex].attributes.monthlyFields[monthlyIndex].availableSeats = newActivities[iindex].attributes.monthlyFields[monthlyIndex].availableSeats - 1
        } else {
          newActivities[iindex].attributes.availableSeats = activity.attributes.availableSeats - 1
        }
      })
    })
    setActivities(newActivities)
  }
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
  const handleShowRegistration = async (activityId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations/?filters[activityId][id]=${activityId}&populate=*`
        ,{
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      setSelectedRegistrationId(response.data.data)
      handleOpenPopup(selectedRegistrationId)
    }
    catch (error) {
      console.error('Error fetching registration:', error);
    }
  }
  // const handleRegister = async (activityId, monthlyId, weeklyId, requiredHours, duration) => {
  //   // console.log('start')
  //   // console.log(duration)
  //   // console.log('end')
  //   const postData = {
  //     "data": {
  //       email: session.id,
  //       activityId: activityId,
  //       monthlyId: monthlyId | null,
  //       weeklyId: weeklyId | null,
  //       requiredHours: requiredHours | 12,
  //       reportedHours: 0,
  //       duration: duration
  //     }
  //   }
  //   // Handle registration logic here
  //   // console.log(session.jwt)
  //   // console.log(postData)
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations`, postData, {
  //       headers: {
  //         Authorization: `Bearer ${session.jwt}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     // console.log(response.data);
  //     setRefresh(!refresh)
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };
  const availableSeats = (activity) => {
    // console.log(activity.attributes.monthlyFields.reduce((acc, items) => acc + items.availableSeats, 0))
    if (activity.attributes.monthlyFields.length > 0 && activity.attributes.monthlyFields.reduce((acc, items) => acc + items.availableSeats, 0) == 0) {
      return '- Full'
    }
  }

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
        calculateAvailableSeats(data.data)
        // setActivities(data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchData();
  }, [session, refresh]);
  // useEffect(() => {
  //   calculateAvailableSeats(activities)
  //   console.log('here')
  //   // console.log(activities)
  //   console.log('there')
  // }, [activities]); 
  // console.log(activities)
  console.log(selectedRegistrationId)

  return (
    <div className="flex flex-col text-p1 space-y-4">
      <div className='flex flex-row justify-between items-center mb-2'>
        <Link href='/dashboard/admin/createActivity'
          className='bg-green-600 text-white px-4 py-3 rounded-md mr-2'
        >
          Create Activity
        </Link>
        <div>
          <input type="text" placeholder="Search..." className="input input-bordered max-w-ws mr-4 max-w-xs"
            onChange={e=> {handleSearch(e.target.value)}}
          />
          <select className="select  select-bordered max-w-xs"
            onChange={e=> handleTimeFilter(e.target.value)}
            defaultValue={'three-months'}
            >
            <option value='one-month'>One month</option>
            <option value='three-months'>Three months</option>
            <option value='future'>Future</option>
            <option value='all'>All</option>
          </select>        
        </div>
      </div>
      {activities
        .filter((activity) => activity.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((activity, index) => (
        <motion.div key={activity.id} className="bg-gray-100 p-4 rounded space-y-4"
          initial={{ opacity: 0, x: (-100 * index) }}
          animate={{ opacity: 1, x:0 }}
          transition={{ delay: (index/4), duration: 1}}
        >
          <h2 className="text-xl font-semibold mb-6">Activity: {activity.attributes.name} {availableSeats(activity)}</h2>
          <div className='grid grid-cols-4 gap-2'>
            <p className=" col-span-3 text-gray-600">Description: {activity.attributes.description}</p>
            <button
              className='bg-p1 text-p2 w-[12rem] h-[4rem] rounded-md '
              onClick={() => {handleShowRegistration(activity.id);handleOpenPopup(selectedRegistrationId)}}
            >
                  Show registrations
            </button>    
            {/* {activity.attributes.media.data && (
              <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: (0.5 ), duration: 0.8 }}
                className='col-span-1 rounded-lg shadow-md justify-self-end p-2 bg-white'
                src={`${process.env.NEXT_PUBLIC_API_URL}` + activity.attributes.media.data.attributes.formats.thumbnail.url}
                >
              </motion.img>
              )} */}
          </div>
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
                {/* <button
                  onClick={() => {handleShowRegistration(activity.id);handleOpenPopup(selectedRegistrationId)}}
                >
                  Show registrations
                </button>                 */}
              </div>
            )}
            {/* Weekly Fields */}
            {activity.attributes.weeklyFields && activity.attributes.weeklyFields.length > 0 && (
              <div className='collapse collapse-open border border-gray-200 bg-p1/400'>
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
                        {/* <button
                          onClick={() => handleRegister(activity.id, '', weeklyField.id, weeklyField.estimatedHoursEarned, weeklyField.weekStartDate + ' - ' + weeklyField.weekEndDate)}
                          disabled={weeklyField.availableSeats <= 0}
                          className={`w-[6rem] ml-4 px-4 py-2 justify-self-end rounded-md col-span-1  ${
                            weeklyField.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-p2 text-black'
                          }`}
                        >
                          {weeklyField.availableSeats === 0 ? 'Full' : 'Register'}
                        </button> */}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Monthly Fields */}
            {activity.attributes.monthlyFields && activity.attributes.monthlyFields.length > 0 && (
              <div className='collapse  collapse-open border border-gray-200 bg-p1/400 rounded-md' >
                <input type="checkbox"/> 
                <div className='collapse-title  flex flex-row justify-between items-center rounded-none mb-2 bg-p1/20'>
                  <h3 className="text-lg font-semibold  py-0 mb-2 mt-2">Monthly slots</h3>
                  <BiExpandVertical/>
                </div>
                <div className='collapse-content'>
                  <ul className="list-disc pl-4">
                    {activity.attributes.monthlyFields
                      .filter((monthlyField) => new Date('01' + monthlyField.monthName) >= new Date(filterStartDate) && new Date('30' + monthlyField.monthName) <= new Date(filterEndDate))
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
                        {/* <button
                          onClick={() => handleRegister(activity.id, monthlyField.id, '', monthlyField.estimatedHoursEarned, monthlyField.monthName)}
                          disabled={monthlyField.availableSeats <= 0}
                          className={`w-[6rem] ml-4 px-4 py-2 justify-self-end rounded col-span-1 ${
                            monthlyField.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-p2 text-black'
                          }`}
                        >
                          {monthlyField.availableSeats === 0 ? 'Full' : 'Register'}
                        </button> */}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
      {isPopupVisible && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-p1/70'>
          {sortedRegistrations && (
            <div className='w-[60rem] mx-auto bg-white p-8 pt-12'>
              <table className='w-full text-left'>
                <thead>
                  <tr>
                    <th>Activity Name</th>
                    <th>Duration</th>
                    <th>Email</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRegistrations.map((registration, index) => (
                    <tr key={index}>
                      <td>{registration.attributes.activityId.data.attributes.name}</td>
                      <td>{registration.attributes.duration}</td>
                      <td>{registration.attributes.email.data.attributes.email}</td>
                      <td>{registration.attributes.email.data.attributes.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className='bg-p2 text-black m-8 px-4 py-2 rounded-md'
                onClick={() => handleClosePopup()}
              >
                Close
              </button>
            </div>
          )}         
        </div>
      )} 
    </div>
  );
};

export default ActivityList;
