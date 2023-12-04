'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, BarChart, Bar } from 'recharts';


const rangeData = [
    {
        "day": "05/01",
        "revenue": 600
    },
    {
        "day": "05/02",
        "revenue": 700

    },
    {
        "day": "05/03",
        "revenue": 120

    },
    {
        "day": "05/04",
        "revenue": 150

    },
    {
        "day": "04/08",
        "revenue": 120

    },
    {
        "day": "04/09",
        "revenue": 140
    },
    {
        "day": "04/10",
        "revenue": 300

    },
    {
        "day": "04/11",
        "revenue": 344

    },
    {
        "day": "04/12",
        "revenue": 211

    }, {
        "day": "04/13",
        "revenue": 244
    },
    {
        "day": "04/14",
        "revenue": 151

    },
    {
        "day": "04/15",
        "revenue": 100

    },
    {
        "day": "04/16",
        "revenue": 321

    },
    {
        "day": "04/17",
        "revenue": 400

    },
    {
        "day": "04/18",
        "revenue": 300
    },
    {
        "day": "04/19",
        "revenue": 321

    },
    {
        "day": "04/20",
        "revenue": 245

    },
    {
        "day": "04/21",
        "revenue": 80

    }, {
        "day": "04/22",
        "revenue": 138
    },
    {
        "day": "04/23",
        "revenue": 100

    },
    {
        "day": "04/24",
        "revenue": 100

    },
    {
        "day": "04/25",
        "revenue": 200

    },
    {
        "day": "04/26",
        "revenue": 140

    },
    {
        "day": "04/27",
        "revenue": 100
    },
    {
        "day": "04/28",
        "revenue": 140

    },
    {
        "day": "04/29",
        "revenue": 150

    },
    {
        "day": "04/30",
        "revenue": 210

    }, {
        "day": "04/31",
        "revenue": 233
    },
    {
        "day": "05/01",
        "revenue": 145

    },
    {
        "day": "05/02",
        "revenue": 103

    },
    {
        "day": "05/03",
        "revenue": 677

    },
    {
        "day": "05/04",
        "revenue": 240

    },
    {
        "day": "05/06",
        "revenue": 90
    },
    {
        "day": "05/07",
        "revenue": 155

    },
    {
        "day": "05/08",
        "revenue": 312

    },
    {
        "day": "05/09",
        "revenue": 556

    }
]
const Chart = ({ range }) => {
    // const [data, setData] = useState(rangeData.slice(-31))
    // useEffect(() => {
    //     setData(rangeData.slice(-1 * range))
    // }, [range])
    const {dailyRevenue} = useSelector(state=>state.analytics)

    return (
        <ResponsiveContainer width="100%" height="100%" >
            <BarChart data={dailyRevenue} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>


                <defs>
                    <linearGradient id={'revenue'} x1="0" y1="0" x2="0" y2="1" >
                        <stop offset="5%" stopColor={'#27dd6a'} stopOpacity={1} />
                        <stop offset="60%" stopColor={'#000000'}  stopOpacity={.1} />
                    </linearGradient>
                </defs>
                <Tooltip />
                <XAxis tickCount={2} interval={5} dataKey='date'/>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="revenue" fill="#27dd6a" radius={[5,5,2,2]} />
            </BarChart>
        </ResponsiveContainer>
    )
    return (


        <ResponsiveContainer width="100%" height="100%" >
            <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>


                <Tooltip />
                <XAxis />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id={'temp'} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={'#54A2F0'} stopOpacity={0.5} />
                        <stop offset="60%" stopColor={'#54A2F0'} stopOpacity={0.15} />
                        <stop offset="95%"
                            stopColor={'#54A2F0'}
                            // stopColor={mode === 'light' ? '#eee' : '#222'}
                            stopOpacity={.1} />
                    </linearGradient>
                </defs>
                <Line type="monotone" unit="M" strokeLinecap="round" strokeWidth={2}
                    // style={{ strokeDasharray: `40% 60%` }}
                    dataKey="temperature"
                    stroke={'#54A2F0'}
                    dot={true}
                    legendType="none"
                    isAnimationActive={true}
                />
                <Area isAnimationActive={true} type="monotone" stroke={0} dataKey="temperature" strokeWidth={2} fillOpacity={1} fill='url(#temp)' />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default Chart

