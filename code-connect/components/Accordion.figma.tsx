import React from 'react'
import figma from '@figma/code-connect'
import {Accordion, Icon, Typography} from 'rn-base-component'
import {StyleSheet, View} from 'react-native'

const ACCORDION_FIGMA_URL = '<FIGMA_ACCORDION>'

const accordionProps = {
  title: figma.string('label_text'),
  expandMultiple: figma.enum('state', {
    expand: true,
    collapse: false,
    disabled: false,
  }),
  leadingIcon: figma.boolean('leading_icon', {
    true: <Icon source={require('@/assets/images/leading_icon.png')} />,
    false: undefined,
  }),
  trailingIcon: figma.boolean('trailing_icon', {
    true: <Icon source={require('@/assets/images/trailing_icon.png')} />,
    false: undefined,
  }),
  groupButtons: figma.boolean('group_buttons', {
    true: figma.children('button'),
    false: undefined,
  }),
  onPress: () => {
    /* TODO: Handle onPress */
  },
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  headerContent: {
    flexDirection: 'row',
  },
})

figma.connect(Accordion, ACCORDION_FIGMA_URL, {
  props: accordionProps,
  example: ({trailingIcon, leadingIcon, groupButtons, title, ...props}) => (
    <Accordion
      {...props}
      title={title}
      sections={[
        {
          title,
          content: 'Lorem ipsum dolor sit amet',
        },
      ]}
      renderHeader={(item, _, __, keyExtractorItem) => (
        <View style={styles.headerContent} key={keyExtractorItem}>
          {leadingIcon}
          <Typography variant="bold">{item.title}</Typography>
          {trailingIcon}
        </View>
      )}
      renderContent={item => (
        <View>
          <Typography variant="regular">{item.content}</Typography>
          <View style={styles.buttonContainer}>{groupButtons}</View>
        </View>
      )}
    />
  ),
})
