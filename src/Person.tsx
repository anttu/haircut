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
            <Info>
                <FirstName>{firstName(worker.name)}</FirstName>
                <Location>{worker.location.name}</Location>
            </Info>
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
    justify-content: space-between;
    margin-top: 1rem;

    @media only screen and (min-width: 1001px) {
        flex-direction: row;
        align-items: center;
    }
`
const Info = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media only screen and (max-width: 1000px) {
        margin-left: 1rem;
    }

    @media only screen and (min-width: 1001px) {
        width: 15%;
    }
`

const FirstName = styled.div`
    font-size: 2rem;
    font-weight: 600;
`

const Location = styled.div`
    margin-top: 0.5rem;
    font-size: 1.2rem;
`
