import * as React from 'react'

export const isReadyRef = React.createRef()

export const navigationRef = React.createRef()

export function dispatch(action) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(action)
  } else {
    console.log('navigator not ready')
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function reset(params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset(params)
  } else {
    console.log('navigator not ready')
  }
}

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params)
  } else {
    console.log('navigator not ready')
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
