import React, {useCallback} from 'react'
import type {ComponentMeta, ComponentStory} from '@storybook/react'
import {View, Button, Text, StyleSheet} from 'react-native'
import Modal from './Modal'

export default {
  title: 'components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

export const ModalComponent: ComponentStory<typeof Modal> = () => {
  const [visible, setVisible] = React.useState(false)

  const showModal = useCallback(() => setVisible(true), [])
  const hideModal = useCallback(() => setVisible(false), [])

  return (
    <View style={styles.viewContainer}>
      <Modal visible={visible} onClose={hideModal} contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <Text>Modal content</Text>
          <Button title="Close" onPress={hideModal} />
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Button onPress={showModal} title="Show" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
