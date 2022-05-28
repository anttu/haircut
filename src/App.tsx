import React, {useEffect, useState} from 'react'
import './App.css'
import {Person} from './groom/Person'
import {getWorkersForHelsinki, workerWithSchedule} from './groom/api/workers'
import {LoadingIndicator} from "./groom/LoadingIndicator";

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
