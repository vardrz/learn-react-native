import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { createCustomer } from '../../../service/customer'
import { useAuth } from '../../../contexts/AuthContext'

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
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    width: "80%",
                }}
            >
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

            <TouchableOpacity
                style={{
                    width: "80%",
                    height: "50",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 10
                }}
                onPress={() => handleSave()}
            >
                <Text style={{color: "white"}}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: "80%",
                    height: "50",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50,
                    borderRadius: 10
                }}
                onPress={() => router.back()}
            >
                <Text style={{color: "white"}}>Back</Text>
            </TouchableOpacity>
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