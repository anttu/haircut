import axios from 'axios'

export interface location {
    object: string
    id: number
    name: string
    url_text: string
    address: string
    zip: string
    city: string
    phone: string
    lat: string
    lng: string
    views: view[]
    online_payments: boolean
}

interface view {
    object: string
    id: number
    type: string
    name: string
    url_text: string
    days: number
    select_worker: {
        anyone: boolean
        select_yourself: boolean
    }
    worker_title: string
    has_extra_info: boolean
    has_week_browser: boolean
    display_worker_images: boolean
}

interface response {
    object: string
    has_more: boolean
    data: location[]
}

export async function getLocations(): Promise<location[]> {
    const response = await axios.get<response>('https://www.varaaheti.fi/groom/fi/api/public/locations')
    return response.data.data
}

export async function getHelsinkiLocations(): Promise<location[]> {
    const locations = await getLocations()
    return locations.filter((l) => l.city === 'Helsinki')
}
