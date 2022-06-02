import axios from 'axios'
import { location } from './locations'
import { findOrThrow } from '../utils'

interface category {
    object: string
    id: number
    name: 'HIUKSET' | 'PARTA' | 'PALVELUPAKETIT' | 'VÄRJÄYSPALVELUT'
}

interface categoryResponse {
    object: string
    has_more: boolean
    data: category[]
}

async function getServiceCategoriesForLocation(locationName: string): Promise<category[]> {
    const response = await axios.get<categoryResponse>(
        `https://www.varaaheti.fi/groom/fi/api/public/locations/${locationName}/views/palvelut/service_categories`
    )
    return response.data.data
}

export async function getBasicHairCutServiceIdForLocation(loc: location) {
    const categories = await getServiceCategoriesForLocation(loc.url_text)
    const hairService = findOrThrow(categories, (c) => c.name === 'HIUKSET')

    const serviceCategories = await axios.get<serviceCategoryResponse>(
        `https://www.varaaheti.fi/groom/fi/api/public/locations/${loc.url_text}/views/palvelut/service_categories/${hairService.id}`
    )

    const basicHairService = findOrThrow(serviceCategories.data.services, (service) =>
        service.name.toLowerCase().startsWith('basic')
    )

    return basicHairService.id
}

interface service {
    object: string
    id: number
    name: 'Basic - 38€ (30min)' | string
    description: {
        object: string
        text: string
    }
    extra_services: object[]
}

interface serviceCategoryResponse {
    object: string
    id: number
    name: 'HIUKSET' | string
    services: service[]
}
