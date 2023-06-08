import { View, Text, TouchableOpacity, Modal, ToastAndroid, TextInput, FlatList, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { isNumber, isPrice } from './Validate';

export default function ListFoods() {

    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(0)
    const [food_image_url, setFood_image_url] = useState("")
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [price, setPrice] = useState(0)


    React.useEffect(() => {
        getFoods();
    }, [])

    const url = "http://10.24.24.27:3000/Foods/"

    const getFoods = async () => {
        await fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const deleteFoods = (id) => {
        fetch(url + id, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    ToastAndroid.show('Đã Xóa!', ToastAndroid.SHORT);
                    getFoods();
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    const editFoods = (id, food_image_url, name, ingredients, price) => {
        fetch(url + id, {
            method: "PUT",
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
        }).then((res) => {
            if (res.status == 200) {
                ToastAndroid.show('Sửa Thành Công!', ToastAndroid.SHORT);
                getFoods();
            }
        })
            .catch((ex) => {
                console.log(ex);
            })
    }


    const edit = (id, food_image_url, name, ingredients, price) => {
        setVisible(true)
        setId(id)
        setFood_image_url(food_image_url)
        setName(name)
        setIngredients(ingredients)
        setPrice(price)
    }


    function Item({ id, food_image_url, name, ingredients, price }) {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',

                backgroundColor: '#C0C0C0',
                padding: 0,
                marginVertical: 3,
                marginHorizontal: 5,
                flexDirection: 'row',
                borderRadius: 10
            }}>
                <Image style={{
                    height: 100,
                    width: 100
                }} source={{ uri: food_image_url }} />

                <View style={{
                    flex: 3,
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: '#C0C0C0',
                    padding: 0,
                    marginVertical: 3,
                    marginHorizontal: 5,
                    flexDirection: 'row',
                    borderRadius: 2
                }}>

                    <View style={{
                        margin: 5,
                        marginLeft: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3,

                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Tên Món Ăn:  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {name}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3,
                            height: 50
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Nguyên Liệu:  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {ingredients}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Giá :  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {
                                    (isPrice(price)) ? "Giá Cao  : " : "Giá Thấp  : "
                                }
                                {price}
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={{
                    flex: 0.5,
                }}>
                    <TouchableOpacity
                        style={{
                            marginBottom: 10
                        }}

                        onPress={() => {
                            Alert.alert('Cảnh Báo !', 'Bạn muốn xóa mục này.', [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        deleteFoods(id);
                                        getFoods();
                                    }
                                },
                            ]);
                        }}
                    >
                        <Image source={require("../ImageEX/Delete.png")} style={{
                            width: 20,
                            height: 20,
                            marginRight: 20
                        }} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            edit(id, food_image_url, name, ingredients, price)
                        }}
                    >
                        <Image source={require("../ImageEX/Note.png")} style={{
                            width: 20,
                            height: 20,
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }




    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1
        }}>
            <View style={{
                flex: 1,

                borderWidth: 1,
                marginLeft: 10,
                marginRight: 10,
            }}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <View style={{
                            margin: 30,
                            backgroundColor: "#CCCCCC",
                            borderRadius: 10,
                            padding: 20,
                        }}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: "center",
                                marginBottom: 30
                            }}>
                                {"Chỉnh Sửa"}
                            </Text>
                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5
                                }}
                                placeholder="Link Ảnh Món Ăn"
                                value={food_image_url}
                                onChangeText={(text) => setFood_image_url(text)}
                            />

                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5
                                }}
                                placeholder="Tên Món Ăn"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5
                                }}
                                placeholder="Nguyên Liệu"
                                value={ingredients}
                                onChangeText={(text) => setIngredients(text)}
                            />
                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                placeholder="Giá"
                                value={price}
                                onChangeText={(text) => setPrice(text)}
                            />

                            <View style={{ justifyContent: "space-around", alignItems: 'center', flexDirection: 'row', }}>
                                <TouchableOpacity style={{
                                    borderRadius: 10,
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    marginTop: 20,
                                    backgroundColor: 'blue',
                                    marginLeft: 10
                                }}
                                    onPress={() => {
                                        if (!food_image_url || !name || !price || !ingredients) {
                                            Alert.alert("Lỗi", "Vui Lòng Nhập đầy đủ thông tin.")
                                        } else if (isNumber(price) == false) {
                                            Alert.alert("Lỗi", "Giá Phải Là Số.")
                                        } else if (price < 0) {
                                            Alert.alert("Lỗi", "Giá Không Được Âm.")
                                        } else {
                                            editFoods(id, food_image_url, name, ingredients, price)
                                            getFoods()
                                            setVisible(false)
                                        }
                                    }}
                                >
                                    <Text style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}>SAVE</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    borderRadius: 10,
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    marginTop: 20,
                                    marginLeft: 10,
                                    backgroundColor: 'blue'
                                }}

                                    onPress={() => {
                                        setVisible(false)
                                        getFoods()
                                    }}
                                >
                                    <Text style={{
                                        color: '#f44', color: "white",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}>Cancle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    (
                        <Item food_image_url={item.food_image_url}
                            name={item.name}
                            ingredients={item.ingredients}
                            price={item.price}
                            id={item.id} />
                    )
                    }
                />
            </View>

        </View>
    )
}