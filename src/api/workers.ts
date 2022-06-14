import axios from 'axios'
import { getHelsinkiLocations, location } from './locations'
import { getBasicHairCutServiceIdForLocation } from './serviceCategories'
import { getScheduleForEmployee, Schedule } from './schedule'
import moment from 'moment'

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
    image_url: string | undefined
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
    try {
        const response = await axios.get<response>(
            `https://www.varaaheti.fi/groom/fi/api/public/locations/${loc.url_text}/views/palvelut/services/${serviceId}/resources`
        )

        return appendLocationForWorkerResource(response.data.data, loc)
    } catch (e) {
        console.log(`Failed to get workers for location ${loc} doing service ${serviceId}`)
        return []
    }
}

function appendLocationForWorkerResource(resources: resource[], loc: location): worker[] {
    return resources
        .filter((resource) => resource.type === 'worker')
        .map((resource) => {
            return {
                ...resource,
                location: loc,
            }
        })
}

export async function getWorkersForHelsinki(day: moment.Moment): Promise<workerWithSchedule[]> {
    const helsinkiLocations = await getHelsinkiLocations()
    const workersForLocations = await Promise.all(
        helsinkiLocations.map(async (store) => {
            const basicHaircutId = await getBasicHairCutServiceIdForLocation(store)
            const workersForLocation = await getWorkersForLocation(store, basicHaircutId)
            return Promise.all(
                workersForLocation.map(async (worker) => ({
                    ...worker,
                    schedule: await getScheduleForEmployee(store.url_text, worker.id, basicHaircutId, day),
                }))
            )
        })
    )

    return workersForLocations.flat()
}
