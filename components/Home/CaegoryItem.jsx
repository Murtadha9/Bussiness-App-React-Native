import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const CaegoryItem = ({ category ,onCategoryPress }) => {
  return (
    <TouchableOpacity onPress={()=>{onCategoryPress(category)}}>
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.GRAY,
          borderRadius: 99,
          marginRight: 15,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <Text style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CaegoryItem;
