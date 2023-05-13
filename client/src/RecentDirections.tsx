import React from 'react';
import { Data, Direction } from './App';

const RecentDirections: React.FC<{ data: Data }> = ({ data }) => {

    return (
        <div className='my-5'>
            <div className='text-xl'>Steps:</div>
            <div className='flex flex-col'>
                {
                    Object.keys(data).map((id: string) => {
                        return (
                            <div key={id} className=''>
                                { id === 'R' && <div className='text-red-500'>Red:</div>}
                                { id === 'B' && <div className='text-blue-500'>Blue:</div>}
                                <div className='flex flex-row'>
                                    {data[id].directions.map((direction: Direction, index: number) => (
                                        <div key={index} className='font-mono'>{direction}</div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default RecentDirections;
