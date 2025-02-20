import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.primary,
          paddingHorizontal: 20,
          paddingVertical: 15
        }}
      >
        <Text
          style={{
            fontWeight: '500',
            color: "white"
          }}
        >Home</Text>
        <TouchableOpacity
          onPress={() => logout()}
        >
          <MaterialIcons name="logout" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{marginBottom: 50}}>Login as : {(user.first_name ?? "-") +" "+ (user.last_name ?? "-")}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            borderRadius: 20,
            paddingHorizontal: 30,
            paddingVertical: 10
          }}
          onPress={() => router.replace('/')}
        >
          <Text style={{color: "white"}}>Back To Starter Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}