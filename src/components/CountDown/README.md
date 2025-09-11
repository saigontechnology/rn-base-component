# CountDown Component

A flexible and customizable countdown timer component for React Native that supports both simple countdown and target date countdown modes with extensive styling options.

## Features

- ⏰ **Dual Countdown Modes** - Simple countdown from a value or countdown to a specific date/time
- 🎨 **Flexible Display** - Show/hide days, hours, minutes, seconds with customizable separators
- 🏷️ **Time Unit Labels** - Optional time unit labels (d, h, m, s) with customization
- 🎯 **Precise Timing** - Accurate millisecond-level countdown for target dates
- 🔄 **Full Timer Control** - Start, stop, pause, resume, and restart functionality via ref
- 📊 **Status Monitoring** - Real-time status tracking (running, stopped, finished)
- 🎪 **Theme Integration** - Seamlessly integrates with the design system
- ♿ **Accessible** - Built-in accessibility features with proper ARIA labels
- 🔧 **TypeScript Ready** - Full type safety and IntelliSense support

## Installation

```bash
npm install rn-base-component
# or
yarn add rn-base-component
```

## Basic Usage

### Simple Countdown (from seconds)

```tsx
import React from 'react'
import {CountDown} from 'rn-base-component'

export default function App() {
  return <CountDown value={60} onFinish={() => console.log('Countdown finished!')} />
}
```

### Target Date Countdown

```tsx
import React from 'react'
import {CountDown} from 'rn-base-component'
import dayjs from 'dayjs'

export default function App() {
  const targetDate = dayjs().add(1, 'hour').add(30, 'minutes')

  return (
    <CountDown
      countDownTo={targetDate}
      timeToShow={['H', 'M', 'S']}
      onFinish={() => console.log('Event started!')}
    />
  )
}
```

## Advanced Usage

### Customized Display

```tsx
<CountDown
  countDownTo={dayjs().add(2, 'days').add(12, 'hours')}
  timeToShow={['D', 'H', 'M', 'S']}
  separator=" | "
  showLabels={true}
  timeLabels={{
    days: 'days',
    hours: 'hrs',
    minutes: 'min',
    seconds: 'sec',
  }}
  fontSize={24}
  textColor="#FF6B6B"
/>
```

### With Ref Control

```tsx
import React, {useRef, useState} from 'react'
import {CountDown, CountDownRef, Button} from 'rn-base-component'

export default function App() {
  const countdownRef = useRef<CountDownRef>(null)
  const [status, setStatus] = useState<'running' | 'stopped' | 'finished'>('running')

  const handleRestart = () => {
    countdownRef.current?.restart()
    setStatus('running')
  }

  const handleStop = () => {
    countdownRef.current?.stopCountDown()
    setStatus('stopped')
  }

  const handleResume = () => {
    countdownRef.current?.resumeCountDown()
    setStatus('running')
  }

  const getCurrentTime = () => {
    const time = countdownRef.current?.getCurrentTime()
    console.log('Current time:', time)
  }

  const checkStatus = () => {
    const currentStatus = countdownRef.current?.getCountDownStatus()
    setStatus(currentStatus || 'running')
    console.log('Status:', currentStatus)
  }

  return (
    <View>
      <CountDown ref={countdownRef} value={120} onFinish={() => setStatus('finished')} />
      <Text>Status: {status}</Text>

      <Button onPress={handleRestart}>Restart</Button>
      <Button onPress={handleStop}>Stop</Button>
      <Button onPress={handleResume} disabled={status !== 'stopped'}>
        Resume
      </Button>
      <Button onPress={getCurrentTime}>Get Current Time</Button>
      <Button onPress={checkStatus}>Check Status</Button>
    </View>
  )
}
```

## Time Display Options

### Time Units (`timeToShow`)

Control which time units are displayed:

```tsx
// Show only hours, minutes, seconds
<CountDown timeToShow={['H', 'M', 'S']} countDownTo={targetDate} />

// Show only minutes and seconds
<CountDown timeToShow={['M', 'S']} countDownTo={targetDate} />

// Show all units
<CountDown timeToShow={['D', 'H', 'M', 'S']} countDownTo={targetDate} />
```

### Custom Separators

```tsx
// Colon separator
<CountDown separator=" : " countDownTo={targetDate} />

// Pipe separator
<CountDown separator=" | " countDownTo={targetDate} />

// Custom separator
<CountDown separator=" → " countDownTo={targetDate} />
```

### Time Unit Labels

```tsx
// Show default labels (d, h, m, s)
<CountDown showLabels={true} countDownTo={targetDate} />

// Custom labels
<CountDown
  showLabels={true}
  timeLabels={{
    days: 'days',
    hours: 'hours',
    minutes: 'min',
    seconds: 'sec'
  }}
  countDownTo={targetDate}
/>
```

## Styling

### Theme Integration

The CountDown component integrates with the theme system:

```tsx
const customTheme = {
  components: {
    CountDown: {
      fontSize: 20,
      textColor: '#333333',
      labelFontSize: 12,
      labelColor: '#666666',
    },
  },
}
```

### Custom Styling

```tsx
;<CountDown fontSize={28} textColor="#FF6B6B" style={styles.customContainer} countDownTo={targetDate} />

const styles = StyleSheet.create({
  customContainer: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 8,
  },
})
```

## API Reference

### Props

| Prop            | Type          | Default                                               | Description                                |
| --------------- | ------------- | ----------------------------------------------------- | ------------------------------------------ |
| `value`         | `number`      | `0`                                                   | Initial countdown value in seconds         |
| `onFinish`      | `() => void`  | -                                                     | Callback when countdown reaches zero       |
| `countDownTo`   | `dayjs.Dayjs` | -                                                     | Target date/time to countdown to           |
| `timeToShow`    | `string[]`    | `['D', 'H', 'M', 'S']`                                | Time units to display                      |
| `allowNegative` | `boolean`     | `false`                                               | Allow countdown to go into negative values |
| `fontSize`      | `number`      | theme                                                 | Font size for countdown text               |
| `textColor`     | `string`      | theme                                                 | Color for countdown text                   |
| `separator`     | `string`      | `' : '`                                               | Separator between time units               |
| `showLabels`    | `boolean`     | `false`                                               | Show time unit labels                      |
| `timeLabels`    | `object`      | `{days: 'd', hours: 'h', minutes: 'm', seconds: 's'}` | Custom time unit labels                    |
| `style`         | `ViewStyle`   | -                                                     | Custom container style                     |
| `testID`        | `string`      | -                                                     | Test identifier                            |

### Ref Methods

| Method                 | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `restart()`            | Restart the countdown timer to initial value          |
| `getCurrentTime()`     | Get the current countdown time in seconds             |
| `stopCountDown()`      | Stop the countdown timer                              |
| `getCountDownStatus()` | Get current status ('running', 'stopped', 'finished') |
| `resumeCountDown()`    | Resume a stopped countdown (if time remaining)        |

### Time Units

- `'D'` - Days
- `'H'` - Hours
- `'M'` - Minutes
- `'S'` - Seconds

### Countdown Status

The `getCountDownStatus()` method returns one of these values:

- `'running'` - Countdown is actively running
- `'stopped'` - Countdown has been paused/stopped
- `'finished'` - Countdown has reached zero and completed

## Examples

### Countdown Control Examples

#### Pause/Resume Timer

```tsx
const PauseResumeTimer = () => {
  const countdownRef = useRef<CountDownRef>(null)
  const [isPaused, setIsPaused] = useState(false)

  const togglePause = () => {
    if (isPaused) {
      countdownRef.current?.resumeCountDown()
    } else {
      countdownRef.current?.stopCountDown()
    }
    setIsPaused(!isPaused)
  }

  return (
    <View>
      <CountDown ref={countdownRef} value={300} />
      <Button onPress={togglePause}>{isPaused ? 'Resume' : 'Pause'}</Button>
    </View>
  )
}
```

#### Game Timer with Status

```tsx
const GameTimer = () => {
  const countdownRef = useRef<CountDownRef>(null)
  const [gameStatus, setGameStatus] = useState<'waiting' | 'playing' | 'paused' | 'finished'>('waiting')

  const startGame = () => {
    countdownRef.current?.restart()
    setGameStatus('playing')
  }

  const pauseGame = () => {
    countdownRef.current?.stopCountDown()
    setGameStatus('paused')
  }

  const resumeGame = () => {
    countdownRef.current?.resumeCountDown()
    setGameStatus('playing')
  }

  const checkTimeRemaining = () => {
    const time = countdownRef.current?.getCurrentTime()
    Alert.alert('Time Remaining', `${time} seconds left`)
  }

  return (
    <View>
      <Text>Game Status: {gameStatus}</Text>
      <CountDown ref={countdownRef} value={180} onFinish={() => setGameStatus('finished')} />

      <View style={styles.buttonRow}>
        <Button onPress={startGame}>Start Game</Button>
        <Button onPress={pauseGame} disabled={gameStatus !== 'playing'}>
          Pause
        </Button>
        <Button onPress={resumeGame} disabled={gameStatus !== 'paused'}>
          Resume
        </Button>
        <Button onPress={checkTimeRemaining}>Check Time</Button>
      </View>
    </View>
  )
}
```

#### Quiz Timer with Auto-Pause

```tsx
const QuizTimer = () => {
  const countdownRef = useRef<CountDownRef>(null)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [isQuizActive, setIsQuizActive] = useState(false)

  const startQuiz = () => {
    countdownRef.current?.restart()
    setIsQuizActive(true)
    setCurrentQuestion(1)
  }

  const nextQuestion = () => {
    // Pause timer while transitioning to next question
    countdownRef.current?.stopCountDown()

    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1)
      countdownRef.current?.resumeCountDown()
    }, 2000) // 2 second break between questions
  }

  const getTimeStatus = () => {
    const status = countdownRef.current?.getCountDownStatus()
    const time = countdownRef.current?.getCurrentTime()

    return {status, time}
  }

  return (
    <View>
      <Text>Question {currentQuestion}</Text>
      <CountDown
        ref={countdownRef}
        value={600} // 10 minutes total
        onFinish={() => setIsQuizActive(false)}
      />

      <Button onPress={startQuiz} disabled={isQuizActive}>
        Start Quiz
      </Button>
      <Button onPress={nextQuestion} disabled={!isQuizActive}>
        Next Question
      </Button>
    </View>
  )
}
```

### Event Countdown

```tsx
const EventCountdown = () => {
  const eventDate = dayjs('2024-12-31 23:59:59')

  return (
    <CountDown
      countDownTo={eventDate}
      timeToShow={['D', 'H', 'M', 'S']}
      showLabels={true}
      separator=" : "
      fontSize={20}
      onFinish={() => alert('Happy New Year!')}
    />
  )
}
```

### OTP Timer

```tsx
const OTPTimer = () => {
  const [canResend, setCanResend] = useState(false)

  return (
    <View>
      {!canResend && <CountDown value={60} onFinish={() => setCanResend(true)} />}
      <Button disabled={!canResend} onPress={resendOTP}>
        Resend OTP
      </Button>
    </View>
  )
}
```

### Sale Timer

```tsx
const SaleTimer = () => {
  const saleEndDate = dayjs().add(2, 'days').add(6, 'hours')

  return (
    <Card>
      <Typography variant="h2">Flash Sale Ends In:</Typography>
      <CountDown
        countDownTo={saleEndDate}
        timeToShow={['D', 'H', 'M', 'S']}
        showLabels={true}
        timeLabels={{
          days: 'Days',
          hours: 'Hours',
          minutes: 'Min',
          seconds: 'Sec',
        }}
        fontSize={24}
        textColor="#FF4444"
        separator=" : "
      />
    </Card>
  )
}
```

## Accessibility

The CountDown component includes comprehensive accessibility features:

- Proper `accessibilityRole="timer"`
- Dynamic accessibility labels describing current time
- Screen reader announcements for time changes
- Supports all standard accessibility props

```tsx
<CountDown
  countDownTo={targetDate}
  accessibilityLabel="Sale countdown timer"
  accessibilityHint="Time remaining until sale ends"
/>
```

## Dependencies

- `dayjs` - For date/time manipulation (peer dependency)
- `styled-components/native` - For styling
- React Native - Base framework

## Notes

- When using `countDownTo` mode, the component automatically handles daylight saving time transitions
- The component cleans up all timers and intervals on unmount
- For better performance with multiple CountDown components, consider using a single timer and multiple displays
- The simple countdown mode (`value` prop) shows format like "60s", while target date mode shows full time breakdown
