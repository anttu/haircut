import React, { useEffect, useState } from 'react'
import './css/App.css'
import { Person } from './Person'
import { getWorkersForHelsinki, workerWithSchedule } from './api/workers'
import { LoadingIndicator } from './LoadingIndicator'
import { TopBar } from './TopBar'
import moment from 'moment'
import styled from 'styled-components'
import { topbar } from './css/styles'

function App() {
    const [workers, setWorkers] = useState<workerWithSchedule[]>()
    const [date, setDate] = useState(moment())

    useEffect(() => {
        getWorkersForHelsinki(date).then((workers) => setWorkers(workers))
    }, [date])

    function decreaseDate() {
        setWorkers([])
        setDate(date.add(-1, 'days').clone())
    }

    function increaseDate() {
        setWorkers([])
        setDate(date.add(1, 'days').clone())
    }

    return (
        <AppContainer>
            <TopBar date={date} onDateIncreased={increaseDate} onDateDecreased={decreaseDate} />

            <LoadingIndicator workers={workers} />

            <Main>
                {workers?.map((w) => (
                    <Person {...w} key={`${w.id}-${w.location.id}`} />
                ))}
            </Main>
        </AppContainer>
    )
}

export default App

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin-top: ${topbar.height}rem;
`

const AppContainer = styled.div`
    padding-left: 1.5rem;
    padding-right: 4rem;
    color: white;
    font-size: calc(10px + 2vmin);

    @media only screen and (min-width: 1001px) {
        padding-left: 3rem;
        padding-right: 7rem;
    }
`
