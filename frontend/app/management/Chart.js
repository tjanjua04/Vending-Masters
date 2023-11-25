'use client'
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const rangeData = [
    {
        "day": "05-01",
        "temperature": 0
    },
    {
        "day": "05-02",
        "temperature": 1

    },
    {
        "day": "05-03",
        "temperature": 10

    },
    {
        "day": "05-04",
        "temperature": 2

    },
    {
        "day": "05-05",
        "temperature": 7

    },
    {
        "day": "05-06",
        "temperature": 3
    },
    {
        "day": "05-07",
        "temperature": 2

    },
    {
        "day": "05-08",
        "temperature": 5

    },
    {
        "day": "05-09",
        "temperature": 8

    }, {
        "day": "05-01",
        "temperature": 0
    },
    {
        "day": "05-02",
        "temperature": 1

    },
    {
        "day": "05-03",
        "temperature": 10

    },
    {
        "day": "05-04",
        "temperature": 2

    },
    {
        "day": "05-05",
        "temperature": 7

    },
    {
        "day": "05-06",
        "temperature": 3
    },
    {
        "day": "05-07",
        "temperature": 2

    },
    {
        "day": "05-08",
        "temperature": 5

    },
    {
        "day": "05-09",
        "temperature": 8

    }, {
        "day": "05-01",
        "temperature": 0
    },
    {
        "day": "05-02",
        "temperature": 1

    },
    {
        "day": "05-03",
        "temperature": 10

    },
    {
        "day": "05-04",
        "temperature": 2

    },
    {
        "day": "05-05",
        "temperature": 7

    },
    {
        "day": "05-06",
        "temperature": 3
    },
    {
        "day": "05-07",
        "temperature": 2

    },
    {
        "day": "05-08",
        "temperature": 5

    },
    {
        "day": "05-09",
        "temperature": 8

    }, {
        "day": "05-01",
        "temperature": 0
    },
    {
        "day": "05-02",
        "temperature": 1

    },
    {
        "day": "05-03",
        "temperature": 10

    },
    {
        "day": "05-04",
        "temperature": 2

    },
    {
        "day": "05-05",
        "temperature": 7

    },
    {
        "day": "05-06",
        "temperature": 3
    },
    {
        "day": "05-07",
        "temperature": 2

    },
    {
        "day": "05-08",
        "temperature": 5

    },
    {
        "day": "05-09",
        "temperature": 8

    }
]
const Chart = ({ range }) => {
    const [data, setData] = useState(rangeData.slice(-30))
    useEffect(() => {
        setData(rangeData.slice(-1 * range))
    }, [range])
    return (


        <ResponsiveContainer width="100%" height="100%" >
            <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>


                <Tooltip />
                <XAxis />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3"/>
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

