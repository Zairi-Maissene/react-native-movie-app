// theme.js

import { DefaultTheme, Theme } from '@react-navigation/native';

export const darkTheme: Theme = {
  dark: true,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0A1C2E', // Dark blue background
    primary: '#FFFFFF', // White primary color
    card: '#1C3B57', // Slightly lighter blue for cards
    text: '#FFFFFF', // White text
    border: '#00bcd4', // Cyan border
    notification: '#00bcd4', // Cyan notifications
  },
};

export const lightTheme: Theme = {
  dark: false,
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF', // White background
    primary: '#090088', // Dark blue primary color
    card: '#E6F7FF', // Light blue for cards
    text: '#090088', // Dark blue text
    notification: 'rgba(0, 0, 139, 0.1)', // Slightly transparent dark blue notifications
    border: 'rgba(0, 0, 139, 0.2)', // Slightly transparent dark blue border
  },
};

export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);
