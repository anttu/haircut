import React from 'react'
import { Availability, Schedule as workerSchedule } from './api/schedule'
import styled from 'styled-components'

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
        <Slot key={available.from}>
            {available.from}-{available.to}
        </Slot>
    ))
    return <ScheduleContainer>{elements}</ScheduleContainer>
}

const ScheduleContainer = styled.div`
    font-size: 1rem;

    @media only screen and (min-width: 1001px) {
        width: 50%;
    }
`

const Slot = styled.div`
    height: 2rem;
    margin-top: 1rem;

    &:not(:last-of-type) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
`
