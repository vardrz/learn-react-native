import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Colors from "../../constants/Colors"
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(user != null){
      router.replace('/(tabs)/home');
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.white
      }}
    >
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image style={{width: 150, height: 150}} source={require('../../assets/images/react-logo.png')}/>
      </View>

      <View style={{
          flex: 2,
          backgroundColor: Colors.primary,
          padding: 25,
          paddingTop: 50,
          height: "50%",
          width: "100%",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          onPress={() => login(email, password)}
          style={styles.button}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white"
            }}
          >Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/auth/register')}
          style={styles.button}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white"
            }}
          >Daftar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.replace('/')}
          style={{
            backgroundColor: "black",
            borderRadius: 10,
            marginHorizontal: 30,
            marginTop: 30,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Ionicons name="arrow-back-circle" size={20} color="white" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginLeft: 10
            }}
          >Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: Colors.white,
    color: "black",
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  }
})