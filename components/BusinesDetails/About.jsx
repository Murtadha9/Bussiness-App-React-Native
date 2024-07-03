import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";

const About = ({ business }) => {
  return (
    <View style={{ padding: 10, backgroundColor: "#fff", height: "100%" }}>
      <ScrollView >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
        <Text style={{ lineHeight: 25 }}>{business?.about}</Text>
      </ScrollView>
    </View>
  );
};

export default About;
