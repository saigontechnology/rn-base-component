import React, {useEffect, useState} from 'react'
import {Platform} from 'react-native'
import ShimmeringView from './ShimmerComponent'

export interface ShimmerProp {
  animating: boolean
  shimmeringDirection: 'up' | 'down' | 'left' | 'right'
  duration: number
  pauseDuration: number
  animationOpacity: number
  shimmeringOpacity: number
  tilt: number
  intensity: number
  highlightLength: number
  beginFadeDuration: number
  endFadeDuration: number
  children: React.ReactNode
}

const Shimmer = ({
  shimmeringDirection = 'right',
  animationOpacity = 1,
  duration = 1000,
  shimmeringOpacity = 0.5,
  tilt = 0,
  intensity = 0,
  pauseDuration = 400,
  beginFadeDuration = 0,
  endFadeDuration = 0,
  highlightLength = 1,
  children,
}: ShimmerProp): React.ReactElement => {
  // TODO: for iOS, shimmer effect have issue with workaround from
  // https://github.com/oblador/react-native-shimmer/issues/27#issuecomment-721642346
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true)
    }, 200)
  }, [])

  return (
    <ShimmeringView
      shimmeringOpacity={shimmeringOpacity}
      shimmeringDirection={shimmeringDirection}
      animating={Platform.OS === 'ios' ? animate : true}
      animationOpacity={animationOpacity}
      duration={duration}
      tilt={tilt}
      intensity={intensity}
      pauseDuration={pauseDuration}
      beginFadeDuration={beginFadeDuration}
      endFadeDuration={endFadeDuration}
      highlightLength={highlightLength}
      children={children}
    />
  )
}

export default Shimmer
