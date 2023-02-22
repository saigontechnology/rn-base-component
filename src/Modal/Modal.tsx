import React, {memo, forwardRef} from 'react'
import {Modal, View, StyleSheet, Pressable, ViewStyle, StyleProp} from 'react-native'

interface IBaseModalProps {
  /**
   * Defines the visible of the Modal
   * default false
   */
  visible?: boolean
  /**
   * Defines the dismissable of the Modal
   * default true
   */
  dismissable?: boolean
  /**
   * Children element
   */
  children: React.ReactNode
  /**
   * Defines the animationType
   * default 'fade'
   */
  animationType?: 'none' | 'slide' | 'fade' | undefined
  /**
   * Defines background color of backdrop
   * default 'rgba(0,0,0,0.5)'
   */
  backdropColor?: string
  /**
   * ViewStyle for content container view
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * onClose method for close the Modal
   */
  onClose?: () => void
}

const BaseModal = forwardRef<Modal, IBaseModalProps>(
  (
    {
      visible = false,
      dismissable = true,
      animationType = 'fade',
      backdropColor = 'rgba(0,0,0,0.5)',
      contentContainerStyle,
      onClose,
      children,
    },
    ref,
  ) => {
    return (
      <Modal
        ref={ref}
        visible={visible}
        transparent
        animationType={animationType}
        onRequestClose={() => (dismissable ? onClose && onClose() : undefined)}>
        <Pressable
          style={StyleSheet.flatten([styles.backdrop, {backgroundColor: backdropColor}])}
          onPress={dismissable ? onClose : null}>
          <View style={styles.container}>
            <View style={contentContainerStyle}>{children}</View>
          </View>
        </Pressable>
      </Modal>
    )
  },
)

export default memo(BaseModal)

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
