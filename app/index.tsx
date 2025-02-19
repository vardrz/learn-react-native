import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors"
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black"
      }}
    >
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require('../assets/images/react-logo.png')}/>
        <Text style={{color: "white", marginTop: 10}}>This is Landing Page</Text>
      </View>

      <View style={{
          backgroundColor: Colors.primary,
          padding: 25,
          height: "50%",
          width: "100%",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/auth/Login')}
          style={styles.button}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold"
            }}
          >Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 50,
    marginTop: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  }
})