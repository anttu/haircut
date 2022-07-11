import React from 'react'
import logo from './images/logo.svg'
import styled from 'styled-components'

export function LoadingIndicator(props: { isLoading: boolean | undefined }) {
    if (!props.isLoading) return <React.Fragment />

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
