import React from 'react';
import {resource as worker} from './api/workers'

function firstName(name: string) {
    return name.split(' ')[0]
}

export function Person(worker: worker) {
    return (
        <div className='person'>
            <div>
                <span>{firstName(worker.name)}</span>
            </div>
            <div>
                <img src={worker.image_url} />
            </div>
        </div>
    )
}

