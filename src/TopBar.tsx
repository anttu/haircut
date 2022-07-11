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
    const displayDate = props.date.format('DD.MM.YYYY')

    return (
        <TopBarContainer>
            <Button onClick={props.onDateDecreased} aria-label="previous date">
                <ArrowLeft />
            </Button>
            <Date>{displayDate}</Date>
            <Button onClick={props.onDateIncreased} aria-label="next date">
                <ArrowRight />
            </Button>
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

    background-color: #556075;
    width: 100%;
`

const Date = styled.span`
    margin-top: auto;
    margin-bottom: auto;
`

const Arrow = styled.span`
    border: solid black;
    border-width: 0 0.2em 0.2em 0;
    display: inline-block;
    padding: 0.2em;
`

const ArrowLeft = styled(Arrow)`
    transform: rotate(135deg);
`
const ArrowRight = styled(Arrow)`
    transform: rotate(-45deg);
`
const Button = styled.button`
    border-width: 1px;
    background-color: #00ffff;
    width: 4em;
`
