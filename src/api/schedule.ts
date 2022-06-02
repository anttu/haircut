import axios from 'axios'
import moment from 'moment'
import { findOrThrow } from '../utils'

function getDayAsIso(date: moment.Moment): string {
    return date.format('YYYY-MM-DD')
}

export async function getScheduleForEmployee(
    locationId: string,
    workerId: number,
    serviceId: number,
    scheduleDay: moment.Moment
): Promise<Schedule> {
    const day = getDayAsIso(scheduleDay)
    const url = `https://www.varaaheti.fi/groom/fi/api/public/locations/${locationId}/views/palvelut/services/${serviceId}/available?worker_id=${workerId}&date=${day}`
    try {
        const response = await axios.get<response>(url)

        return findOrThrow(response.data.data, (schedule) => schedule.date === day)
    } catch (e) {
        console.log(`Failed to get schedule for worker ${workerId}, location ${locationId} and service ${serviceId}`)

        return {
            date: day,
            available: [],
        }
    }
}

export interface Schedule {
    date: string
    available: Availability[]
}

export interface Availability {
    from: string
    to: string
    resources: number[]
    price: number
    normal_price: number
}

interface response {
    object: string
    has_more: boolean
    data: Schedule[]
}
