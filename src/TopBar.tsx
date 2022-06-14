import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { topbar } from './css/styles'

interface TopBarProps {
    date: moment.Moment
    onDateIncreased: () => void
    onDateDecreased: () => void
}

export function TopBar(props: TopBarProps) {
    const displayDate = props.date.format('YYYY-MM-DD')

    return (
        <TopBarContainer>
            <button onClick={props.onDateDecreased}>&lt;&lt;</button>
            <span>{displayDate}</span>
            <button onClick={props.onDateIncreased}>&gt;&gt;</button>
        </TopBarContainer>
    )
}

const TopBarContainer = styled.nav`
    height: ${topbar.height}rem;
    display: flex;
    justify-content: space-around;

    position: fixed;
    top: 0;
    left 0;

    background-color: #282c34;
    width: 100%;
`
