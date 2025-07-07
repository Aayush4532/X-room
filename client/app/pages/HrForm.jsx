"use client";
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function CreateScheduleForm() {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { getToken, userId } = useAuth();

  const BACKEND_URL = process.env.NEXT_PUBLIC_SIGNAL_URL;

  const handleSlotChange = (index, value) => {
    const updated = [...slots];
    updated[index] = value;
    setSlots(updated);
  };

  const addSlot = () => setSlots([...slots, '']);
  const removeSlot = (idx) => setSlots(slots.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await getToken();

      const res = await fetch(`${BACKEND_URL}api/createSchedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-clerk-id': userId
        },
        body: JSON.stringify({ date, slots })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create schedule');

      setSuccess(`✅ Created Schedule: Room ${data.roomId}`);
      setDate('');
      setSlots(['']);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Create Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate Emails</label>
          {slots.map((slot, idx) => (
            <div key={idx} className="mt-2 flex items-center">
              <input
                type="email"
                placeholder="email@example.com"
                value={slot}
                onChange={e => handleSlotChange(idx, e.target.value)}
                required
                className="flex-grow border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => removeSlot(idx)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSlot}
            className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-md"
          >
            + Add Email
          </button>
        </div>

        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Schedule'}
        </button>
      </form>
    </div>
  );
}