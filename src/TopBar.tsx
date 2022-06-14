import React from 'react'
import moment from 'moment'

interface TopBarProps {
    date: moment.Moment
    onDateIncreased: () => void
    onDateDecreased: () => void
}

export function TopBar(props: TopBarProps) {
    const displayDate = props.date.format('YYYY-MM-DD')

    return (
        <nav className="topbar">
            <button onClick={props.onDateDecreased}>&lt;&lt;</button>
            <span>{displayDate}</span>
            <button onClick={props.onDateIncreased}>&gt;&gt;</button>
        </nav>
    )
}
