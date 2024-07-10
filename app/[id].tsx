import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLoading } from '../context/LoadingContext';
import { Card, Divider, Chip, Rating } from 'react-native-elements';
import { ThemedText as Text} from '../components/ThemedText';
import { MovieDetail } from '../types/Movie';
import { Stack } from 'expo-router';
import { fetchMovieDetails as requestMovieDetails } from '../api';


const DetailPage = () => {
  const route = useRoute();
  const { id } = route.params;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const theme = useTheme();



  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await requestMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, setLoading]);


  if (error) {
    return <View style={styles.container}><Text style={styles.errorText}>{error}</Text></View>;
  }

  if (!movie) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  const imdbRating = movie.Ratings.find(rating => rating.Source === "Internet Movie Database");
  return (
    <ScrollView style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Stack.Screen options={{ headerTitle: movie?.Title, headerShown: !!movie.Title }} />
      <Card containerStyle={{...styles.card, backgroundColor: theme.colors.background}}>
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
        <View style={styles.contentContainer}>
          <Text h4 style={styles.title}>{movie.Title}</Text>
          <Text style={styles.subtitle}>{movie.Year} | {movie.Runtime} | {movie.Genre}</Text>
          {imdbRating && (
            <View style={styles.ratingContainer}>
              <Rating
                imageSize={20}
                style={{backgroundColor: 'transparent'}}
                readonly
                startingValue={parseFloat(imdbRating.Value.split('/')[0]) / 2}
              />
              <Text style={styles.ratingText}>({imdbRating.Value})</Text>
            </View>
          )}
          <Divider style={styles.divider} />
          <Text style={styles.plot}>{movie.Plot}</Text>
          <Divider style={styles.divider} />
          <Text>
            <Text style={styles.label}>Director: </Text>
            {movie.Director}
          </Text>
          <Text>
            <Text style={styles.label}>Writers: </Text>
            <Text>{movie.Writer}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Actors: </Text>
            {movie.Actors}
          </Text>
          <View style={styles.chipContainer}>
            {movie.Ratings.map((rating, index) => (
              <Chip
                key={index}
                title={`${rating.Source}: ${rating.Value}`}
                type="outline"
                containerStyle={styles.chip}
              />
            ))}
          </View>
          <Divider style={styles.divider} />
          <Text>
            <Text style={styles.label}>Awards: </Text>
            {movie.Awards}
          </Text>
          <Text>
            <Text style={styles.label}>Language: </Text>
            {movie.Language}
          </Text>
          <Text>
            <Text style={styles.label}>Country: </Text>
            {movie.Country}
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 15,
    padding: 15,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  contentContainer: {
    marginTop: 15,
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 10,
  },
  plot: {
    marginBottom: 10,
  },
  label: {
    color: '#00bcd4',
    fontWeight: 'bold',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
});

export default DetailPage;