import React from 'react'
import { Schedule } from './Schedule'
import { workerWithSchedule } from './api/workers'
import styled from 'styled-components'
import { Portrait } from './Portrait'

function firstName(name: string) {
    return name.split(' ')[0]
}

export function Person(worker: workerWithSchedule) {
    return (
        <PersonContainer>
            <Name>
                <div>{firstName(worker.name)}</div>
                <Location>{worker.location.name}</Location>
            </Name>
            <Portrait imageUrl={worker.image_url} />
            <Schedule {...worker.schedule} />
        </PersonContainer>
    )
}

const PersonContainer = styled.div`
    display: flex;
    height: 400px;
    width: 100%;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    @media only screen and (min-width: 1001px) {
        flex-direction: row;
    }
`
const Name = styled.div`
    margin-top: 1rem;
    margin-bottom: 0.5rem;

    @media only screen and (min-width: 1001px) {
        width: 15%;
    }
`
const Location = styled.div`
    margin-top: 0.5rem;
    font-size: 1rem;
`
