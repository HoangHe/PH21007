import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { isNumber } from './Validate';
import { useNavigation } from '@react-navigation/native';

export default function AddFoods() {

    const [food_image_url, setFood_image_url] = useState("")
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [price, setPrice] = useState(0)
    const navigation = useNavigation();


    const url = 'http://10.24.24.27:3000/Foods'

    const AddSubject = (food_image_url, name, ingredients, price) => {
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "food_image_url": food_image_url,
                "name": name,
                "ingredients": ingredients,
                "price": price,
            })
        })
            .then((res) => {
                if (res.status == 201) {
                    ToastAndroid.show('Thêm Thành Công.', ToastAndroid.SHORT);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Nhập Link Ảnh Món Ăn"
                placeholderTextColor={"#BBBBBB"}
                value={food_image_url}
                onChangeText={(text) => setFood_image_url(text)}
            />

            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Tên Món Ăn"
                placeholderTextColor={"#BBBBBB"}
                value={name}
                onChangeText={(text) => setName(text)}
            />
             <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Nguyên Liệu"
                placeholderTextColor={"#BBBBBB"}
                value={ingredients}
                onChangeText={(text) => setIngredients(text)}
            />
            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Giá"
                placeholderTextColor={"#BBBBBB"}
                value={price}
                onChangeText={(text) => setPrice(text)}
            />
            

            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 30,
                    alignItems: "center",
                    margin: 40,
                    justifyContent: 'center'
                }}
                    onPress={() => {
                        if (!food_image_url || !name || !price || !ingredients) {
                            Alert.alert("Lỗi", "Vui Lòng Nhập đầy đủ thông tin.")
                        } else if (isNumber(price) == false) {
                            Alert.alert("Lỗi", "Giá Phải Là Số.")
                        } else if (price < 0) {
                            Alert.alert("Lỗi", "Giá Không Được Âm.")
                        } else {
                            AddSubject(food_image_url, name, ingredients, price)
                        }
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 20,
                    }}>
                        SAVE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 30,
                    alignItems: "center",
                    margin: 40
                }}
                    onPress={() => {
                        navigation.navigate("ListFoods")
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 20,
                    }}>
                        SHOW
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}
