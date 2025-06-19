import React, { useEffect, useRef, useState, useCallback } from 'react'
import './insights.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faArrowDown, faArrowRight, faArrowUp, faBolt, faChartLine, faCheckCircle, faCheckDouble, faChevronDown, faExclamationCircle, faFire, faLightbulb, faPlus, faQuoteLeft, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';
import DateRangePicker from './DateRangePicker';

const productivityCircleRadius = 36;
const productivityScore = 0.85;

const stats = [
    {
        icon: faCheckCircle,
        title: "Tasks Completed",
        value: 42,
        change: "+12%",
        changeIcon: faArrowUp,
        changeClass: "text-green-500",
        sub: "vs. previous period",
    },
    {
        icon: faFire,
        title: "Current Streak",
        value: 7,
        sub: "Best: 14 days",
        changeClass: "text-orange-500",
        extra: "days"
    },
    {
        icon: faChartLine,
        title: "Daily Average",
        value: 5.3,
        changeClass: "text-blue-500",
        sub: "Completed per day",
        extra: "tasks"
    },
    {
        icon: faExclamationCircle,
        title: "Tasks Overdue",
        value: 3,
        change: "-25%",
        changeIcon: faArrowDown,
        changeClass: "text-red-500",
        sub: "vs. previous period",
    }
];

const achievements = [
    {
        icon: faFire,
        iconClass: "bg-purple-100 text-purple-600",
        title: "7-Day Streak",
        desc: "Complete tasks 7 days in a row",
        progress: null
    },
    {
        icon: faBolt,
        iconClass: "bg-blue-100 text-blue-600",
        title: "Early Bird",
        desc: "Complete 5 tasks before 10 AM",
        progress: null
    },
    {
        icon: faCheckDouble,
        iconClass: "bg-green-100 text-green-600",
        title: "Overachiever",
        desc: "Complete 10+ tasks in one day",
        progress: null
    },
    {
        icon: faStar,
        iconClass: "bg-gray-100 text-gray-400",
        title: "Perfect Week",
        desc: "Complete all planned tasks for a week",
        progress: { value: 60, text: "60% completed" }
    },
    {
        icon: faTrophy,
        iconClass: "bg-gray-100 text-gray-400",
        title: "Task Master",
        desc: "Complete 100 tasks total",
        progress: { value: 42, text: "42/100 tasks" }
    }
];

const goals = [
    {
        title: "Complete 50 work tasks this month",
        progress: 56,
        sub: "28/50 tasks completed",
    },
    {
        title: "Maintain a 14-day streak",
        progress: 50,
        sub: "7/14 days completed",
    },
    {
        title: "Reduce overdue tasks to zero",
        progress: 70,
        sub: "3 tasks remaining",
    }
];

const initialTimeChartData = {
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [5, 7, 4, 6, 8, 3, 9]
    },
    monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [24, 32, 28, 36]
    }
};

const initialCategoryChartData = {
    labels: ['Work', 'Personal', 'Health', 'Urgent'],
    data: [42, 28, 18, 12]
};

const hourlyChartData = {
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
    data: [1, 3, 5, 2, 4, 6, 3, 2, 1]
};

const Insights = () => {
    const [timePeriod, setTimePeriod] = useState('weekly');
    const [categoryChartType, setCategoryChartType] = useState('donut');

    const timeChartRef = useRef(null);
    const categoryChartRef = useRef(null);
    const hourlyChartRef = useRef(null);
    const productivityCircleRef = useRef(null);

    const chartInstances = useRef({});

    useEffect(() => {
        if (productivityCircleRef.current) {
            const circle = productivityCircleRef.current;
            const circumference = 2 * Math.PI * productivityCircleRadius;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference * (1 - productivityScore);
        }
    }, []);

    useEffect(() => {
        if (!timeChartRef.current) return;
        if (chartInstances.current.timeChart) {
            chartInstances.current.timeChart.destroy();
        }
        const ctx = timeChartRef.current.getContext('2d');
        chartInstances.current.timeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: initialTimeChartData[timePeriod].labels,
                datasets: [{
                    label: 'Tasks Completed',
                    data: initialTimeChartData[timePeriod].data,
                    borderColor: '#7738ea',
                    backgroundColor: 'rgba(119, 56, 234, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#7738ea',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            title: ctx => ctx[0].label,
                            label: ctx => `${ctx.parsed.y} tasks completed`
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 2, precision: 0 }
                    }
                }
            }
        });
        const chartRefCopy = chartInstances.current;
        return () => { if (chartRefCopy.timeChart) chartRefCopy.timeChart.destroy(); }
    }, [timePeriod]);

    useEffect(() => {
        if (!categoryChartRef.current) return;
        if (chartInstances.current.categoryChart) {
            chartInstances.current.categoryChart.destroy();
        }
        const ctx = categoryChartRef.current.getContext('2d');
        chartInstances.current.categoryChart = new Chart(ctx, {
            type: categoryChartType === 'donut' ? 'doughnut' : 'bar',
            data: {
                labels: initialCategoryChartData.labels,
                datasets: [{
                    data: initialCategoryChartData.data,
                    backgroundColor: ['#7738ea', '#3b82f6', '#10b981', '#ef4444'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: categoryChartType === 'donut' ? '70%' : 0,
                plugins: {
                    legend: {
                        display: categoryChartType === 'donut',
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            label: function (context) {
                                let value = context.parsed;
                                if (typeof value === 'object' && value !== null && 'y' in value) {
                                    value = value.y;
                                }
                                return `${value} tasks completed`;
                            }
                        }
                    }
                },
                scales: categoryChartType === 'bar' ? {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 10, precision: 0 }
                    }
                } : undefined
            }
        });
        const chartRefCopy = chartInstances.current;
        return () => { if (chartRefCopy.categoryChart) chartRefCopy.categoryChart.destroy(); }
    }, [categoryChartType]);

    useEffect(() => {
        if (!hourlyChartRef.current) return;
        if (chartInstances.current.hourlyChart) {
            chartInstances.current.hourlyChart.destroy();
        }
        const ctx = hourlyChartRef.current.getContext('2d');
        chartInstances.current.hourlyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: hourlyChartData.labels,
                datasets: [{
                    label: 'Tasks Completed',
                    data: hourlyChartData.data,
                    backgroundColor: function (context) {
                        const value = context.dataset.data[context.dataIndex];
                        const alpha = 0.2 + (value / 10) * 0.8;
                        return `rgba(119, 56, 234, ${alpha})`;
                    },
                    borderRadius: 4,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        callbacks: {
                            title: ctx => ctx[0].label,
                            label: ctx => `${ctx.parsed.y} tasks completed`
                        }
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 2, precision: 0 }
                    }
                }
            }
        });
        const chartRefCopy = chartInstances.current;
        return () => { if (chartRefCopy.hourlyChart) chartRefCopy.hourlyChart.destroy(); }
    }, []);

    const handleTimePeriodChange = useCallback((period) => setTimePeriod(period), []);
    const handleCategoryChartTypeChange = useCallback((type) => setCategoryChartType(type), []);

    return (
        <div className='insights-bg'>
            <div className='min-h-screen flex flex-col'>
                {/* Top Navigation Bar */}
                <header className='bg-white shadow-sm py-3 px-4 md:px-6'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer'>
                                <span className='text-gray-700 font-medium'>JD</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className='flex-grow p-4 md:p-6'>
                    <div className='max-w-7xl mx-auto'>
                        {/* Page Title and Date Range */}
                        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-800'>Insights</h1>
                                <p className='text-gray-600 mt-1'>Track your productivity and achievements</p>
                            </div>
                            <div className='mt-4 md:mt-0 flex items-center'>
                                <DateRangePicker></DateRangePicker>
                            </div>
                        </div>

                        <div className='quote-card p-4 rounded-lg mb-6 fade-in'>
                            <div className='flex items-start'>
                                <FontAwesomeIcon icon={faQuoteLeft} className='text-purple-500 text-xl mr-3 mt-1' />
                                <div>
                                    <p className='text-gray-700 italic'>"The key is not to prioritize what's on your schedule, but to schedule your priorities."</p>
                                    <p className='text-gray-500 text-sm mt-1'>- Stephen Covey</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className='stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                            {stats.map((stat, i) => {
                                let statBgClass = '';
                                if (stat.changeClass?.includes('green')) {
                                    statBgClass = 'bg-green-100';
                                } else if (stat.changeClass?.includes('red')) {
                                    statBgClass = 'bg-red-100';
                                } else if (stat.title === "Current Streak") {
                                    statBgClass = 'bg-orange-100';
                                } else if (stat.title === "Daily Average") {
                                    statBgClass = 'bg-blue-100';
                                }
                                return (
                                    <div className={`card stat-card p-5 fade-in fade-in-delay-${i + 1}`} key={stat.title}>
                                        <div className='icon-bg'>
                                            <FontAwesomeIcon icon={stat.icon} />
                                        </div>
                                        <div className='flex items-center justify-between mb-2'>
                                            <h3 className='text-gray-500 font-medium'>{stat.title}</h3>
                                            <div className={`w-8 h-8 rounded-full ${statBgClass} flex items-center justify-center`}>
                                                <FontAwesomeIcon icon={stat.icon} className={stat.changeClass ? stat.changeClass : ''} />
                                            </div>
                                        </div>
                                        <div className='flex items-end'>
                                            <span className='text-3xl font-bold text-gray-800'>{stat.value}</span>
                                            {stat.extra && <span className='text-sm ml-2 mb-1'>{stat.extra}</span>}
                                            {stat.change && (
                                                <span className={`${stat.changeClass} text-sm ml-2 mb-1 flex items-center`}>
                                                    <FontAwesomeIcon icon={stat.changeIcon} className='mr-1' />
                                                    <span>{stat.change.replace(/[-+]/, '')}</span>
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-gray-500 text-sm mt-1'>{stat.sub}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Charts Grid */}
                        <div className='charts-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                            <div className='card p-5 fade-in'>
                                <div className='flex items-center justify-between mb-4'>
                                    <h3 className='font-semibold text-gray-800'>Tasks Completed Over Time</h3>
                                    <div className='toggle-btn'>
                                        <span
                                            className={`toggle-option ${timePeriod === 'weekly' ? 'active' : ''}`}
                                            onClick={() => handleTimePeriodChange('weekly')}
                                        >Weekly</span>
                                        <span
                                            className={`toggle-option ${timePeriod === 'monthly' ? 'active' : ''}`}
                                            onClick={() => handleTimePeriodChange('monthly')}
                                        >Monthly</span>
                                    </div>
                                </div>
                                <div className='chart-container'>
                                    <canvas ref={timeChartRef}></canvas>
                                </div>
                            </div>

                            <div className='card p-5 fade-in'>
                                <div className='flex items-center justify-between mb-4'>
                                    <h3 className='font-semibold text-gray-800'>Task Category Breakdown</h3>
                                    <div className='toggle-btn'>
                                        <span
                                            className={`toggle-option ${categoryChartType === 'donut' ? 'active' : ''}`}
                                            onClick={() => handleCategoryChartTypeChange('donut')}
                                        >Donut</span>
                                        <span
                                            className={`toggle-option ${categoryChartType === 'bar' ? 'active' : ''}`}
                                            onClick={() => handleCategoryChartTypeChange('bar')}
                                        >Bar</span>
                                    </div>
                                </div>
                                <div className='chart-container'>
                                    <canvas ref={categoryChartRef}></canvas>
                                </div>
                            </div>

                            <div className='card p-5 fade-in'>
                                <h3 className='font-semibold text-gray-800 mb-4'>Hourly Productivity</h3>
                                <div className='chart-container'>
                                    <canvas ref={hourlyChartRef}></canvas>
                                </div>
                            </div>

                            <div className='card p-5 fade-in'>
                                <h3 className='font-semibold text-gray-800 mb-4'>Productivity Score</h3>
                                <div className='flex items-center justify-between mb-6'>
                                    <div className='circular-progress'>
                                        <svg width={80} height={80}>
                                            <circle className='bg' cx={40} cy={40} r={36}></circle>
                                            <circle className='progress' cx={40} cy={40} r={36} ref={productivityCircleRef}></circle>
                                        </svg>
                                        <div className='text'>85%</div>
                                    </div>
                                    <div className='ml-4 flex-grow'>
                                        <div className='flex justify-between mb-1'>
                                            <span className='text-sm text-gray-600'>Task Completion Rate</span>
                                            <span className='text-sm font-medium'>92%</span>
                                        </div>
                                        <div className='progress-bar mb-3'>
                                            <div className='progress-fill bg-green-500' style={{ width: "92%" }}></div>
                                        </div>
                                        <div className='flex justify-between mb-1'>
                                            <span className='text-sm text-gray-600'>On-time Completion</span>
                                            <span className='text-sm font-medium'>78%</span>
                                        </div>
                                        <div className='progress-bar mb-3'>
                                            <div className='progress-fill bg-yellow-500' style={{ width: "78%" }}></div>
                                        </div>
                                        <div className='flex justify-between mb-1'>
                                            <span className='text-sm text-gray-600'>Focus Score</span>
                                            <span className='text-sm font-medium'>85%</span>
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress-fill bg-purple-500' style={{ width: "85%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-gray-600 text-sm'>Your productivity score is calculated based on task completion rate, on-time performance and focus.</p>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className='mb-6'>
                            <h3 className='font-semibold text-gray-800 mb-4'>Achievements</h3>
                            <div className='overflow-x-auto pb-2'>
                                <div className='flex space-x-4' style={{ minWidth: "max-content" }}>
                                    {achievements.map((ach) => (
                                        <div className='achievement-card p-4 text-center fade-in' key={ach.title}>
                                            <div className={`achievement-icon ${ach.iconClass} mb-3 ${ach.progress ? '' : 'pulse'}`}>
                                                <FontAwesomeIcon icon={ach.icon} />
                                            </div>
                                            <h4 className={`font-medium ${ach.iconClass.includes('gray') ? 'text-gray-400' : 'text-gray-800'}`}>{ach.title}</h4>
                                            <p className={`text-sm mt-1 ${ach.iconClass.includes('gray') ? 'text-gray-400' : 'text-gray-500'}`}>{ach.desc}</p>
                                            {ach.progress && (
                                                <div className='mt-2'>
                                                    <div className='progress-bar'>
                                                        <div className='progress-fill bg-gray-300' style={{ width: `${ach.progress.value}%` }}></div>
                                                    </div>
                                                    <p className='text-gray-400 text-xs mt-1'>{ach.progress.text}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Goals Section */}
                        <div className='card p-5 mb-6 fade-in'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='font-semibold text-gray-800'>Goals Progress</h3>
                                <button className='text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center'>
                                    <FontAwesomeIcon icon={faPlus} className='mr-1' />
                                    <span>Add Goal</span>
                                </button>
                            </div>
                            <div className='space-y-4'>
                                {goals.map((goal) => (
                                    <div key={goal.title}>
                                        <div className='flex justify-between mb-1'>
                                            <div>
                                                <h4 className='font-medium text-gray-800'>{goal.title}</h4>
                                                <p className='text-gray-500 text-sm'>{goal.sub}</p>
                                            </div>
                                            <span className='text-purple-600 font-medium'>{goal.progress}%</span>
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress-fill gradient-bg' style={{ width: `${goal.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Productivity Tips */}
                        <div className='bg-white rounded-lg p-5 border border-gray-200 fade-in'>
                            <h3 className='font-semibold text-gray-800 mb-3'>Productivity Tip</h3>
                            <div className='flex'>
                                <div className='w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0'>
                                    <FontAwesomeIcon icon={faLightbulb} className='text-purple-600' />
                                </div>
                                <div>
                                    <p className='text-gray-700'>Try the <span className='font-medium'>Pomodoro Technique</span>: Work for 25 minutes, then take a 5-minute break.</p>
                                    <button className='text-purple-600 hover:text-purple-800 text-sm font-medium mt-2 flex items-center'>
                                        <span>Learn More</span>
                                        <FontAwesomeIcon icon={faArrowRight} className='ml-1 text-xs' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Insights