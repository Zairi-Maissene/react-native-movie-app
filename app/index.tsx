import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import MovieCard from '../components/MovieCard';
import useDebounce  from '../hooks/useDebounce';
import { useLoading } from '../context/LoadingContext';
import { BASE_API_URL } from '../constants/api';
import SearchBar from '../components/ThemedSearchBar';
import { ThemedText as Text } from '../components/ThemedText';

const API_KEY = process.env.EXPO_PUBLIC_MOVIES_API_KEY;
const BASE_URL = BASE_API_URL;

const MoviesScreen = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const { setLoading } = useLoading();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedSearch) {
        setMovies([]);
        setTotalResults(0);
        setCurrentPage(1);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?s=${debouncedSearch}&apikey=${API_KEY}&page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        if (data.Response === 'False') {
          throw new Error('No movies matching the search term were found.');
        }
        setMovies((prev) => [...prev, ...data.Search]);
        setTotalResults(Number(data.totalResults) || 0);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch movies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch, setLoading, currentPage]);

  const renderMovieItem = ({ item }) => (
    <MovieCard movie={item} />
  );

  const renderNoMoviesFound = () => (
    <View style={styles.noMoviesContainer}>
      <Icon name="movie" size={100} color="#888" />
      <Text h4 style={styles.noMoviesText}>Start your movie search adventure!</Text>
      <Text style={styles.noMoviesSubtext}>Enter a movie title above to explore our vast collection.</Text>
    </View>
  );

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Text type="title" style={styles.title}>Search Movies</Text>
      <SearchBar
        placeholder="Search for movies"
        onChangeText={setSearch}
        value={search}
        platform="default"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {movies.length === 0 && !error ? (
        renderNoMoviesFound()
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          onEndReached={() => {
            if (movies.length < totalResults) {
              setCurrentPage(currentPage + 1);
            }
          }}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            movies.length < totalResults ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  poster: {
    aspectRatio: 2/3,
    width: '100%',
  },
  year: {
    textAlign: 'center',
    marginTop: 5,
  },
  noMoviesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoviesText: {
    textAlign: 'center',
    marginTop: 20,
  },
  noMoviesSubtext: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MoviesScreen;