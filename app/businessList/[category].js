import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import BusinessListCart from "../../components/BusinessList/BusinessListCart";
import { Colors } from "../../constants/Colors";

const BusinessListByCategory = () => {
  const [businessList, setBusinessList] = useState([]);
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });

    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setBusinessList([]);
    setLoading(true);
    const q = query(
      collection(db, "BussinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, {id:doc?.id, ...doc.data()}]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListCart business={item} key={index} />
          )}
          refreshing={loading}
          onRefresh={getBusinessList}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={"large"}
          color={Colors.PRIMIRY}
        />
      ) : (
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: Colors.PRIMIRY,
            marginTop: "50%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;
