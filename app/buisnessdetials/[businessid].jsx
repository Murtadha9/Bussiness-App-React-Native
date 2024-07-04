import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinesDetails/Intro";
import ActionButton from "../../components/BusinesDetails/ActionButton";
import About from "../../components/BusinesDetails/About";

import Reviews from "../../components/BusinesDetails/Reviews";

const BusinessDetials = () => {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBusinessDetialsById = async () => {
    setLoading(true);
    const docRef = doc(db, "BussinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness({id:docSnap.id , ...docSnap.data()});
      setLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getBusinessDetialsById();
  }, []);
  return (
 
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "60%" }}
          size={"large"}
          color={Colors.PRIMIRY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={business}/>

          {/* Action Buttons */}
          <ActionButton business={business}/>


          {/* About Section */}
          <About business={business}/>

          {/* Review Section */}
          <Reviews business={business}/>


        </View>
      )}
    </ScrollView>

  );
};

export default BusinessDetials;
