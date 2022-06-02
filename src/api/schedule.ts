import axios from 'axios'
import moment from 'moment'

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

function findOrThrow<T>(collection: T[], predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T {
    const result = collection.find(predicate)
    if (!result) throw new Error('Result not found')

    return result
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
