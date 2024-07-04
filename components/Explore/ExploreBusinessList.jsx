import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCart from "./BusinessListCart";

const ExploreBusinessList = ({ businessList }) => {
  return (
    <ScrollView>
      <FlatList
        data={businessList}
        scrollEnabled
        renderItem={({ item, index }) => (
          <BusinessListCart business={item} key={index}/>
        )}
      />
    </ScrollView>
  );
};

export default ExploreBusinessList;
