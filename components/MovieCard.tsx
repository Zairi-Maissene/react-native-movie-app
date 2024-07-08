import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {ThemedText as Text} from './ThemedText';

const MovieCard = ({ movie }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/${movie.imdbID}`)}
      activeOpacity={0.8}
    >
      <Card containerStyle={{...styles.card, backgroundColor: theme.colors.card}}>
        <Image
          source={{ uri: movie.Poster }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {movie.Title}
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Icon
                name="calendar-today"
                type="material"
                size={16}
                color="#00bcd4"
              />
              <Text style={styles.infoText}>{movie.Year}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon
                name="category"
                type="material"
                size={16}
                color="#00bcd4"
              />
              <Text style={styles.infoText}>{movie.Type}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    borderWidth: 1,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 400,
  },
  contentContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    textTransform: 'capitalize',
    color: "#00bcd4"
  },
});

export default MovieCard;