module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-react-docgen-typescript',
      {
        docgenCollectionName: 'STORYBOOK_REACT_CLASSES',
        include: 'components.*\\.tsx$',
        exclude: 'stories\\.tsx$',
      },
    ],
  ],
}
