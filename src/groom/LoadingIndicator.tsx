import React from 'react'
import {worker} from './api/workers'
import logo from '../logo.svg'

export function LoadingIndicator(props: { workers: worker[] | undefined }) {
    if (props.workers && props.workers.length > 0) return <React.Fragment />

    return <img src={logo} className="App-logo" alt="logo" />
}

