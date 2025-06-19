import React, { useEffect } from 'react'
import './insights.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowRight, faArrowUp, faBolt, faChartLine, faCheck, faCheckCircle, faCheckDouble, faChevronDown, faExclamationCircle, faFire, faLightbulb, faPlus, faQuoteLeft, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';


const Insights = () => {

    useEffect(() => {
      const productivityCircle = document.getElementById('productivityCircle');
      const circumference = 2 * Math.PI * 36;
      productivityCircle.style.strokeDasharray = circumference;
      productivityCircle.style.strokeDashoffset = circumference * (1 - 0.85);

      setTimeout(initCharts, 500);

      document.querySelectorAll('.toggle-btn .toggle-option').forEach(option => {
        option.addEventListener('click', () => {
            const parent = option.parentElement;
            parent.querySelectorAll('.toggle-option').forEach(opt => {
                opt.classList.remove('active');
            })
            option.classList.add('active');

            if(option.dataset.period) {
                updateTimeChart(option.datset.period);
            }

            if(option.dataset.chart) {
                updateCategoryChart(option.dataset.chart);
            }
        })
      })

    //   animateProgressBar();
    }, [])

    const initCharts = () =>  {
        const timeCtx = document.getElementById('tasksOverTimeChart').getContext('2d');
        const timeChart = new Chart(timeCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Tasks Completed',
                    data: [5, 7, 4, 6, 8, 3, 9],
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
                    legend: {
                        display: false
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
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `${context.parsed.y} tasks completed`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2,
                            precision: 0
                        }
                    }
                }
            }
        });

        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        const categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Work', 'Personal', 'Health', 'Urgent'],
                datasets: [{
                    data: [42, 28, 18, 12],
                    backgroundColor: [
                        '#7738ea',
                        '#3b82f6',
                        '#10b981',
                        '#ef4444'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
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
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${percentage}% (${value} tasks)`;
                            }
                        }
                    }
                }
            }
        });

        const hourlyCtx = document.getElementById('hourlyProductivityChart').getContext('2d');
        const hourlyChart = new Chart(hourlyCtx, {
            type: 'bar',
            data: {
                labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
                datasets: [{
                    label: 'Tasks Completed',
                    data: [1, 3, 5, 2, 4, 6, 3, 2, 1],
                    backgroundColor: function(context) {
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
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1f2937',
                        bodyColor: '#4b5563',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `${context.parsed.y} tasks completed`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2,
                            precision: 0
                        }
                    }
                }
            }
        })

        window.appCharts = {
            timeChart,
            categoryChart,
            hourlyChart
        };
    }

    const updateTimeChart = period => {
        const chart = window.appCharts.timeChart;

        if(period === 'weekly') {
            chart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            chart.data.datasets[0].data = [5, 7, 4, 6, 8, 3, 9];
        }
        else if(period === 'monthly') {
            chart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            chart.data.datasets[0].data = [24, 32, 28, 36];
        }

        chart.update();
    }

    const updateCategoryChart = type => {
        const chart = window.appCharts.categoryChart;

        if(type === 'donut') {
            chart.config.type = 'doughnut';
            chart.options.cutout = '70%';
        }
        else if(type === 'bar') {
            chart.config.type = 'bar';
            chart.options.cutout = 0;
            chart.options.scales = {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10,
                        precision: 0
                    }
                }
            }
        }

        chart.update();
    }

    // const animateProgressBar = () => {
    //     const progressBars = document.querySelectorAll('.progress-fill');

    //     progressBars.forEach(bar => {
    //         const width = bar.style.width;
    //         bar.style.width = '0';

    //         setTimeout(() => {
    //             bar.style.width = width;
    //         }, 300);
    //     });
    // }
    
  return (
    <div className='insights-bg'>
      <div className='min-h-screen flex flex-col'>
        {/* Top Navigation Bar */}
        <header className='bg-white shadow-sm py-3 px-4 md:px-6'>
            <div className='flex justify-between items-center'>
                {/* <nav className='hidden md:flex ite'></nav> */}
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
                        <div className='date-range-picker flex items-center'>
                            <FontAwesomeIcon icon={faCalendarAlt} className='text-gray-500 mr-2' />
                            <span>Last 30 days</span>
                            <FontAwesomeIcon icon={faChevronDown} className='text-gray-500 ml-2 text-xs' />
                        </div>
                    </div>
                </div>

                <div className='quote-card p-4 rounded-lg mb-6 fade-in'>
                    <div className='flex itesm-start'>
                        <FontAwesomeIcon icon={faQuoteLeft} className='text-purple-500 text-xl mr-3 mt-1' />
                        <div>
                            <p className='text-gray-700 italic'>"The key is not to prioritize what's on your schedule, but to schedule your priorities."</p>
                            <p className='text-gray-500 text-sm mt-1'>- Stephen Covey</p>
                        </div>
                    </div>
                </div>

                <div className='stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                    <div className='card stat-card p-5 fade-in fade-in-delay-1'>
                        <div className='icon-bg'>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <h3 className='text-gray-500 font-medium'>Tasks Completed</h3>
                            <div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCheck} className='text-green-500' />
                            </div>
                        </div>
                        <div className='flex items-end'>
                            <span className='text-3xl font-bold text-gray-800'>42</span>
                            <span className='text-green-500 text-sm ml-2 mb-1 flex items-center'>
                                <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
                                <span>12%</span>
                            </span>
                        </div>
                        <p className='text-gray-500 text-sm mt-1'>vs. previous period</p>
                    </div>

                    <div className='card stat-card p-5 fade-in fade-in-delay-2'>
                        <div className='icon-bg'>
                            <FontAwesomeIcon icon={faFire} />
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <h3 className='text-gray-500 font-medium'>Current Streak</h3>
                            <div className='w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faFire} className='text-orange-500' />
                            </div>
                        </div>
                        <div className='flex items-end'>
                            <span className='text-3xl font-bold text-gray-800'>7</span>
                            <span className='text-sm ml-2 mb-1'>days</span>
                        </div>
                        <p className='text-gray-500 text-sm mt-1'>Best: 14 days</p>
                    </div>

                    <div className='card stat-card p-5 fade-in fade-in-delay-3'>
                        <div className='icon-bg'>
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <h3 className='text-gray-500 font-medium'>Daily Average</h3>
                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faChartLine} className='text-blue-500' />
                            </div>
                        </div>
                        <div className='flex items-end'>
                            <span className='text-3xl font-bold text-gray-800'>5.3</span>
                            <span className='text-sm ml-2 mb-1'>tasks</span>
                        </div>
                        <p className='text-gray-500 text-sm mt-1'>Completed per day</p>
                    </div>

                    <div className='card stat-card p-5 fade-in fade-in-delay-4'>
                        <div className='icon-bg'>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                        </div>
                        <div className='flex items-center justify-between mb-2'>
                            <h3 className='text-gray-500 font-medium'>Tasks Overdue</h3>
                            <div className='w-8 h-8 rounded-full bg-red-100 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faExclamationCircle} className='text-red-500' />
                            </div>
                        </div>
                        <div className='flex items-end'>
                            <span className='text-3xl font-bold text-gray-800'>3</span>
                            <span className='text-red-500 text-sm ml-2 mb-1 flex items-center'>
                                <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
                                <span>25%</span>
                            </span>
                        </div>
                        <p className='text-gray-500 text-sm mt-1'>vs. previous period</p>
                    </div>
                </div>

                <div className='charts-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                    <div className='card p-5 fade-in'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='font-semibold text-gray-800'>Tasks Completed Over Time</h3>
                            <div className='toggle-btn'>
                                <span className='toggle-option active' data-period="weekly">Weekly</span>
                                <span className='toggle-option' data-period="monthly">Monthly</span>
                            </div>
                        </div>
                        <div className='chart-container'>
                            <canvas id='tasksOverTimeChart'></canvas>
                        </div>
                    </div>

                    <div className='card p-5 fade-in'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='font-semibold text-gray-800'>Task Category Breakdown</h3>
                            <div className='toggle-btn'>
                                <span className='toggle-option active' data-chart="donut">Donut</span>
                                <span className='toggle-option' data-chart="bar">Bar</span>
                            </div>
                        </div>
                        <div className='chart-container'>
                            <canvas id='categoryChart'></canvas>
                        </div>
                    </div>

                    <div className='card p-5 fade-in'>
                        <h3 className='font-semibold text-gray-800 mb-4'>Hourly Productivity</h3>
                        <div className='chart-container'>
                            <canvas id='hourlyProductivityChart'></canvas>
                        </div>
                    </div>

                    <div className='card p-5 fade-in'>
                        <h3 className='font-semibold text-gray-800 mb-4'>Productivity Score</h3>
                        <div className='flex items-center justify-between mb-6'>
                            <div className='circular-progress'>
                                <svg width={80} height={80}>
                                    <circle className='bg' cx={40} cy={40} r={36}></circle>
                                    <circle className='progress' cx={40} cy={40} r={36} id='productivityCircle'></circle>
                                </svg>
                                <div className='text'>85%</div>
                            </div>
                            <div className='ml-4 flex-grow'>
                                <div className='flex justify-between mb-1'>
                                    <span className='text-sm text-gray-600'>Task Completion Rate</span>
                                    <span className='text-sm font-medium'>92%</span>
                                </div>
                                <div className='progress-bar mb-3'>
                                    <div className='progress-fill bg-green-500' style={{"width": "92%"}}></div>
                                </div>

                                <div className='flex justify-between mb-1'>
                                    <span className='text-sm text-gray-600'>On-time Completion</span>
                                    <span className='text-sm font-medium'>78%</span>
                                </div>
                                <div className='progress-bar mb-3'>
                                    <div className='progress-fill bg-yellow-500' style={{width: "78%"}}></div>
                                </div>

                                <div className='flex justify-between mb-1'>
                                    <span className='text-sm text-gray-600'>Focus Score</span>
                                    <span className='text-sm font-medium'>85%</span>
                                </div>
                                <div className='progress-bar'>
                                    <div className='progress-fill bg-purple-500' style={{width: "85%"}}></div>
                                </div>
                            </div>
                        </div>
                        <p className='text-gray-600 text-sm'>Your productivity scre is calculated based on task completion rate, on-time performance and focus.</p>
                    </div>
                </div>

                <div className='mb-6'>
                    <h3 className='font-semibold text-gray-800 mb-4'>Achievements</h3>
                    <div className='overflow-x-auto pb-2'>
                        <div className='flex space-x-4' style={{minWidth: "max-content"}}>
                            {/* Achievement 1 */}
                            <div className='achievement-card p-4 text-center fade-in'>
                                <div className='achievement-icon bg-purple-100 text-purple-600 mb-3 pulse'>
                                    <FontAwesomeIcon icon={faFire} />
                                </div>
                                <h4 className='font-medium text-gray-800'>7-Day Streak</h4>
                                <p className='text-gray-500 text-sm mt-1'>Complete tasks 7 days in a row</p>
                            </div>

                            {/* Achievement 2 */}
                            <div className='achievement-card p-4 text-center fade-in'>
                                <div className='achievement-icon bg-blue-100 text-blue-600 mb-3 pulse'>
                                    <FontAwesomeIcon icon={faBolt} />
                                </div>
                                <h4 className='font-medium text-gray-800'>Early Bird</h4>
                                <p className='text-gray-500 text-sm mt-1'>Complete 5 tasks before 10 AM</p>
                            </div>

                            {/* Achievement 3 */}
                            <div className='achievement-card p-4 text-center fade-in'>
                                <div className='achievement-icon bg-green-100 text-green-600 mb-3 pulse'>
                                    <FontAwesomeIcon icon={faCheckDouble} />
                                </div>
                                <h4 className='font-medium text-gray-800'>Overachiever</h4>
                                <p className='text-gray-500 text-sm mt-1'>Complete 10+ tasks in one day</p>
                            </div>

                            {/* Achievement 4 */}
                            <div className='achievement-card p-4 text-center fade-in'>
                                <div className='achievement-icon bg-gray-100 text-gray-400 mb-3'>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <h4 className='font-medium text-gray-400'>Perfect Week</h4>
                                <p className='text-gray-400 text-sm mt-1'>Complete all planned tasks for a week</p>
                                <div className='mt-2'>
                                    <div className='progress-bar'>
                                        <div className='progress-fill bg-gray-300' style={{width: "60%"}}></div>
                                    </div>
                                    <p className='text-gray-400 text-xs mt-1'>60% completed</p>
                                </div>
                            </div>

                            {/* Achievement 5 */}
                            <div className='achievement-card p-4 text-center fade-in'>
                                <div className='achievement-icon bg-gray-100 text-gray-400 mb-3'>
                                    <FontAwesomeIcon icon={faTrophy} />
                                </div>
                                <h4 className='font-medium text-gray-400'>Task Master</h4>
                                <p className='text-gray-400 text-sm mt-1'>Complete 100 tasks total</p>
                                <div className='mt-2'>
                                    <div className='progress-bar'>
                                        <div className='progress-fill bg-gray-300' style={{width: "42%"}}></div>
                                    </div>
                                    <p className='text-gray-400 text-xs mt-1'>42/100 tasks</p>
                                </div>
                            </div>
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
                        {/* Goal 1 */}
                        <div>
                            <div className='flex justify-between mb-1'>
                                <div>
                                    <h4 className='font-medium text-gray-800'>Complete 50 work tasks this month</h4>
                                    <p className='text-gray-500 text-sm'>28/50 tasks completed</p>
                                </div>
                                <span className='text-purple-600 font-medium'>56%</span>
                            </div>
                            <div className='progress-bar'>
                                <div className='progress-fill gradient-bg' style={{width: "56%"}}></div>
                            </div>
                        </div>

                        {/* Goal 2 */}
                        <div>
                            <div className='flex justify-between mb-1'>
                                <div>
                                    <h4 className='font-medium text-gray-800'>Maintain a 14-day streak</h4>
                                    <p className='text-gray-500 text-sm'>7/14 days completed</p>
                                </div>
                                <span className='text-purple-600 font-medium'>50%</span>
                            </div>
                            <div className='progress-bar'>
                                <div className='progress-fill gradient-bg' style={{width: "50%"}}></div>
                            </div>
                        </div>

                        {/* Goal 3 */}
                        <div>
                            <div className='flex justify-between mb-1'>
                                <div>
                                    <h4 className='font-medium text-gray-800'>Reduce overdue tasks to zero</h4>
                                    <p className='text-gray-500 text-sm'>3 tasks remaining</p>
                                </div>
                                <span className='text-purple-600 font-medium'>70%</span>
                            </div>
                            <div className='progress-bar'>
                                <div className='progress-fill gradient-bg' style={{width: "70%"}}></div>
                            </div>
                        </div>
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
  )
}

export default Insights