import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import CaegoryItem from "./CaegoryItem";
import { useRouter } from "expo-router";

const Category = ({explore=false ,onCategorySelect}) => {
  const [categoryList, setCategoryList] = useState([]);

  const router=useRouter()

  useEffect(() => {
    const getCategoryList = async () => {
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCategoryList((prev) => [...prev, doc.data()]);
      });
    };
    getCategoryList();
  }, []);

  const onCategoryPressHandler = (item) => {
    if(!explore){
      router.push('/businessList/'+item.name)
    }else{
      onCategorySelect(item.name)
    }
  };

  return (
    <View>
      { !explore &&
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Category</Text>

        <Text style={{ color: Colors.PRIMIRY }}>View All</Text>
      </View>
}

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 20 }}
        renderItem={({ item, index }) => (
          <CaegoryItem
            category={item}
            key={index}
            onCategoryPress={(category) => onCategoryPressHandler(item)}
          />
        )}
      />
    </View>
  );
};

export default Category;
