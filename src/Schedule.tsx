import React from 'react'
import { Availability, Schedule as workerSchedule } from './api/schedule'

function combineSchedule(schedule: workerSchedule) {
    return schedule.available.reduce((accumulation, curr) => {
        const prev = accumulation.pop()

        if (!prev) return [curr] // first item

        if (curr.from <= prev.to) {
            const latestEndTime = prev.to > curr.to ? prev.to : curr.to
            return [
                ...accumulation,
                {
                    ...prev,
                    to: latestEndTime,
                },
            ]
        }

        return [...accumulation, prev, curr]
    }, [] as Availability[])
}

export function Schedule(schedule: workerSchedule) {
    if (!schedule || !schedule.available)
        return (
            <div className="schedule">
                <span>Not available</span>
            </div>
        )

    const availability = combineSchedule(schedule)
    const elements = availability.map((available) => (
        <div className="timeslot" key={available.from}>
            {available.from}-{available.to}
        </div>
    ))
    return <div className="schedule">{elements}</div>
}
