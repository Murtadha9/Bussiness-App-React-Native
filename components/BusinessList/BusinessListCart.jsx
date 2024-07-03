import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const BusinessListCart = ({ business }) => {
  const router=useRouter()
  return (
    <TouchableOpacity
    onPress={()=>router.push('/buisnessdetials/'+business.id)}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems:'center'
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />

      <View style={{flex:1 , gap:5}}>
        <Text style={{fontWeight:'bold',fontSize:18}}>{business.name}</Text>
        <Text>{business.adress}</Text>

        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <FontAwesome name="star" size={24} color="orange" />
          <Text>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListCart;
