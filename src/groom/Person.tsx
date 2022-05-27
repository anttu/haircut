import React from 'react';
import {workerWithSchedule} from '../App'
import {Availability, Schedule} from "./api/schedule";

function firstName(name: string) {
    return name.split(' ')[0]
}

export function Person(worker: workerWithSchedule) {
    return (
        <div className='person'>
            <div className='name'>
                <div>{firstName(worker.name)}</div>
                <div className='location'>{worker.location.name}</div>
            </div>
            <div className='image'>
                <img src={worker.image_url} />
            </div>
            <div className='schedule'>
                {schedule(worker.schedule)}
            </div>
        </div>
    )
}

function combineSchedule(schedule: Schedule) {
    return schedule.available.reduce((accumulation, curr) => {
        const prev = accumulation.pop()

        if (!prev) return [curr] // first item

        if (curr.from <= prev.to) {
            const end = (prev.to > curr.to) ? prev.to : curr.to
            return [...accumulation, {
                ...prev,
                to: end
            }]
        }

        return [...accumulation, prev, curr]

    }, [] as Availability[])
}

function schedule(schedule: Schedule, combine: boolean = true) {
    if (!schedule || !schedule.available) return <span>Not available</span>

    const availability = combine ? combineSchedule(schedule) : schedule.available
    return availability.map(available => <div>{available.from}-{available.to}</div>)
}

