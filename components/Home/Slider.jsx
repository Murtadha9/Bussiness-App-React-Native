import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    const getSliderList = async () => {
      setSliderList([]);
      const q = query(collection(db, "slider"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSliderList((prev) => [...prev, doc.data()]);
      });
    };
    getSliderList();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 20, paddingLeft:20,paddingTop:20,marginBottom:5 ,fontWeight:'bold'}}># Special for you</Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20}}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: 300, height: 160 ,borderRadius:15 ,marginRight:20}}
          />
  )}
      />
    </View>
  );
};

export default Slider;
