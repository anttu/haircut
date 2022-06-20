import React from 'react'
import styled from 'styled-components'
import { devices } from './css/styles'

const defaultPortrait = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'

interface PortraitProps {
    imageUrl: string | undefined
}

export function Portrait(props: PortraitProps) {
    return (
        <Image>
            <img alt="portrait" src={props.imageUrl ?? defaultPortrait} />
        </Image>
    )
}

const Image = styled.div`
    img {
        width: 100%;
    }

    ${devices.web} {
        width: 25%;
    }
`
