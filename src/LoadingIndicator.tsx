import React from 'react'
import { worker } from './api/workers'
import logo from './images/logo.svg'
import styled from 'styled-components'

export function LoadingIndicator(props: { workers: worker[] | undefined }) {
    if (props.workers && props.workers.length > 0) return <React.Fragment />

    return <Image src={logo} className="App-logo" alt="logo" />
}

const Image = styled.img`
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`
