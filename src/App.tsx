import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Person} from "./groom/Person";
import {getHelsinkiLocations} from "./groom/api/locations";
import {getWorkersForLocation, resource as worker} from './groom/api/workers'
import {getHairServiceIdForLocation} from "./groom/api/serviceCategories";

function App() {

  const [workers, setWorkers] = useState<worker[]>()

  useEffect( () => {
    getHelsinkiLocations().then(async (data) => {
      const workersForLocations = await Promise.all(data.map(async loc => {
        const basicHaircutId = await getHairServiceIdForLocation(loc)
        return await getWorkersForLocation(loc, basicHaircutId)
      }))

      const workers = workersForLocations.flat()

      setWorkers(workers)
    })
  }, [])


  function loadingIndicator() {
    if (!workers || workers.length < 1) {
      return <img src={logo} className="App-logo" alt="logo" />
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <div>
        {loadingIndicator()}

        { workers?.map(w =>
            <Person {...w} key={w.id} />
        )}

        </div>
      </header>
    </div>
  )
}

export default App
