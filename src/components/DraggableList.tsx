import React, {useRef, useState, useCallback} from 'react'
import {StatusBar, View, Image, Text, useWindowDimensions, Dimensions, TouchableOpacity} from 'react-native'
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
import {
  PanGestureHandler,
  GestureHandlerRootView,
  FlatList,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler'
// import {useSafeAreaInsets} from 'react-native-safe-area-context'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as any

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

function Song({artist, cover, title, onLongPress}: any) {
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  )
}

function MovableSong({id, artist, cover, title, positions, scrollY, songsCount}: any) {
  const ref = useRef<Animated.View>(null)
  const [moving, setMoving] = useState(false)
  // const [isDraggable, setIsDraggable] = useState(false)
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT)
  const dimensions = useWindowDimensions()
  const statusBarHeight = StatusBar.currentHeight || 0
  const window = Dimensions.get('window')
  const screen = Dimensions.get('screen')
  const topPadding = statusBarHeight
  const bottomPadding = screen.height - window.height - topPadding
  const isDraggable = useRef(false)
  //   const insets = useSafeAreaInsets()

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT)
        }
      }
    },
    [moving],
  )

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart() {
        // isDraggable.current = true
      },
      onActive(event) {
        if (moving) {
          const positionY = event.absoluteY + scrollY.value

          if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD - 100) {
            // Scroll up
            scrollY.value = withTiming(0, {duration: 1500})
          } else if (positionY >= scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD) {
            // Scroll down
            const contentHeight = songsCount * SONG_HEIGHT
            const containerHeight = dimensions.height - topPadding - bottomPadding
            const maxScroll = contentHeight - containerHeight + 10
            scrollY.value = withTiming(maxScroll, {duration: 1500})
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
        }
      },
      onFinish() {
        top.value = positions.value[id] * SONG_HEIGHT
        runOnJS(setMoving)(false)
      },
    },
    [moving],
  )

  const longPressGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // runOnJS(setMoving)(true)
    },
    onActive: () => {
      // Allow dragging immediately after long press
      runOnJS(setMoving)(true)
    },
    onFinish: () => {
      // runOnJS(setMoving)(false)
    },
  })

  const animatedStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      backgroundColor: moving ? 'red' : 'white',
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
    <Animated.View ref={ref} style={[animatedStyle]}>
      <LongPressGestureHandler
        onGestureEvent={longPressGestureHandler}
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.ACTIVE) {
            // setMoving(true)
          } else if (
            event.nativeEvent.state === State.END ||
            event.nativeEvent.state === State.CANCELLED ||
            event.nativeEvent.state === State.FAILED
          ) {
            // setMoving(false)
          }
        }}
        minDurationMs={500}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={moving ? gestureHandler : null}>
            <Animated.View>
              <Song artist={artist} cover={cover} title={title} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </LongPressGestureHandler>
    </Animated.View>
  )
}

const DraggableList: React.FC = () => {
  const scrollY = useSharedValue(0)
  const positions = useSharedValue(listToObject(SONGS))
  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })
  const scrollViewRef = useAnimatedRef<Animated.FlatList<string>>()

  useAnimatedReaction(
    () => scrollY.value,
    scrolling => {
      scrollTo(scrollViewRef, 0, scrolling, false)
    },
  )

  const renderItem: any = useCallback(
    ({item, index}: any) => (
      <MovableSong
        key={item.id}
        id={item.id}
        artist={item.artist}
        cover={item.cover}
        title={item.title}
        positions={positions}
        scrollY={scrollY}
        songsCount={SONGS.length}
      />
    ),
    [positions, scrollY],
  )

  const renderCellComponent = useCallback(
    ({item, index, children, style, ...props}: any) => (
      <MovableSong
        key={item.id}
        id={item.id}
        artist={item.artist}
        cover={item.cover}
        title={item.title}
        positions={positions}
        scrollY={scrollY}
        songsCount={SONGS.length}
      />
    ),
    [positions, scrollY],
  )

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          {/* <SafeAreaView style={{flex: 1}}> */}
          <StatusBar barStyle="dark-content" />
          {/* <SafeAreaProvider> */}
          <AnimatedFlatList
            data={SONGS ?? []}
            ref={scrollViewRef}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            style={{backgroundColor: 'white'}}
            contentContainerStyle={{height: SONGS.length * SONG_HEIGHT}}
            keyExtractor={(item: any) => `${item.id}`}
            removeClippedSubviews={false}
            renderItem={renderItem}
            CellRendererComponent={renderCellComponent}
          />
        </View>
      </GestureHandlerRootView>
    </>
  )
}

DraggableList.displayName = 'DraggableList'

export default DraggableList
