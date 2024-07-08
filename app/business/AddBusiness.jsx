import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "@firebase/firestore";
import { db, storage } from "./../../config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

const AddBusiness = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const { user } = useUser();
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerStyle:{
        backgroundColor: Colors.PRIMIRY,
        color: "#fff"
    }
    });

    getCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,

      quality: 1,
    });
    setImage(result?.assets[0].uri);
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        { label: doc.data().name, value: doc.id },
      ]);
    });
  };

  const onAdd = async () => {
    const fileName = Date.now().toString() + ".jpg";
    const response = await fetch(image);
    const blob = await response.blob();

    const imageRef = ref(storage, "images/" + fileName);

    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("image uploaded");
      })
      .then((response) => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          savedBuisness(downloadURL);
        });
      });
  };

  const savedBuisness = async (imageUrl) => {
    await setDoc(doc(db, "BussinessList", Date.now().toString()), {
      name: name,
      adress: adress,
      contact: contact,
      website: website,
      about: about,
      category: category,
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
      imageUrl: imageUrl,
    });
    ToastAndroid.show("New Bussiness Added Success", ToastAndroid.LONG);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>AddBusiness</Text>
      <Text>Fill All Detials in order to add New Business</Text>

      <TouchableOpacity onPress={() => onImagePick()} style={{ marginTop: 20 }}>
        {!image ? (
          <Image
            source={require("./../../assets/images/loggo.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 20 }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "#fff",
            fontSize: 18,
            borderColor: Colors.PRIMIRY,
          }}
        />

        <TextInput
          onChangeText={(v) => setAdress(v)}
          placeholder="Address"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "#fff",
            fontSize: 18,
            borderColor: Colors.PRIMIRY,
          }}
        />

        <TextInput
          onChangeText={(v) => setContact(v)}
          placeholder="Contact"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "#fff",
            fontSize: 18,
            borderColor: Colors.PRIMIRY,
          }}
        />

        <TextInput
          onChangeText={(v) => setWebsite(v)}
          placeholder="Website"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "#fff",
            fontSize: 18,
            borderColor: Colors.PRIMIRY,
          }}
        />

        <TextInput
          onChangeText={(v) => setAbout(v)}
          placeholder="About"
          multiline
          numberOfLines={5}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "#fff",
            fontSize: 18,
            borderColor: Colors.PRIMIRY,
            height: 100,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "#fff",
            fontSize: 18,
            borderColor: Colors.PRIMIRY,
          }}
        >
          <RNPickerSelect
            onValueChange={(v) => setCategory(v)}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onAdd()}
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMIRY,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddBusiness;
