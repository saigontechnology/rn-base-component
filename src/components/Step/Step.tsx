import React, {useState} from 'react'
import styled from 'styled-components/native'
import {metrics} from '../../helpers/metrics'
import {TouchableWithoutFeedback, Text, View, Pressable} from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import {Extrapolate} from 'react-native-reanimated'

export type ButtonProps = {
  onPress: () => void
  text: string
  color?: string
  textColor?: string
}

const Step: React.FC<ButtonProps> = ({text, onPress, color, textColor}) => {
  const [open, setIsOpen] = useState(false)
  const value = useSharedValue(0)
  const rotateValue = useSharedValue(45)
  const isRotated = useSharedValue(false)
  const toggle = () => {
    value.value = open ? 0 : 1
    withSpring(value.value, {
      damping: 15,
      velocity: 5,
      stiffness: 30,
    })
    setIsOpen(!open)
    if (!isRotated.value) {
      rotateValue.value = withTiming(0, {
        duration: 200,
        easing: Easing.ease,
      })
    } else {
      rotateValue.value = withTiming(45, {
        duration: 200,
        easing: Easing.ease,
      })
    }
    isRotated.value = !isRotated.value
  }

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotateValue.value}deg`,
      },
    ],
  }))

  const pinstyle = useAnimatedStyle(() => {
    const translateY = interpolate(value.value, [0, 1], [0, -10], Extrapolate.CLAMP)
    const springValue = withSpring(translateY, {
      damping: 10,
      velocity: 5,
      stiffness: 300,
    })

    const opacity = withTiming(interpolate(translateY, [0, -10], [0, 1], Extrapolate.CLAMP), {
      duration: 200,
      easing: Easing.ease,
    })

    return {
      transform: [{translateY: springValue}],
      opacity: opacity,
    }
  })

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      {/* <TouchableWithoutFeedback>
        <Animated.View
          style={{
            width: 48,
            height: 48,
            borderRadius: 48 / 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowRadius: 10,
            shadowColor: '#F02A4B',
            shadowOpacity: 0.3,
            shadowOffset: {height: 10},
            backgroundColor: 'red',
          }}>
          <Text>*</Text>
        </Animated.View>
      </TouchableWithoutFeedback> */}
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            {
              width: 48,
              height: 48,
              borderRadius: 48 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              shadowRadius: 10,
              shadowColor: '#F02A4B',
              shadowOpacity: 0.3,
              shadowOffset: {height: 10},
              backgroundColor: 'red',
            },
            pinstyle,
          ]}>
          <Text>%</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggle}>
        <Animated.View
          style={[
            {
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              shadowRadius: 10,
              shadowColor: '#F02A4B',
              shadowOpacity: 0.3,
              shadowOffset: {height: 10},
              backgroundColor: 'red',
            },
            style,
          ]}>
          <Animated.Text style={{fontSize: 30}}>+</Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

interface IButtonWrapper {
  color?: string
}
const ButtonWrapper = styled.TouchableOpacity<IButtonWrapper>(({theme, color}) => ({
  paddingVertical: metrics.xxs,
  paddingHorizontal: metrics.small,
  borderRadius: metrics.borderRadius,
  backgroundColor: color || theme.colors.green,
  alignSelf: 'flex-start',
}))

interface ILabel {
  color: string
}
const Label = styled(Pressable)<ILabel>(({theme, color}) => ({
  color: color || 'white',
  fontWeight: theme?.fontWeights?.bold,
}))

export default Step
