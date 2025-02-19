import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '../../contexts/AuthContext';
import { getCustomers } from '../../service/customer';

export default function Customer() {
  const { user, token, logout } = useAuth();
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers(token);
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    if (token) {
      fetchCustomers();
    }
  }, [])

  return (
    <View
      style={{
        flex: 1
      }}
    >
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
        >Customers</Text>
        <TouchableOpacity
          onPress={() => alert('add customer')}
        >
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          backgroundColor: "#f0f0f0",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Login as : {user.first_name +" "+ user.first_name}</Text>
      </View>

      {/* content */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 15
        }}
      >
        {
          customers ?
            customers.map((data) => {
              return (
                <View
                  key={data.ID}
                  style={{
                    width: '100%',
                    paddingVertical: 30,
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#f0f0f0"
                  }}
                >
                  <Text>{"Name : " + data.name}</Text>
                  <Text>{"Address : " + data.address}</Text>
                  <Text>{"Phone : " + data.phone}</Text>
                </View>
              )
            })
          : <Text>{"Customer not available"}</Text>
        }
      </ScrollView>
    </View>
  )
}