import React from 'react';
import {resource as worker} from './api/workers'

export function Person(worker: worker) {
    return (
        <div>
            <p>{worker.name}</p>
            <img src={worker.image_url} />
        </div>
    )
}

