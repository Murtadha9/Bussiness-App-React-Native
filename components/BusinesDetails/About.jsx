import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";

const About = ({ business }) => {
  return (
    <View style={{ padding: 10, backgroundColor: "#fff" }}>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
        <Text style={{ lineHeight: 26 }}>{business?.about}</Text>

    </View>
  );
};

export default About;
