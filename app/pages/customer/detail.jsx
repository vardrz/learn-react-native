import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';

export default function DetailCustomer() {
    const data = useLocalSearchParams();

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Detail Customer</Text>
            <Text>{"Name : " + data.name}</Text>
            <Text>{"Address : " + data.address}</Text>
            <Text>{"Phone : " + data.phone}</Text>

            <TouchableOpacity
                style={{
                width: "80%",
                height: 50,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
                borderRadius: 10,
                }}
                onPress={() => router.back()}
            >
                <Text style={{ color: "white" }}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}