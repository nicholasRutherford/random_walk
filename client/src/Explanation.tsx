import React from 'react';

const Explanation: React.FC = () => {

    return (
        <div className='mr-8'>
            <h1 className='text-2xl'>Random Walk</h1>
            <p className='max-w-lg'>
                This page visualizes two random walks on a 2-D plane. 
                Both Red and Blue start at the orgin and then take one random step in one of the four cardinal directions.
                The steps are streamed over a websocket from a sever. We then visualize the current location of both Red and Blue as
                as well as visualize the distance from the origin over time.
            </p>
        </div>
    )
}

export default Explanation;
