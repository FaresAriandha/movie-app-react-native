import React from 'react'
import { View, Text, Button } from 'react-native'

const MovieDetail = ({ navigation }: any): any => {
  const fetchData = (): void => {
    // Gantilah dengan akses token Anda
    const ACCESS_TOKEN =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjlkMzNhMjc0NWQwZWFmYzA5YTcwMGRhM2M3NTBkMSIsIm5iZiI6MTcxOTIzOTUxNy40NDgyNzEsInN1YiI6IjY2Nzk4MjFmOTdkMDQ3YWNlNTNiM2VjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HEK6kHezJeSjIS-HuGeYWwP4Y5UGioye6Ot3q88cNTk'

    const url =
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Movie Detail</Text>
      <Button
        title="Fetch Data"
        onPress={() => {
          // fetchData()
          navigation.goBack()
        }}
      />
    </View>
  )
}

export default MovieDetail
