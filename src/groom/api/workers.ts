import axios from 'axios'
import {location} from './locations'

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

export async function getWorkersForLocation(loc: location, serviceId: number): Promise<worker[]> {
    const response = await axios.get<response>(`https://www.varaaheti.fi/groom/fi/api/public/locations/${loc.url_text}/views/palvelut/services/${serviceId}/resources`)
    return response.data.data.filter(resource => resource.type === 'worker').map(worker => {
        return {
            ...worker,
            location: loc,
        }
    })
}