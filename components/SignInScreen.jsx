import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();
const SignInScreen = () => {


    useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      } else {
        // Handle the case where signIn or signUp might be needed
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);



  return (
    <View>


      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("./../assets/images/favicon.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          Your Ultimate Community{" "}
          <Text style={{ color: Colors.PRIMIRY, fontWeight: "bold" }}>
            Bussiness Directory{" "}
          </Text>
          App
        </Text>

        <Text style={{ fontSize: 15, textAlign: "center", marginVertical: 10 ,color:Colors.GRAY}}>
          Find Your Bussiness Near You And Post Your Own Bussiness To Your
          Community
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={{textAlign:'center',color:'#fff'}}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  
  },
  btn:{
    backgroundColor: Colors.PRIMIRY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
    
  }
});
