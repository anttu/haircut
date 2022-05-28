import axios from 'axios'
import {getHelsinkiLocations, location} from './locations'
import {getBasicHairCutServiceIdForLocation} from "./serviceCategories";
import {getTodaysScheduleForEmployee, Schedule} from "./schedule";

interface response {
    object: string
    has_more: boolean
    data: resource[]
}

interface resource {
    object: string
    id: number
    type: 'worker' | string
    name: string
    image_url: string
    description: {
        object: string
        text: string
    }
}

export interface worker extends resource {
    location: location
}

export interface workerWithSchedule extends worker {
    schedule: Schedule
}

async function getWorkersForLocation(loc: location, serviceId: number): Promise<worker[]> {
    const response = await axios.get<response>(`https://www.varaaheti.fi/groom/fi/api/public/locations/${loc.url_text}/views/palvelut/services/${serviceId}/resources`)
    return response.data.data.filter(resource => resource.type === 'worker').map(worker => {
        return {
            ...worker,
            location: loc,
        }
    })
}

export async function getWorkersForHelsinki(): Promise<workerWithSchedule[]> {
    const helsinkiLocations = await getHelsinkiLocations()
    const workersForLocations = await Promise.all(helsinkiLocations.map(async store => {
        const basicHaircutId = await getBasicHairCutServiceIdForLocation(store)
        const workersForLocation = await getWorkersForLocation(store, basicHaircutId)
        return Promise.all(workersForLocation.map(async worker => ({
            ...worker,
            schedule: await getTodaysScheduleForEmployee(store.url_text, worker.id, basicHaircutId)
        })))
    }))

    return workersForLocations.flat()
}