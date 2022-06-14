import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

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
    display: flex;
    justify-content: space-around;

    position: fixed;
    top: 0;

    background: #282c34;
    width: 100%;
`
