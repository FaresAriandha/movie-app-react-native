import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Home({ navigation }): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Movie Page</Text>
      <Button
        title="Pergi ke Movie Detail"
        onPress={() => navigation.navigate('MovieDetail')}
      />
    </View>
  )
}
