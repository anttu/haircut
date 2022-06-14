import React from 'react'
import styled from 'styled-components'

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
        object-fit: scale-down;
    }

    @media only screen and (min-width: 1001px) {
        width: 25%;
    }
`
