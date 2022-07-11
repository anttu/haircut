import React, { useEffect, useState } from 'react'
import { Person } from './Person'
import { getWorkersForHelsinki, workerWithSchedule } from './api/workers'
import { TopBar } from './TopBar'
import moment from 'moment'
import styled from 'styled-components'
import { devices, topbar } from './css/styles'
import { CircleLoadingIndicator } from './CircleLoadingIndicator'

function App() {
    const [isLoading, setLoading] = useState(true)
    const [workers, setWorkers] = useState<workerWithSchedule[]>()
    const [date, setDate] = useState(moment())

    useEffect(() => {
        getWorkersForHelsinki(date).then((workers) => {
            setWorkers(workers)
            setLoading(false)
        })
    }, [date])

    function decreaseDate() {
        setLoading(true)
        setDate(date.add(-1, 'days').clone())
    }

    function increaseDate() {
        setLoading(true)
        setDate(date.add(1, 'days').clone())
    }

    return (
        <AppContainer>
            <TopBar date={date} onDateIncreased={increaseDate} onDateDecreased={decreaseDate} />

            <CircleLoadingIndicator isLoading={isLoading} />

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

    ${devices.web} {
        padding-left: 3rem;
        padding-right: 7rem;
    }
`
