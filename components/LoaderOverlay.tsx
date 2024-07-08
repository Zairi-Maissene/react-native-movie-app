import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useLoading } from '../context/LoadingContext';

const LoaderOverlay = ({ children }) => {
  const { isLoading } = useLoading();
  const scaleValue = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (isLoading) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [isLoading, scaleValue]);

  return (
    <View style={styles.container}>
      {children}
      <Overlay
        isVisible={isLoading}
        overlayStyle={styles.overlay}
        backdropStyle={styles.backdrop}
      >
        <Animated.View style={[styles.loaderContainer, { transform: [{ scale: scaleValue }] }]}>
          <View style={styles.loader} />
        </Animated.View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#00BCD4',
    borderTopColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
});

export default LoaderOverlay;