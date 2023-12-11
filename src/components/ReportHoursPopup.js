import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const ReportHoursPopup = ({ registrationId, onClose }) => {
  const {data: session} = useSession();

  const [reportedHours, setReportedHours] = useState('');

  const handleReportHours = async () => {
    console.log(registrationId);
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations/` + registrationId);
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/registrations/` + registrationId,
      // const response = await axios.put("http://localhost:3337/api/registrations/330",
      {
        data: {
          reportedHours: reportedHours,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error('Error reporting hours:', error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Report Hours</h2>
        <div className="mb-4 flex flex-row justify-center items-center">
          <label className="block text-gray-600">Please input the hours reported</label>
          <input
            type="number"
            value={reportedHours}
            onChange={(e) => setReportedHours(e.target.value)}
            className="w-[4rem] border rounded-md ml-4 p-2"
          />
        </div>
        <div className="flex justify-center space-x-5">
          <button
            className="bg-p1/80 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleReportHours}
          >
            Submit
          </button>
          <button
            className="bg-s1/80 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportHoursPopup;
