import React from 'react'
import {Schedule} from "./Schedule"
import {workerWithSchedule} from './api/workers'

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
                <Schedule {...worker.schedule} />
            </div>
        </div>
    )
}

