import React, {useRef, useState, useEffect} from 'react'
import {StatusBar, View, Image, Text, useWindowDimensions, SafeAreaView, Dimensions} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  useAnimatedReaction,
  cancelAnimation,
  useAnimatedRef,
  scrollTo,
} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
// import {useSafeAreaInsets} from 'react-native-safe-area-context'

const ALBUM_COVERS = {
  DISCOVERY: 'https://media.pitchfork.com/photos/5929a87b5e6ef95969321208/16:9/w_1280,c_limit/d23a880a.jpg',
  HUMAN_AFTER_ALL: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg',
  HOMEWORK: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg',
  RANDOM_ACCESS_MEMORIES: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg',
}

const DAFT_PUNK = 'Daft Punk'

function clamp(value: number, lowerBound: number, upperBound: number) {
  'worklet'
  return Math.max(lowerBound, Math.min(value, upperBound))
}

function listToObject(list: any) {
  const values: any = Object.values(list)
  const object: any = {}

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i
  }

  return object
}

const SONG_HEIGHT = 70
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT

function objectMove(object: any, from: any, to: any) {
  'worklet'
  const newObject = Object.assign({}, object)

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to
    }

    if (object[id] === to) {
      newObject[id] = from
    }
  }

  return newObject
}

function shuffle(array: any) {
  let counter = array.length

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter)
    counter--
    const temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

const SONGS = shuffle([
  {
    id: 'one-more-time',
    title: 'One More Time',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'digital-love',
    title: 'Digital Love',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'nightvision',
    title: 'Nightvision',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'something-about-us',
    title: 'Something About Us',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'veridis-quo',
    title: 'Veridis Quo',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: 'make-love',
    title: 'Make Love',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: 'television-rules-the-nation',
    title: 'Television Rules the Nation',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: 'phoenix',
    title: 'Phoenix',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: 'revolution-909',
    title: 'Revolution 909',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: 'around-the-world',
    title: 'Around the World',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: 'within',
    title: 'Within',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'touch',
    title: 'Touch (feat. Paul Williams)',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'beyond',
    title: 'Beyond',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: 'motherboard',
    title: 'Motherboard',
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
])

function Song({artist, cover, title}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: SONG_HEIGHT,
        padding: 10,
      }}>
      <Image source={{uri: cover}} style={{height: 50, width: 50, borderRadius: 4}} />

      <View
        style={{
          marginLeft: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}>
          {title}
        </Text>

        <Text style={{fontSize: 12, color: 'gray'}}>{artist}</Text>
      </View>
    </View>
  )
}

function MovableSong({id, artist, cover, title, positions, scrollY, songsCount}: any) {
  const [moving, setMoving] = useState(false)
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT)
  const dimensions = useWindowDimensions()
  const statusBarHeight = StatusBar.currentHeight || 0
  const window = Dimensions.get('window')
  const screen = Dimensions.get('screen')
  const topPadding = statusBarHeight
  const bottomPadding = screen.height - window.height - topPadding
  //   const insets = useSafeAreaInsets()

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (!moving) {
        top.value = withSpring(currentPosition * SONG_HEIGHT)
      }
    },
    [moving],
  )

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true)
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value
      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      })

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, {duration: 1500})
      } else if (positionY >= scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT
        const containerHeight = dimensions.height
        const maxScroll = contentHeight - containerHeight + 10
        scrollY.value = withTiming(maxScroll, {duration: 1500})
        console.log('scrollY>>>>>>', scrollY.value)
      } else {
        cancelAnimation(scrollY)
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      })

      const newPosition = clamp(Math.floor(positionY / SONG_HEIGHT), 0, songsCount - 1)

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(positions.value, positions.value[id], newPosition)
      }
    },
    onFinish() {
      top.value = positions.value[id] * SONG_HEIGHT
      runOnJS(setMoving)(false)
    },
  })

  const animatedStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      backgroundColor: 'white',
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    }),
    [moving],
  )

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{maxWidth: '80%'}}>
          <Song artist={artist} cover={cover} title={title} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

const DraggableList: React.FC = () => {
  const scrollY = useSharedValue(0)
  const positions = useSharedValue(listToObject(SONGS))
  const handleScroll = useAnimatedScrollHandler(event => {
    console.log('event.contentOffset.y', event.contentOffset.y)
    scrollY.value = event.contentOffset.y
  })
  const scrollViewRef = useAnimatedRef()

  useAnimatedReaction(
    () => scrollY.value,
    scrolling => {
      scrollTo(scrollViewRef, 0, scrolling, false)
    },
  )

  return (
    <>
      <View style={{flex: 1}}>
        {/* <SafeAreaView style={{flex: 1}}> */}
        <StatusBar barStyle="dark-content" />
        {/* <SafeAreaProvider> */}

        <Animated.ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={15}
          onScroll={handleScroll}
          style={{flex: 1, position: 'relative', backgroundColor: 'white'}}
          contentContainerStyle={{height: SONGS.length * SONG_HEIGHT}}>
          {SONGS.map(song => (
            <MovableSong
              key={song.id}
              id={song.id}
              artist={song.artist}
              cover={song.cover}
              title={song.title}
              positions={positions}
              scrollY={scrollY}
              songsCount={SONGS.length}
            />
          ))}
        </Animated.ScrollView>

        {/* </SafeAreaProvider> */}
        {/* </SafeAreaView> */}
      </View>
    </>
  )
}

DraggableList.displayName = 'DraggableList'

export default DraggableList
