import React, { useEffect, useState } from 'react'
import './css/App.css'
import { Person } from './Person'
import { getWorkersForHelsinki, workerWithSchedule } from './api/workers'
import { LoadingIndicator } from './LoadingIndicator'
import { TopBar } from './TopBar'
import moment from 'moment'

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
        <div className="App">
            <TopBar date={date} onDateIncreased={increaseDate} onDateDecreased={decreaseDate} />

            <LoadingIndicator workers={workers} />

            <main>
                {workers?.map((w) => (
                    <Person {...w} key={`${w.id}-${w.location.id}`} />
                ))}
            </main>
        </div>
    )
}

export default App
