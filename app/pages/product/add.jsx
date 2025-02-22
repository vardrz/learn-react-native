import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { createProduct } from '../../../service/products'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '../../../components/button'

export default function CreateProduct() {
    const { token } = useAuth();
    
    const [data, setData] = useState({
        nama: null,
        deskripsi: null,
    })

    const handleSave = async () => {
        console.log(data);
        if(data.nama && data.deskripsi){
            const response = await createProduct(token, data);

            if(response.status){
                alert("Sukses");
                router.replace('/(tabs)/product');
            }else{
                alert(response.message);
            }
        }else{
            alert("Isi data yang dibutuhkan")
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 50
            }}
        >
            <View
                style={{
                    width: "100%",
                }}
            >
                <Text
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginBottom: 20,
                        fontSize: 25,
                        fontWeight: "600"
                    }}
                >Tambah Data</Text>
                <TextInput
                    placeholder='Nama'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, nama: value})}
                />
                <TextInput
                    placeholder='Deskripsi'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, deskripsi: value})}
                />
            </View>

            <Button action={() => handleSave()}>Save</Button>

            <Button type="secondary" action={() => router.back()}>Back</Button>
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    border: "black"
  }
})