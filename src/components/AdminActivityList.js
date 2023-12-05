// components/ActivityList.js
import { useState, useEffect } from 'react';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  const handleRegister = (activityId, fieldId) => {
    // Handle registration logic here
    console.log(`Registering for activity ${activityId} with field ${fieldId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities?populate=*`);
        const data = await response.json();
        setActivities(data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {activities.map((activity, index) => (
        <div key={activity.id} className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold">Activity: {activity.attributes.name}</h2>
          <p className="text-gray-600">Description: {activity.attributes.description}</p>

          <div className="mt-4">
            {/* Weekly Fields */}
            {activity.attributes.weeklyFields && activity.attributes.weeklyFields.length > 0 && (
              <div className='collapse  border border-gray-200 bg-p1/400'>
                <input type="checkbox"/>
                <div className='collapse-title collapse-plus bg-p1/20'>
                  <h3 className="text-lg font-semibold mb-2">Weekly slots</h3>
                </div>
                <div className='collapse-content'>
                  <ul className=" list-disc pl-4">
                    {activity.attributes.weeklyFields.map((weeklyField, index) => (
                      <li
                        key={weeklyField.id}
                        className={`flex items-center space-x-4 p-2 rounded shadow mb-2 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                        }`}
                      >
                        <span>{`Week: ${weeklyField.weekStartDate} - ${weeklyField.weekEndDate}`}</span>
                        <span>{`Seats: ${weeklyField.seats}`}</span>
                        <span>{`Available Seats: ${weeklyField.availableSeats}`}</span>
                        <button
                          onClick={() => handleRegister(activity.id, weeklyField.id)}
                          disabled={weeklyField.availableSeats === 0}
                          className={`ml-4 px-4 py-2 rounded ${
                            weeklyField.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
                          }`}
                        >
                          {weeklyField.availableSeats === 0 ? 'Full' : 'Register'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Monthly Fields */}
            {activity.attributes.monthlyFields && activity.attributes.monthlyFields.length > 0 && (
              <div className='collapse  border border-gray-200 bg-p1/400' >
                <input type="checkbox"/> 
                <div className='collapse-title collapse-plus bg-p1/20'>
                  <h3 className="text-lg font-semibold  py-0 mb-2 mt-2">Monthly slots</h3>
                </div>
                <div className='collapse-content'>
                  <ul className="list-disc pl-4">
                    {activity.attributes.monthlyFields.map((monthlyField, index) => (
                      <li
                        key={monthlyField.id}
                        className={`flex items-center space-x-4 p-2 rounded shadow mb-2 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                        }`}
                      >
                        <span>{`Month: ${monthlyField.monthName}`}</span>
                        <span>{`Seats: ${monthlyField.seats}`}</span>
                        <span>{`Available Seats: ${monthlyField.availableSeats}`}</span>
                        <button
                          onClick={() => handleRegister(activity.id, monthlyField.id)}
                          disabled={monthlyField.availableSeats === 0}
                          className={`ml-4 px-4 py-2 rounded ${
                            monthlyField.availableSeats === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
                          }`}
                        >
                          {monthlyField.availableSeats === 0 ? 'Full' : 'Register'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
