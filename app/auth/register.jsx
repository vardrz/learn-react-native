import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Colors from "../../constants/Colors"
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { registerUser } from '../../service/register';

export default function Register() {
    const { token } = useAuth();

    const [data, setData] = useState({
        nickname: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        password: null,
        otoritas: 1,
        status: "active",
    });
    const [confirmPassword, setConfirmPassword] = useState(null)

    const handleSave = async () => {
        if(data.nickname && data.first_name && data.last_name && data.email && data.phone && data.password){
            if (data.password == confirmPassword) {
                const response = await registerUser(token, data);
                
                if(response.status){
                    alert("Sukses");
                    router.replace('/auth/login');
                }else{
                    alert(response.message);
                }
            } else {
                alert('Password tidak cocok')
            }
        }else{
            alert('Isi data yang diperlukan')
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: Colors.white
            }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20
                }}
            >
                <Image style={{width: 100, height: 100}} source={require('../../assets/images/react-logo.png')}/>
            </View>

            <View
                style={{
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
                    placeholder='Nickname'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, nickname: value})}
                />

                <TextInput
                    placeholder='Nama Depan'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, first_name: value})}
                />

                <TextInput
                    placeholder='Nama Belakang'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, last_name: value})}
                />

                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, email: value})}
                />

                <TextInput
                    placeholder='No. HP'
                    style={styles.input}
                    onChangeText={(value) => setData({...data, phone: value})}
                />

                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(value) => setData({...data, password: value})}
                />

                <TextInput
                    placeholder='Ulangi Password'
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    onPress={() => handleSave()}
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