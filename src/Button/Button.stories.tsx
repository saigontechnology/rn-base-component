import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import type {ComponentMeta, ComponentStory} from '@storybook/react'

import {Button} from './Button'
import {metrics} from '../helpers/metrics'

export default {
  title: 'components/MyButton',
  component: Button,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as ComponentMeta<typeof Button>

export const ButtonComponent: ComponentStory<typeof Button> = () => {
  const imgUrl = 'https://kenh14cdn.com/203336854389633024/2023/1/17/photo-12-1673980290121902612775.jpeg'

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddingBottom}>
      <Text style={styles.subHeader}>Basic Buttons</Text>
      <Button
        title={
          <View>
            <Text>Custom Title</Text>
            <Text>Description</Text>
          </View>
        }
        titleStyle={styles.whiteText}
        buttonStyle={styles.backgroundPrimary}
        containerStyle={styles.basicContainer}
      />
      <Button
        title="Basic Button"
        buttonStyle={styles.basicButton}
        titleStyle={styles.whiteText}
        containerStyle={styles.basicContainer}
      />
      <Button
        title="Dark"
        buttonStyle={styles.darkButton}
        containerStyle={styles.basicContainer}
        titleStyle={styles.whiteText}
      />
      <Button
        title="Log in"
        loading={false}
        loadingProps={{size: 'small', color: 'white'}}
        buttonStyle={styles.loginButton}
        titleStyle={styles.loginText}
        containerStyle={styles.loginContainer}
        onPress={() => console.log('aye')}
      />
      <Button
        title="Secondary"
        buttonStyle={styles.secondaryButton}
        containerStyle={styles.secondaryContainer}
        titleStyle={styles.whiteText}
      />
      <Button
        title="Warning"
        containerStyle={styles.warningContainer}
        buttonStyle={styles.warningButton}
        titleStyle={styles.whiteText}
      />
      <Button
        title="Danger"
        buttonStyle={styles.warningButton}
        containerStyle={styles.warningContainer}
        titleStyle={styles.whiteText}
      />
      <Button
        title="Request an agent"
        titleStyle={styles.agentText}
        buttonStyle={styles.agentButton}
        containerStyle={styles.agentContainer}
      />
      <Button
        title="DISABLED"
        disabled
        buttonStyle={styles.disabledButton}
        containerStyle={styles.disabledContainer}
      />
      <Text style={styles.subHeader}>Rounded Buttons</Text>
      <Button
        title="log in"
        buttonStyle={styles.loginRoundedButton}
        uppercase
        containerStyle={styles.loginRoundedContainer}
        titleStyle={styles.whiteText}
      />
      <Button
        title="left"
        uppercase
        iconSource={{uri: imgUrl}}
        titleStyle={styles.leftText}
        buttonStyle={styles.leftButton}
        containerStyle={styles.leftContainer}
      />
      <Button
        title="right"
        uppercase
        iconSource={{uri: imgUrl}}
        iconPosition={'right'}
        titleStyle={styles.leftText}
        buttonStyle={styles.leftButton}
        containerStyle={styles.leftContainer}
      />
      <Button
        title="top"
        uppercase
        iconSource={{uri: imgUrl}}
        iconPosition={'top'}
        titleStyle={styles.leftText}
        buttonStyle={styles.leftButton}
        containerStyle={styles.leftContainer}
      />
      <Button
        title="bottom"
        uppercase
        iconSource={{uri: imgUrl}}
        iconPosition={'bottom'}
        titleStyle={styles.leftText}
        buttonStyle={styles.leftButton}
        containerStyle={styles.leftContainer}
      />
      <Button
        title={
          <View>
            <Text style={styles.title}>First Name</Text>
            <Text style={styles.subTitle}>Last Name</Text>
          </View>
        }
        iconSource={{uri: imgUrl}}
        iconPosition={'right'}
        iconSize={metrics.huge}
        resizeMode={'cover'}
        titleStyle={styles.leftText}
        buttonStyle={styles.leftButton}
        containerStyle={styles.leftContainer}
      />
      <Text style={styles.subHeader}>Border Buttons</Text>
      <Button
        title="Border Button"
        buttonStyle={styles.borderButton}
        titleStyle={styles.color}
        containerStyle={styles.leftContainer}
      />
      <Button title="Clear Button" titleStyle={styles.color} containerStyle={styles.leftContainer} />
      <Text style={styles.subHeader}>Loading Buttons</Text>
      <Button
        title="HOME"
        loading
        titleStyle={styles.leftText}
        buttonStyle={styles.homeButton}
        containerStyle={styles.homeContainer}
      />
      <Button
        title="SIGN UP"
        loading
        loadingProps={{
          size: 'small',
          color: 'rgba(111, 202, 186, 1)',
        }}
        titleStyle={styles.leftText}
        buttonStyle={styles.signupButton}
        containerStyle={styles.leftContainer}
      />
    </ScrollView>
  )
}

ButtonComponent.args = {
  title: 'Basic Button',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingBottom: {
    paddingBottom: 100,
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginVertical: 10,
  },
  basicContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  backgroundPrimary: {
    backgroundColor: '#65c8c6',
  },
  basicButton: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 3,
  },
  darkButton: {
    backgroundColor: 'rgba(39, 39, 39, 1)',
  },
  loginButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    borderRadius: 5,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  loginContainer: {
    marginHorizontal: 50,
    height: 50,
    width: 200,
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(127, 220, 103, 1)',
  },
  secondaryContainer: {
    height: 40,
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  warningButton: {
    backgroundColor: 'rgba(255, 193, 7, 1)',
  },
  warningContainer: {
    height: 40,
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  agentButton: {
    backgroundColor: 'rgba(199, 43, 98, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  agentContainer: {
    width: 200,
    height: 45,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  agentText: {
    fontWeight: '500',
    color: '#ffffff',
  },
  disabledButton: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  disabledContainer: {
    width: 200,
    height: 45,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  loginRoundedButton: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  loginRoundedContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  leftText: {
    fontWeight: '700',
  },
  leftButton: {
    backgroundColor: 'rgba(90, 154, 230, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  leftContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  borderButton: {
    borderColor: 'rgba(78, 116, 289, 1)',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: 'rgba(111, 202, 186, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 5,
  },
  homeContainer: {
    width: 200,
    height: 40,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
  },
  color: {
    color: 'rgba(78, 116, 289, 1)',
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 14,
  },
})
