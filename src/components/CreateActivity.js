// EventForm.js
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import { GiCancel } from "react-icons/gi";

const EventForm = ({ setPage }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);  
  const [formData, setFormData] = useState({
    activityName: '',
    description: '',
    seats: '10',
    estimatedHoursEarned: '10',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '09:00:00',
    endTime: '17:00:00',
    repeat: 'Please-choose',
  });
  const [weeklyFields, setWeeklyFields] = useState([]);
  const [monthlyFields, setMonthlyFields] = useState([]);

  const handleSubmit = async (e) => {
    const form = document.querySelector('form');
    if (!form.checkValidity()) {
      alert('Please fill out all fields');
    } else {
      e.preventDefault();
    }

    const postData = {
      "data": {
        name: formData.activityName,
        description: formData.description,
        repeat: formData.repeat,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        seats: formData.seats,
        availableSeats: formData.seats,
        estimatedHoursEarned: formData.estimatedHoursEarned,
        weeklyFields: weeklyFields,
        monthlyFields: monthlyFields,
      }
    }
    // const postData1 = { "data": {
    //   "name": "activity2",
    //   "description": "activitydesc",
    //   "repeat": "One-time",
    //   "startDate": "2023-12-01",
    //   "endDate": "2023-12-28",
    //   "startTime": "00:30:00",
    //   "endTime": "01:00:00",
    //   "seats": "10",
    //   "availableSeats": "10",
    //   "estimatedHoursEarned": "10"
    //     }
    //   }
    // onClose();
    // console.log(formData);
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, postData, {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setTimeout(() => { 
        setIsLoading(false);
        // setPage('AdminActivityList');
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleRepeatChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      repeat: value,
    }));

    if (value === 'Weekly') {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weeks = [];

      while (start <= end) {
        const weekStartDate = new Date(start);
        const weekEndDate = new Date(start);
        weekEndDate.setDate(weekEndDate.getDate() + 6);

        weeks.push({
          weekStartDate: weekStartDate.toISOString().split('T')[0],
          weekEndDate: weekEndDate.toISOString().split('T')[0],
          seats: formData.seats,
          availableSeats: formData.seats,
        });

        start.setDate(start.getDate() + 7);
      }

      setWeeklyFields(weeks);
    } else {
      setWeeklyFields([]);
    }

    if (value === 'Monthly') {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const months = [];

      while (start <= end) {
        const monthName = start.toLocaleString('default', { month: 'long' }) + ' ' + start.getFullYear();
        months.push({
          monthName,
          seats: formData.seats,
          availableSeats: formData.seats,
        });
        start.setMonth(start.getMonth() + 1);
      }

      setMonthlyFields(months);
    } else {
      setMonthlyFields([]);
    }
  };

  const calculateNumberOfMonths = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffInMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;
    return diffInMonths;
  };

  return (
  <div className=" bg-p1 bg-opacity-50 w-full mx-auto flex justify-center items-center">
    <form className="mx-auto mt-8 bg-white p-8 " onSubmit={(e)=>handleSubmit(e)}>
      <div className="grid grid-cols-2 gap-4">
        <div className='col-span-2'>
          <label htmlFor="activityName">Activity Name</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="text"
            id="activityName"
            name="activityName"
            value={formData.activityName}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                activityName: e.target.value,
              }))
            }
          />
        </div>
        <div className='col-span-2'>
          <label htmlFor="description">Description</label>
          <textarea
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="text"
            id="description"
            name="description"
            value={formData.description}
            rows={6}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="seats">Seat (Number)</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                seats: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="estimatedHoursEarned">Estimated Hours Earned</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="number"
            id="estimatedHoursEarned"
            name="estimatedHoursEarned"
            value={formData.estimatedHoursEarned}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                estimatedHoursEarned: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                startDate: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  endDate: e.target.value,
                }))
                handleRepeatChange(formData.repeat)
              }
            }
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                startTime: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            required
            className='border border-gray-300 rounded-md p-2 w-full'
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                endTime: e.target.value,
              }))
            }
          />
        </div>
        <div className='col-span-2 my-8 flex flex-row justify-between items-center'>
          <label htmlFor="repeat" className='pr-8'>Timeframe</label>
          <select
            className='border border-gray-300 rounded-md p-2 w-full'
            required
            id="repeat"
            name="repeat"
            value={formData.repeat}
            onChange={(e) => handleRepeatChange(e.target.value)}
          >
            <option value="Please-choose">Please choose</option>
            <option value="One-time">One-time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </div>

      {formData.repeat === 'One-time' && (
        <div>
          {/* Render input fields for "One-time" */}
          {/* ... Your HTML for "One-time" fields */}
        </div>
      )}

      {formData.repeat === 'Weekly' && (
        <div className='grid grid-cols-2 gap-4 bg-p1/10 p-4'>
          {weeklyFields.map((week, index) => (
            <div key={index} className='col-span-2'>
              <div>
                <p className='text-xl font-semibold'>Week {index + 1}</p>
                <p>{week.weekStartDate} - {week.weekEndDate}</p>
              </div>
                <div className='flex flex-row justify-between'>
                  <label htmlFor={`seats_${index}`}>Seats (Number)</label>
                  <div className='flex flex-row justify-end items-center'>
                    <input
                      className='border border-gray-300 rounded-md p-2 w-[4rem] mr-4 text-center'
                      type="number"
                      id={`seats_${index}`}
                      name={`seats_${index}`}
                      value={week.seats}
                      onChange={(e) => setWeeklyFields((prevData) => {
                        const newData = [...prevData];
                        newData[index].seats = e.target.value;
                        newData[index].availableSeats = e.target.value;
                        return newData;
                      })}
                      />
                    <GiCancel className='text-red-500 cursor-pointer' 
                      onClick={() => setWeeklyFields((prevWeeklyFields) => prevWeeklyFields.filter((_, findex) => findex !== index))} 
                    />
                  </div>
                </div>
              {/* <div className='flex flex-row justify-between'>
                <label htmlFor={`availableSeats_${index}`}>
                  Available Seats
                </label>
                <input
                  type="number"
                  id={`availableSeats_${index}`}
                  name={`availableSeats_${index}`}
                  value={week.availableSeats}
                  readOnly
                />
              </div> */}
            </div>
          ))}
        </div>
      )}

      {formData.repeat === 'Monthly' && (
        <div className='grid grid-cols-2 gap-4 bg-p1/10 p-4'>
          {monthlyFields.map((month, index) => (
            <div key={index} className='col-span-2'>
              <div>{month.monthName}</div>
              <div className='flex flex-row justify-between'>
                <label htmlFor={`seats_${index}`}>Seats (Number)</label>
                <div className='flex flex-row justify-end items-center'>
                  <input
                    className='border border-gray-300 rounded-md p-2 w-[4rem] mr-4 text-center'
                    type="number"
                    id={`seats_${index}`}
                    name={`seats_${index}`}
                    value={month.seats}
                    onChange={(e) => setMonthlyFields((prevData) => {
                      const newData = [...prevData];
                      newData[index].seats = e.target.value;
                      newData[index].availableSeats = e.target.value;
                      return newData;
                    })}
                  />
                  <GiCancel className='text-red-500 cursor-pointer' 
                    onClick={() => setMonthlyFields((prevMonthlyFields) => prevMonthlyFields.filter((_, findex) => findex !== index))}
                  />
                </div>
              </div>
              {/* <div className='flex flex-row justify-between'>
                <label htmlFor={`availableSeats_${index}`}>
                  Available Seats
                </label>
                <input
                  type="number"
                  id={`availableSeats_${index}`}
                  name={`availableSeats_${index}`}
                  value={month.availableSeats}
                  readOnly
                />
              </div> */}
            </div>
          ))}
        </div>
      )}
      { formData.repeat != 'Please-choose' && (
        <div className='flex flex-col justify-center pt-8'>
          <button className="bg-p2 text-black px-4 py-2 rounded"  >Create Activity</button>
        </div>
      )

      }
      {/* <div className='flex flex-col justify-center'>
        <input type='submit' className="bg-blue-500 text-white px-4 py-2 rounded" value="Create Activity"/>
      </div> */}

      {formData.repeat === 'Monthly' && (
        <div>
          <p>Number of Months: {calculateNumberOfMonths()}</p>
        </div>
      )}
    </form>
    {isLoading &&<Spinner/>}
  </div>
  );
};

export default EventForm;
