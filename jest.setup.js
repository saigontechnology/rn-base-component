/* eslint-disable @typescript-eslint/no-var-requires */
global.ReanimatedDataMock = {
  now: () => Date.now(),
}

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

require('react-native-reanimated/lib/module/reanimated2/jestUtils').setUpTests()
