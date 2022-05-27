import React from 'react';
import {worker} from './api/workers'

function firstName(name: string) {
    return name.split(' ')[0]
}

export function Person(worker: worker) {
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
                HUUUUUHAAAAA
            </div>
        </div>
    )
}

