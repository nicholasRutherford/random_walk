import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from 'recharts';
import { Data } from './App';

const DistGraph: React.FC<{ data: Data }> = ({ data }) => {
    const rData = data['R']?.distances
    const bData = data['B']?.distances


    return (
        <div className='my-5'>
            <div className='text-lg text-center'>Distance Over Time</div>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="time" domain={['auto', 'auto']}>
                        <Label value="time" offset={-10} position="insideBottom" />
                    </XAxis>
                    <YAxis type="number" dataKey="distance">
                        <Label value="distance" offset={0} position="insideLeft" angle={-90} />
                    </YAxis>
                    {rData && <Scatter data={rData} fill="#dc2626" isAnimationActive={false} />}
                    {bData && <Scatter data={bData} fill="#2563eb" isAnimationActive={false} />}
                </ScatterChart>
            </ResponsiveContainer>
        </div>

    )
}

export default DistGraph;
