import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';

const SearchBar = ({ value, onChangeText, onSubmit }) => {
  const theme  = useTheme();

  return (
    <View style={styles.container}>
      <RNESearchBar
        placeholder="Search movies..."
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmit}
        platform="default"
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.card,
        }}
        inputStyle={{
          color: theme.colors.primary,
        }}
        placeholderTextColor={theme.colors.primary + '80'}  // 80 for 50% opacity
        searchIcon={{ color: theme.colors.primary }}
        clearIcon={{ color: theme.colors.primary }}
        cancelIcon={{ color: theme.colors.primary }}
        round
        width="100%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default SearchBar;