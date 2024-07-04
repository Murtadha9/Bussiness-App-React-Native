import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

const explore = () => {

  const [businessList, setBusinessList] = useState([]);

  const getBuisnessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BussinessList"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>Expolre More</Text>
      {/* search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.PRIMIRY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMIRY} />
        <TextInput placeholder="Search......." style={{ fontSize: 16 }} />
      </View>

      {/* category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBuisnessByCategory(category)}
      />

      {/* business list */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
};

export default explore;
