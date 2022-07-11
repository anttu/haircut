import React from 'react'
import { CircleLoader } from 'react-spinners'

const cssProperties = {
    position: 'fixed',
    'z-index': 999,
    overflow: 'show',
    margin: 'auto',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '50px',
    height: '50px',
} as React.CSSProperties

export function CircleLoadingIndicator(props: { isLoading: boolean | undefined }) {
    if (!props.isLoading) return <React.Fragment />

    return <CircleLoader loading={props.isLoading} color={'#ffffff'} size={150} cssOverride={cssProperties} />
}
