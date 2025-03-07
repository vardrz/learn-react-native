import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { createCustomer } from '../../../service/customer'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '../../../components/button'

export default function CreateCustomer() {
    const { token } = useAuth();
    
    const [data, setData] = useState({
        name: null,
        address: null,
        phone: null,
    })

    const handleSave = async () => {
        console.log(data);
        if(data.name && data.address && data.phone){
            const response = await createCustomer(token, data);

            if(response.status){
                alert("Sukses");
                router.replace('/(tabs)/customer');
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
                    placeholder='Name'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, name: value})}
                />
                <TextInput
                    placeholder='Address'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, address: value})}
                />
                <TextInput
                    placeholder='Phone'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, phone: value})}
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