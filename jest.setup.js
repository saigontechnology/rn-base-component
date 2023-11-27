global.ReanimatedDataMock = {
  now: () => Date.now(),
}

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
