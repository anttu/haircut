import axios from 'axios'
import moment from 'moment'

function getTodayIso(): string {
    return moment().add(1, 'days').format('YYYY-MM-DD')
}

export async function getTodaysScheduleForEmployee(locationId: string, workerId: number, serviceId: number): Promise<Schedule> {
    const today = getTodayIso()
    const url = `https://www.varaaheti.fi/groom/fi/api/public/locations/${locationId}/views/palvelut/services/${serviceId}/available?worker_id=${workerId}&date=${today}`
    const response = await axios.get<response>(url)

    const todaySchedule = response.data.data.find(schedule => schedule.date === today)
    if (!todaySchedule) throw new Error(`Could not find schedule for worker ${workerId} and location ${locationId}`)

    return todaySchedule
}

export interface Schedule {
    date: string
    available: availability[]
}

interface availability {
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