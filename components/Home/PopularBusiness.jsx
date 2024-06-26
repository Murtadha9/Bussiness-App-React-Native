import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PopBusinessCard from "./PopBusinessCard";

const PopularBusiness = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    const getBusinessList = async () => {
      setBusinessList([]);
      const q = query(collection(db, "BussinessList"), limit(10));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setBusinessList((prev) => [...prev, doc.data()]);
      });
    };
    getBusinessList();
  }, []);

  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginBottom:10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Popular Business
        </Text>

        <Text style={{ color: Colors.PRIMIRY }}>View All</Text>
      </View>

      <FlatList
        data={businessList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => <PopBusinessCard business={item} />}

      />
    </View>
  );
};

export default PopularBusiness;
