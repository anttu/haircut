import React from 'react'
import { Schedule } from './Schedule'
import { workerWithSchedule } from './api/workers'
import styled from 'styled-components'
import { Portrait } from './Portrait'
import { devices } from './css/styles'

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

    &:last-of-type {
        margin-bottom: 5rem;
    }

    ${devices.tablet} {
        padding-left: 1rem;
    }

    ${devices.web} {
        flex-direction: row;
        align-items: center;
    }
`
const Info = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;

    ${devices.not_web} {
        margin-left: 1rem;
    }

    ${devices.web} {
        width: 15%;
    }
`

const FirstName = styled.div`
    font-size: 2rem;
    font-weight: 600;

    ${devices.small_mobile} {
        font-size: 1.2rem;
    }
`

const Location = styled.div`
    margin-top: 0.5rem;
    font-size: 1.2rem;

    ${devices.small_mobile} {
        font-size: 1rem;
    }
`
