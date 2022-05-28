import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Person} from "./groom/Person";
import {getHelsinkiLocations} from './groom/api/locations'
import {getWorkersForLocation, worker} from './groom/api/workers'
import {getHairServiceIdForLocation} from './groom/api/serviceCategories'
import {getTodaysScheduleForEmployee, Schedule} from './groom/api/schedule'

export interface workerWithSchedule extends worker {
  schedule: Schedule
}

function App() {

  const [workers, setWorkers] = useState<workerWithSchedule[]>()

  async function getWorkers(): Promise<workerWithSchedule[]> {
    const helsinkiLocations = await getHelsinkiLocations()
    const workersForLocations = await Promise.all(helsinkiLocations.map(async store => {
      const basicHaircutId = await getHairServiceIdForLocation(store)
      const workersForLocation = await getWorkersForLocation(store, basicHaircutId)
      return Promise.all(workersForLocation.map(async worker => ({
        ...worker,
        schedule: await getTodaysScheduleForEmployee(store.url_text, worker.id, basicHaircutId)
      })))
    }))

    return workersForLocations.flat()
  }

  useEffect( () => {
    getWorkers().then(workers => setWorkers(workers))
  }, [])

  function loadingIndicator() {
    if (!workers || workers.length < 1) {
      return <img src={logo} className="App-logo" alt="logo" />
    }
  }


  return (
    <div className="App">
        <div className="content">
        {loadingIndicator()}

        { workers?.map(w =>
            <Person {...w} key={`${w.id}-${w.location.id}`} />
        )}

        </div>
    </div>
  )
}

export default App
