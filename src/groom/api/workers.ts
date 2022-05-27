import axios from 'axios'
import {location} from './locations'

interface response {
    object: string
    has_more: boolean
    data: resource[]
}

export interface resource {
    object: string
    id: number
    type: 'worker' | string
    name: string
    image_url: "https://s3-eu-west-1.amazonaws.com/digitalbooker.ui/customers/groom/resources/71.jpeg?ts=1527235774",
    description: {
        object: string
        text: string
    }
}

export async function getWorkersForLocation(loc: location, serviceId: number): Promise<resource[]> {
    const response = await axios.get<response>(`https://www.varaaheti.fi/groom/fi/api/public/locations/${loc.url_text}/views/palvelut/services/${serviceId}/resources`)
    return response.data.data.filter(resource => resource.type === 'worker')
}