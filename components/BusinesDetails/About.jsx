import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const About = ({business}) => {
  return (
    <View style={{padding:20,backgroundColor:'#fff'}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>About</Text>
      <ScrollView>
      <Text style={{lineHeight:25}}>{business?.about}</Text>
      </ScrollView>
    </View>
  )
}

export default About