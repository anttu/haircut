import axios from 'axios'
import moment from 'moment'

function getDayAsIso(date: moment.Moment): string {
    return date.format('YYYY-MM-DD')
}

export async function getScheduleForEmployee(locationId: string, workerId: number, serviceId: number, scheduleDay: moment.Moment): Promise<Schedule> {
    const day = getDayAsIso(scheduleDay)
    const url = `https://www.varaaheti.fi/groom/fi/api/public/locations/${locationId}/views/palvelut/services/${serviceId}/available?worker_id=${workerId}&date=${day}`
    const response = await axios.get<response>(url)

    const scheduleForGivenDay = response.data.data.find(schedule => schedule.date === day)
    if (!scheduleForGivenDay) throw new Error(`Could not find schedule for worker ${workerId} and location ${locationId}`)

    return scheduleForGivenDay
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