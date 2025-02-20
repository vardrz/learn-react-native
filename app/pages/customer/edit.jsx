import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { updateCustomer } from '../../../service/customer'
import { useAuth } from '../../../contexts/AuthContext'
import { Button } from '../../../components/button'

export default function EditCustomer() {
    const customer = useLocalSearchParams();
    const { token } = useAuth();
    
    const [data, setData] = useState({
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
    })

    const handleUpdate = async () => {
        if(data.name && data.address && data.phone){
            if(data.name == customer.name && data.address == customer.address && data.phone == customer.phone){
                alert("Tidak ada perubahan")
                return;
            }

            const response = await updateCustomer(token, customer.ID, data);

            if(response.status){
                alert("Sukses update customer");
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
                >Edit Data</Text>

                <TextInput
                    placeholder='Name'
                    style={styles.input}
                    defaultValue={data.name}
                    onChangeText={(value) => setData({...data, name: value})}
                />
                <TextInput
                    placeholder='Address'
                    style={styles.input}
                    defaultValue={data.address}
                    onChangeText={(value) => setData({...data, address: value})}
                />
                <TextInput
                    placeholder='Phone'
                    style={styles.input}
                    defaultValue={data.phone}
                    onChangeText={(value) => setData({...data, phone: value})}
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