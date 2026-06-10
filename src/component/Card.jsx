// import React, { useEffect, useState } from "react";

// function Card({ students }) {
//   const [count, setCount] = useState(0);

//   // 🎯 Total Students
//   const totalStudents = students.length;

//   // 🎯 Unique Courses
//   const totalCourses = new Set(students.map(s => s.course)).size;

//   // 🎯 Active Users (example logic: all users = active)
//   const activeUsers = students.filter(s => s.active === true).length;

//   // 🔥 Animated Counter
//   useEffect(() => {
//     let start = 0;
//     const interval = setInterval(() => {
//       start += 1;
//       if (start >= totalStudents) {
//         start = totalStudents;
//         clearInterval(interval);
//       }
//       setCount(start);
//     }, 30);

//     return () => clearInterval(interval);
//   }, [totalStudents]);

//   return (
//     <div className="grid grid-cols-3 gap-4 mb-6">

//       {/* Total Students */}
//       <div className="bg-white/5 p-4 rounded-xl backdrop-blur-lg border border-white/10">
//         <h2 className="text-gray-400">Total Students</h2>
//         <p className="text-2xl font-bold text-white">{count}</p>
//       </div>

//       {/* Courses */}
//       <div className="bg-white/5 p-4 rounded-xl backdrop-blur-lg border border-white/10">
//         <h2 className="text-gray-400">Courses</h2>
//         <p className="text-2xl font-bold text-blue-400">{totalCourses}</p>
//       </div>

//       {/* Active */}
//       <div className="bg-white/5 p-4 rounded-xl backdrop-blur-lg border border-white/10">
//         <h2 className="text-gray-400">Active</h2>
//         <p className="text-2xl font-bold text-green-400">{activeUsers}</p>
//       </div>

//     </div>
//   );
// }

// export default Card;



import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Users, BookOpen, Activity } from "lucide-react";

function Card({ students, selectedCourse}) {
    const [count, setCount] = useState(0);

    const totalStudents = students.length;
    const totalCourses = new Set(students.map(s => s.course)).size;
    const activeUsers = students.length;

    // 🔥 Smooth Counter Animation
    useEffect(() => {
        let start = 0;
        const duration = 500;
        const stepTime = 20;
        const increment = totalStudents / (duration / stepTime);

        const timer = setInterval(() => {
            start += increment;
            if (start >= totalStudents) {
                start = totalStudents;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, stepTime);

        return () => clearInterval(timer);
    }, [totalStudents]);

    // 📊 Dummy chart data
    const courseDataMap = students.reduce((acc, s) => {
        acc[s.course] = (acc[s.course] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(courseDataMap).map((course) => ({
        name: course,
        value: courseDataMap[course]
    }));

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Total Students */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 backdrop-blur-xl shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-gray-300">Total Students</h2>
                    <Users className="text-indigo-400" size={22} />
                </div>
                <p className="text-3xl font-bold text-white mb-2">{count}</p>

                <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Courses */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-xl shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-gray-300">Courses</h2>
                    <BookOpen className="text-blue-400" size={22} />
                </div>
                <p className="text-3xl font-bold text-blue-400 mb-2">{totalCourses}</p>

                <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Active */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-xl shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-gray-300">Active</h2>
                    <Activity className="text-green-400" size={22} />
                </div>
                <p className="text-3xl font-bold text-green-400 mb-2">{activeUsers}</p>

                <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 backdrop-blur-xl shadow-lg">

                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-gray-300">Total Students</h2>
                    <Users className="text-indigo-400" size={22} />
                </div>
                <p className="text-xs mb-2">
                    {selectedCourse ? (
                        <span className="text-purple-400">Filtered: {selectedCourse}</span>
                    ) : (
                        <span className="text-gray-400">All Courses</span>
                    )}
                </p>

                <p className="text-3xl font-bold text-white mb-2">{count}</p>

            </div> */}

        </div>
    );
}

export default Card;