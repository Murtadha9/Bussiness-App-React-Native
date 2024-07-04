import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PopBusinessCard = ({ business }) => {
  const router=useRouter()
  return (
    <TouchableOpacity
    onPress={()=>router.push('/buisnessdetials/'+business?.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <View>
        <Image
          source={{ uri: business?.imageUrl }}
          style={{ width: 200, height: 130, borderRadius: 15 }}
        />
      </View>

      <View style={{ marginTop: 7 }}>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>{business.name}</Text>
        <Text style={{ fontSize: 12, color: Colors.PRIMIRY }}>
          {business.adress}
        </Text>
      </View>

      <View style={{display:'flex', flexDirection:'row' ,justifyContent:'space-between'}}>
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <FontAwesome name="star" size={24} color="orange" />
          <Text>4.5</Text>
        </View>

        <Text style={{backgroundColor:Colors.PRIMIRY, color:'#fff' , padding:3,fontSize:12,borderRadius:5}}>{business.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopBusinessCard;
