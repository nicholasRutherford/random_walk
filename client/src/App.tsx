import React, { useEffect, useState } from 'react';
import RecentDirections from './RecentDirections';
import { io, Socket } from 'socket.io-client';
import CoordGraph from './CoordGraph';
import DistGraph from './DistGraph';
import Explanation from './Explanation';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // Replace with your Socket.IO server URL
const DIRECTION_HISTORY = 25
const GRAPH_HISTORY = 100

export type Direction = 'N' | 'S' | 'E' | 'W'

export type Coord = {
    x: number,
    y: number
}

export type DistData = {
    id: string,
    distance: number,
    time: number
}

export type PersonData = {
    directions: Direction[],
    coords: Coord[],
    distances: DistData[]
}

export type Data = {
    [id: string]: PersonData
}

type Update = {
    id: string,
    direction: Direction
}

const nextCoord = (coord: Coord, direction: Direction): Coord => {
    switch (direction) {
        case 'N':
            return { x: coord.x, y: coord.y + 1 }
        case 'S':
            return { x: coord.x, y: coord.y - 1 }
        case 'E':
            return { x: coord.x + 1, y: coord.y }
        case 'W':
            return { x: coord.x - 1, y: coord.y }
    }
}

const calculateDistance = (coord: Coord): number => {
    return Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2))
}

const updateCoord =(data: Data, id: string, updatedCoord: Coord): Data => {
    data[id].coords.push(updatedCoord)

    if (data[id].coords.length > GRAPH_HISTORY) {
        data[id].coords.shift()
    }
    return data
}

const updateDist = (data: Data, id: string, updatedCoord: Coord, pastDist: DistData): Data => {
    data[id].distances.push({ 
        id: id, 
        distance: calculateDistance(updatedCoord), 
        time: pastDist.time + 1 
    })

    if (data[id].distances.length > GRAPH_HISTORY) {
        data[id].distances.shift()
    }
    return data
}

const updateDirection = (data: Data, id: string, direction: Direction): Data => {
    data[id].directions.unshift(direction)

    if (data[id].directions.length > DIRECTION_HISTORY) {
        data[id].directions.pop()
    }
    return data
}


const updateData = (data: Data, update: Update): Data => {
    if (!data[update.id]) {
        data[update.id] = {
            directions: [],
            coords: [{ x: 0, y: 0 }],
            distances: [{ id: update.id, distance: 0, time: 0 }]
        }
    }

    const pastCoord = data[update.id].coords[data[update.id].coords.length - 1]
    const updatedCoord = nextCoord(pastCoord, update.direction)
    const pastDist = data[update.id].distances[data[update.id].distances.length - 1]

    let updatedData = updateDirection(data, update.id, update.direction)
    updatedData = updateCoord(updatedData, update.id, updatedCoord)
    updatedData = updateDist(updatedData, update.id, updatedCoord, pastDist)

    return { ...updatedData }
}

const App: React.FC = () => {
    const [data, setData] = useState<Data>({});

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);

        newSocket.on('update', (message: string) => {
            const update: Update = JSON.parse(message);
            setData(updateData(data, update))
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <div className='m-2'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <Explanation />
                <RecentDirections data={data} />
            </div>
            <CoordGraph data={data} />
            <DistGraph data={data} />
        </div>
    );
};

export default App;
