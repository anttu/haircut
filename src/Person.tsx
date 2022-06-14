import React from 'react'
import { Schedule } from './Schedule'
import { workerWithSchedule } from './api/workers'
import styled from 'styled-components'

function firstName(name: string) {
    return name.split(' ')[0]
}

export function Person(worker: workerWithSchedule) {
    return (
        <PersonContainer className="person">
            <Name className="name">
                <div>{firstName(worker.name)}</div>
                <div className="location">{worker.location.name}</div>
            </Name>
            <Image className="image">
                <img src={worker.image_url} />
            </Image>

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

    @media only screen and (min-width: 1001px) {
        flex-direction: row;
    }
`
const Name = styled.div`
    margin-top: 10px;

    @media only screen and (min-width: 1001px) {
        width: 15%;
    }
`
const Image = styled.div`
    @media only screen and (min-width: 1001px) {
        width: 25%;
    }
`
