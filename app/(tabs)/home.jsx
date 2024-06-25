import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'

const home = () => {
  return (
    <View>
      {/*header*/}
      <Header/>

      {/*slider*/}
      <Slider/>


      {/*category*/}
      <Category/>


      {/*popular bussiness list*/}
    </View>
  )
}

export default home