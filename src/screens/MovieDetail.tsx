import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Movie } from '../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../components/movies/MovieList'

const MovieDetail = ({ route }: any): JSX.Element => {
  const navigation = useNavigation()
  const { id, movieName } = route.params
  const [status, setStatus] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [movieDetail, setMovieDetail] = useState<Movie>({})
  useEffect(() => {
    navigation.setOptions({ title: movieName })
    getMovieByMovieID()
  }, [])
  const getMovieByMovieID = (): void => {
    setStatus('loading')
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieDetail(response)
        setStatus('success')
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  } else if (status === 'success') {
    const formattedDate = format(movieDetail.release_date, 'EEE MMM dd yyyy')
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ScrollView>
          <ImageBackground
            resizeMode="cover"
            style={[{ width: '100%', height: 250 }]}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`,
            }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
              locations={[0.6, 0.8]}
              style={styles.gradientStyle}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}
              >
                <View style={{ marginBottom: 5 }}>
                  <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color="yellow" />
                    <Text style={styles.rating}>
                      {movieDetail.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsFavorite(!isFavorite)
                  }}
                >
                  <FontAwesome
                    name={`${isFavorite ? 'heart' : 'heart-o'}`}
                    size={20}
                    color="red"
                    style={{ padding: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View
            style={{ width: '100%', paddingHorizontal: 16, marginVertical: 20 }}
          >
            <Text>{movieDetail.overview}</Text>
          </View>

          {/* Kotak Informasi */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <View
              style={{
                width: '100%',
                paddingHorizontal: 16,
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 700 }}>Original Language</Text>
                <Text>{movieDetail.spoken_languages[0].english_name}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: 700 }}>Release Date</Text>
                <Text>{formattedDate}</Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                paddingHorizontal: 16,
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 700 }}>Popularity</Text>
                <Text>{movieDetail.popularity}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: 700 }}>Vote Count</Text>
                <Text>{movieDetail.vote_count}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 20 }}>
            <MovieList
              title={'Recommendation'}
              path={`movie/${id}/recommendations`}
              coverType={'poster'}
              key={'Recommendation'}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    marginRight: 4,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    padding: 4,
    fontSize: 20,
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    padding: 4,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
  },
})

export default MovieDetail
