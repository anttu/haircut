import React, {useEffect, useState} from 'react'
import './css/App.css'
import {Person} from './Person'
import {getWorkersForHelsinki, workerWithSchedule} from './api/workers'
import {LoadingIndicator} from "./LoadingIndicator";

function App() {

  const [workers, setWorkers] = useState<workerWithSchedule[]>()

  useEffect( () => {
    getWorkersForHelsinki().then(workers => setWorkers(workers))
  }, [])


  return (
    <div className="App">
        <div className="content">
        <LoadingIndicator workers={workers} />

        { workers?.map(w =>
            <Person {...w} key={`${w.id}-${w.location.id}`} />
        )}

        </div>
    </div>
  )
}

export default App
