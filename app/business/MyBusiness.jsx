import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "@firebase/firestore";

import { db } from "../../config/FirebaseConfig";
import BusinessListCart from "../../components/BusinessList/BusinessListCart";
import PopBusinessCard from "../../components/Home/PopBusinessCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

const MyBusiness = () => {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation=useNavigation()

  useEffect(() => {
    navigation.setOptions({
        headerTitle: "My Business List",
        headerShown: true,
        headerStyle:{
            backgroundColor: Colors.PRIMIRY,
            color: "#fff"
        }
      });
    user && GetUserBusiness();
  }, [user]);

  const GetUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BussinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>My Business</Text>
      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCart key={index} business={item} />
        )}
      />
    </View>
  );
};

export default MyBusiness;
