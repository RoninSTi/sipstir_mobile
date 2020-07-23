import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Button, ActivityIndicator } from 'react-native-paper'
import useKeyboard from '../hooks/useKeyboard'

const styles = StyleSheet.create({
  animatedButton: {
    alignItems: 'center',
    backgroundColor: '#5177FF',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  button: {
    padding: 0,
    borderRadius: 20,
    marginLeft: 14,
  },
  container: {
    alignItems: 'center',
    height: 68,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 14,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    color: '#434343',
    height: 44,
    paddingLeft: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

const CaptionInput = ({
  autoFocus,
  backgroundColor,
  hideButton,
  isLoading,
  onChangeText,
  onPress,
  placeholder,
  showButtonOnFocus,
  title,
  value,
}) => {
  const [buttonWidth, setButtonWidth] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const animatedWidth = useRef(new Animated.Value(0)).current

  const [visible] = useKeyboard()

  useEffect(() => {
    if (!visible && !isLoading) {
      setShowButton(false)
    }
  }, [visible])

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: showButton ? buttonWidth : 0,
      delay: showButton ? 400 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }, [showButton])

  const onFocus = () => {
    if (showButtonOnFocus) {
      setShowButton(true)
    }
  }

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout

    setButtonWidth(width)
  }

  const AnimatedButton = () => (
    <TouchableOpacity onPress={onPress} style={[styles.button, styles.animatedButton]}>
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text ellipsizeMode="clip" numberOfLines={1} style={styles.buttonText}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={{ flex: 1 }}>
        <TextInput
          autoFocus={autoFocus}
          onFocus={onFocus}
          onChangeText={onChangeText}
          onSubmitEditing={onPress}
          placeholder={placeholder}
          placeholderTextColor="#979797"
          style={styles.textInput}
          value={value}
        />
      </View>
      {!hideButton && !showButtonOnFocus && (
        <Button
          color="#5177FF"
          loading={isLoading}
          mode="contained"
          onPress={onPress}
          style={styles.button}>
          {title}
        </Button>
      )}
      {showButtonOnFocus && (
        <>
          <View onLayout={onLayout} style={{ position: 'absolute', top: 5000 }}>
            <AnimatedButton />
          </View>
          <Animated.View style={{ overflow: 'hidden', width: animatedWidth }}>
            <AnimatedButton />
          </Animated.View>
        </>
      )}
    </View>
  )
}

CaptionInput.defaultProps = {
  autoFocus: false,
  backgroundColor: '#FFFFFF',
  hideButton: false,
  isLoading: false,
  placeholder: '',
  onChangeText: () => {},
  onPress: () => {},
  showButtonOnFocus: false,
  title: '',
  value: '',
}

CaptionInput.propTypes = {
  autoFocus: PropTypes.bool,
  backgroundColor: PropTypes.string,
  hideButton: PropTypes.bool,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  onPress: PropTypes.func,
  showButtonOnFocus: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
}

export default CaptionInput
