import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { updateProduct } from '../../../service/products'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '../../../components/button'

export default function EditProduct() {
    const product = useLocalSearchParams();
    const { token } = useAuth();
    
    const [data, setData] = useState({
        nama: product.nama,
        deskripsi: product.deskripsi,
    })

    const handleUpdate = async () => {
        if(data.nama && data.deskripsi){
            if(data.nama == product.nama && data.deskripsi == product.deskripsi){
                alert("Tidak ada perubahan")
                return;
            }

            const response = await updateProduct(token, product.ID, data);

            if(response.status){
                alert("Sukses update produk");
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
                >Edit Data</Text>

                <TextInput
                    placeholder='Nama'
                    style={styles.input}
                    defaultValue={data.nama}
                    onChangeText={(value) => setData({...data, nama: value})}
                />
                <TextInput
                    placeholder='Deskripsi'
                    style={styles.input}
                    defaultValue={data.deskripsi}
                    onChangeText={(value) => setData({...data, deskripsi: value})}
                />
            </View>

            <Button action={() => handleUpdate()}>Update</Button>

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