import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, Clock, MapPin, Bus, Train, User, Save, Share } from 'lucide-react';

const PickupPlanner = () => {
  // Define a more colorful design palette
  const colors = {
    morning: {
      bg: 'bg-gradient-to-r from-orange-100 to-yellow-100',
      header: 'bg-orange-200 text-orange-800',
      accent: 'bg-orange-500',
      highlight: 'text-orange-600',
      border: 'border-orange-300'
    },
    afternoon: {
      bg: 'bg-gradient-to-r from-sky-100 to-blue-100',
      header: 'bg-sky-200 text-blue-800',
      accent: 'bg-sky-500',
      highlight: 'text-blue-600',
      border: 'border-sky-300'
    },
    today: {
      bg: 'bg-gradient-to-r from-purple-100 to-pink-100',
      header: 'bg-purple-200 text-purple-800',
      accent: 'bg-purple-500',
      highlight: 'text-purple-700',
      border: 'border-purple-300'
    },
    buttons: {
      save: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      calendar: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
    }
  };
  
  // Sample data structure for two children
  const [children, setChildren] = useState([
    { id: 1, name: 'Alex', school: 'SMC' },
    { id: 2, name: 'Kate', school: 'ESMS' }
  ]);
  
  // Days of the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Pickup options
  const pickupOptions = [
    { id: 'bus', label: 'School Bus', icon: <Bus className="mr-1" size={16} /> },
    { id: 'train', label: 'Train', icon: <Train className="mr-1" size={16} /> },
    { id: 'club', label: 'After-School Club', icon: <User className="mr-1" size={16} /> }
  ];
  
  // Initial schedule setup (would normally be loaded from storage)
  const [morningSchedule, setMorningSchedule] = useState({
    1: { // Child 1 (Alex)
      Monday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Tuesday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Wednesday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Thursday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Friday: { type: 'bus', time: '08:00', location: 'Corner of Main St' }
    },
    2: { // Child 2 (Kate)
      Monday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Tuesday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Wednesday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Thursday: { type: 'bus', time: '08:00', location: 'Corner of Main St' },
      Friday: { type: 'bus', time: '08:00', location: 'Corner of Main St' }
    }
  });
  
  const [afternoonSchedule, setAfternoonSchedule] = useState({
    1: { // Child 1 (Alex)
      Monday: { type: 'bus', time: '15:30', location: 'Corner of Main St' },
      Tuesday: { type: 'club', time: '17:00', location: 'School Gym' },
      Wednesday: { type: 'bus', time: '15:30', location: 'Corner of Main St' },
      Thursday: { type: 'train', time: '16:15', location: 'Central Station' },
      Friday: { type: 'bus', time: '15:30', location: 'Corner of Main St' }
    },
    2: { // Child 2 (Kate)
      Monday: { type: 'bus', time: '15:45', location: 'Corner of Main St' },
      Tuesday: { type: 'train', time: '16:30', location: 'Central Station' },
      Wednesday: { type: 'bus', time: '15:45', location: 'Corner of Main St' },
      Thursday: { type: 'club', time: '18:00', location: 'School Library' },
      Friday: { type: 'bus', time: '15:45', location: 'Corner of Main St' }
    }
  });
  
  // State for today's reminders
  const [todayMorningReminders, setTodayMorningReminders] = useState([]);
  const [todayAfternoonReminders, setTodayAfternoonReminders] = useState([]);
  
  // Function to get today's reminders
  useEffect(() => {
    const today = new Date().getDay();
    const dayName = days[today - 1]; // Adjust for zero-indexed array
    
    if (dayName) {
      const morningRemindersForToday = [];
      const afternoonRemindersForToday = [];
      
      children.forEach(child => {
        if (morningSchedule[child.id] && morningSchedule[child.id][dayName]) {
          morningRemindersForToday.push({
            child: child.name,
            school: child.school,
            ...morningSchedule[child.id][dayName]
          });
        }
        
        if (afternoonSchedule[child.id] && afternoonSchedule[child.id][dayName]) {
          afternoonRemindersForToday.push({
            child: child.name,
            school: child.school,
            ...afternoonSchedule[child.id][dayName]
          });
        }
      });
      
      setTodayMorningReminders(morningRemindersForToday);
      setTodayAfternoonReminders(afternoonRemindersForToday);
    }
  }, []);
  
  // Function to update the schedule
  const updateMorningSchedule = (childId, day, field, value) => {
    setMorningSchedule(prevSchedule => ({
      ...prevSchedule,
      [childId]: {
        ...prevSchedule[childId],
        [day]: {
          ...prevSchedule[childId][day],
          [field]: value
        }
      }
    }));
  };
  
  const updateAfternoonSchedule = (childId, day, field, value) => {
    setAfternoonSchedule(prevSchedule => ({
      ...prevSchedule,
      [childId]: {
        ...prevSchedule[childId],
        [day]: {
          ...prevSchedule[childId][day],
          [field]: value
        }
      }
    }));
  };
  
  // Dummy function for demo - would actually sync with calendar
  const syncWithCalendar = () => {
    alert("Schedule would sync with iCal here");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 bg-white p-3 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">School Pickup Planner</h1>
        <div className="flex space-x-2">
          <button 
            className={`${colors.buttons.calendar} text-white px-4 py-2 rounded-full shadow-md flex items-center transform hover:scale-105 transition-transform`} 
            onClick={syncWithCalendar}
          >
            <Calendar className="mr-2" size={16} />
            Sync to iCal
          </button>
          <button className={`${colors.buttons.save} text-white px-4 py-2 rounded-full shadow-md flex items-center transform hover:scale-105 transition-transform`}>
            <Save className="mr-2" size={16} />
            Save
          </button>
        </div>
      </div>
      
      {/* Today's Reminders Section */}
      <div className={`${colors.today.bg} border ${colors.today.border} rounded-xl p-4 mb-6 shadow-md`}>
        <div className="flex items-center mb-4">
          <AlertCircle className={`${colors.today.highlight} mr-2`} size={20} />
          <h2 className="text-lg font-semibold text-purple-800">Today's Schedule</h2>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium bg-orange-200 text-orange-800 px-3 py-1 rounded-full inline-block mb-3">Morning Drop-offs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayMorningReminders.map((reminder, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-orange-200 transform hover:scale-105 transition-transform">
                <div className="font-medium text-orange-800 border-b border-orange-100 pb-1 mb-1">{reminder.child} - {reminder.school}</div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock size={14} className="mr-1 text-orange-500" /> {reminder.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1 text-orange-500" /> {reminder.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-orange-500">
                    {pickupOptions.find(opt => opt.id === reminder.type)?.icon}
                  </span>
                  {pickupOptions.find(opt => opt.id === reminder.type)?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium bg-blue-200 text-blue-800 px-3 py-1 rounded-full inline-block mb-3">Afternoon Pickups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayAfternoonReminders.map((reminder, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-blue-200 transform hover:scale-105 transition-transform">
                <div className="font-medium text-blue-800 border-b border-blue-100 pb-1 mb-1">{reminder.child} - {reminder.school}</div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock size={14} className="mr-1 text-blue-500" /> {reminder.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1 text-blue-500" /> {reminder.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-blue-500">
                    {pickupOptions.find(opt => opt.id === reminder.type)?.icon}
                  </span>
                  {pickupOptions.find(opt => opt.id === reminder.type)?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Weekly Schedule Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Weekly Schedule</h2>
        
        {/* Morning Schedule */}
        <div className="mb-8">
          <h3 className="font-medium bg-orange-200 text-orange-800 px-3 py-1 rounded-full inline-block mb-3">Morning Drop-offs</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 bg-orange-100 rounded-tl-lg text-orange-800">Child</th>
                  {days.map((day, idx) => (
                    <th key={day} className={`p-2 bg-orange-100 text-orange-800 ${idx === days.length-1 ? 'rounded-tr-lg' : ''}`}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {children.map((child, childIdx) => (
                  <tr key={`morning-${child.id}`}>
                    <td className={`p-2 font-medium border border-orange-200 ${childIdx === children.length-1 ? 'rounded-bl-lg' : ''}`}>{child.name}</td>
                    
                    {days.map((day, dayIdx) => (
                      <td 
                        key={`morning-${day}`} 
                        className={`p-2 border border-orange-200 ${childIdx === children.length-1 && dayIdx === days.length-1 ? 'rounded-br-lg' : ''}`}
                      >
                        <div className="flex flex-col space-y-1">
                          <select 
                            value={morningSchedule[child.id][day].type}
                            onChange={(e) => updateMorningSchedule(child.id, day, 'type', e.target.value)}
                            className="text-sm p-1 border border-orange-200 rounded bg-orange-50 focus:ring-orange-300 focus:border-orange-300"
                          >
                            {pickupOptions.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          
                          <input 
                            type="time" 
                            value={morningSchedule[child.id][day].time}
                            onChange={(e) => updateMorningSchedule(child.id, day, 'time', e.target.value)}
                            className="text-sm p-1 border border-orange-200 rounded bg-orange-50 focus:ring-orange-300 focus:border-orange-300"
                          />
                          
                          <input 
                            type="text" 
                            placeholder="Location"
                            value={morningSchedule[child.id][day].location}
                            onChange={(e) => updateMorningSchedule(child.id, day, 'location', e.target.value)}
                            className="text-sm p-1 border border-orange-200 rounded bg-orange-50 focus:ring-orange-300 focus:border-orange-300"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Afternoon Schedule */}
        <div>
          <h3 className="font-medium bg-blue-200 text-blue-800 px-3 py-1 rounded-full inline-block mb-3">Afternoon Pickups</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 bg-blue-100 rounded-tl-lg text-blue-800">Child</th>
                  {days.map((day, idx) => (
                    <th key={day} className={`p-2 bg-blue-100 text-blue-800 ${idx === days.length-1 ? 'rounded-tr-lg' : ''}`}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {children.map((child, childIdx) => (
                  <tr key={`afternoon-${child.id}`}>
                    <td className={`p-2 font-medium border border-blue-200 ${childIdx === children.length-1 ? 'rounded-bl-lg' : ''}`}>{child.name}</td>
                    
                    {days.map((day, dayIdx) => (
                      <td 
                        key={`afternoon-${day}`} 
                        className={`p-2 border border-blue-200 ${childIdx === children.length-1 && dayIdx === days.length-1 ? 'rounded-br-lg' : ''}`}
                      >
                        <div className="flex flex-col space-y-1">
                          <select 
                            value={afternoonSchedule[child.id][day].type}
                            onChange={(e) => updateAfternoonSchedule(child.id, day, 'type', e.target.value)}
                            className="text-sm p-1 border border-blue-200 rounded bg-blue-50 focus:ring-blue-300 focus:border-blue-300"
                          >
                            {pickupOptions.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          
                          <input 
                            type="time" 
                            value={afternoonSchedule[child.id][day].time}
                            onChange={(e) => updateAfternoonSchedule(child.id, day, 'time', e.target.value)}
                            className="text-sm p-1 border border-blue-200 rounded bg-blue-50 focus:ring-blue-300 focus:border-blue-300"
                          />
                          
                          <input 
                            type="text" 
                            placeholder="Location"
                            value={afternoonSchedule[child.id][day].location}
                            onChange={(e) => updateAfternoonSchedule(child.id, day, 'location', e.target.value)}
                            className="text-sm p-1 border border-blue-200 rounded bg-blue-50 focus:ring-blue-300 focus:border-blue-300"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Settings Section (simplified) */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Notification Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-purple-200 rounded-xl p-4 bg-gradient-to-r from-purple-50 to-pink-50 transform hover:scale-105 transition-transform">
            <h3 className="font-medium text-purple-800 mb-3">Reminder Timing</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="remind30" className="mr-2 h-4 w-4 accent-purple-500" defaultChecked />
              <label htmlFor="remind30" className="text-gray-700">30 minutes before pickup</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="remind60" className="mr-2 h-4 w-4 accent-purple-500" defaultChecked />
              <label htmlFor="remind60" className="text-gray-700">Morning summary (8:00 AM)</label>
            </div>
          </div>
          
          <div className="border border-purple-200 rounded-xl p-4 bg-gradient-to-r from-purple-50 to-pink-50 transform hover:scale-105 transition-transform">
            <h3 className="font-medium text-purple-800 mb-3">Calendar Sync</h3>
            <div className="flex items-center mb-2">
              <input type="checkbox" id="synciCal" className="mr-2 h-4 w-4 accent-purple-500" defaultChecked />
              <label htmlFor="synciCal" className="text-gray-700">Sync with iCal</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="syncGoogle" className="mr-2 h-4 w-4 accent-purple-500" />
              <label htmlFor="syncGoogle" className="text-gray-700">Sync with Google Calendar</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupPlanner;