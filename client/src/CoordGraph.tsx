import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ReferenceDot, ReferenceLine, ResponsiveContainer,  } from 'recharts';
import { Data } from './App';

const CoordGraph: React.FC<{ data: Data }> = ({ data }) => {
    const rData = data['R']?.coords
    const lastR = rData?.[rData.length - 1]

    const bData = data['B']?.coords
    const lastB = bData?.[bData.length - 1]

    return (
        <div className='my-5'>
            <div className='text-lg text-center'>Location Over Time</div>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" domain={([dataMin, dataMax]) => { return [Math.min(0, dataMin) -1, Math.max(0, dataMax) + 1] }} />
                    <YAxis type="number" dataKey="y" domain={([dataMin, dataMax]) => { return [Math.min(0, dataMin) -1, Math.max(0, dataMax) + 1] }} />
                    {rData && <Scatter data={rData} fill="rgba(220, 38, 38, 0.3)" isAnimationActive={false} />}
                    {bData && <Scatter data={bData} fill="rgba(37, 99, 235, 0.3)" isAnimationActive={false} />}
                    {lastR && <ReferenceLine segment={[{ x: 0, y: 0 }, { x: lastR.x, y: lastR.y }]} stroke="rgba(220, 38, 38, 1)" strokeWidth={2} />}
                    {lastB && <ReferenceLine segment={[{ x: 0, y: 0 }, { x: lastB.x, y: lastB.y }]} stroke="rgba(37, 99, 235, 1)" strokeWidth={2} />}
                    <ReferenceDot x={0} y={0} r={5} fill="#0f172a" stroke="none" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>

    )
}

export default CoordGraph;
