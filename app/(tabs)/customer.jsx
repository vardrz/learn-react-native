import { View, Text, TouchableOpacity, ScrollView, RefreshControl, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '../../contexts/AuthContext';
import { getCustomers, searchCustomers } from '../../service/customer';
import { router } from 'expo-router';
import { useDebounce } from 'use-debounce';

export default function Customer() {
  const { token } = useAuth();
  const [customers, setCustomers] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    
    fetchCustomers();

    setRefreshing(false);
  };

  useEffect(() => {
    if (token) {
      fetchCustomers();
    }
  }, [])

  const fetchCustomers = async () => {
    setLoading(true)
    
    const data = await getCustomers(token);
    if(data){
      setCustomers(data.data);
    }else{
      console.error(data);
    }

    setLoading(false);
  };

  // search
  const [search, setSearch] = useState('');
  const [searchKey] = useDebounce(search, 500);

  useEffect(() => {
    if(searchKey != ""){
      handleSearchCustomers(searchKey);
    }else{
      fetchCustomers();
    }
  }, [searchKey])

  const handleSearchCustomers = async (keyword) => {
    setLoading(true);
    setCustomers(null);

    try {
      let body = {
        search: keyword,
        limit: "50",
        page: "1",
        order: "name",
      }

      const data = await searchCustomers(token, body);
      
      setCustomers(data.data);
    } catch (error) {
      console.error("Failed to search customers:", error);
    }
    
    setLoading(false);
  };

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
          onPress={() => router.push('/pages/customer/add')}
        >
          <AntDesign name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 25,
          backgroundColor: "#f0f0f0",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TextInput
          placeholder='Cari ...'
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 5,
            paddingHorizontal: 15
          }}
          onChangeText={setSearch}
        />
      </View>

      {/* content */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 15
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['grey']}
            progressBackgroundColor={'black'}
          />
        }
      >
        {
          customers ?
            customers.map((data) => {
              return (
                <TouchableOpacity
                  key={data.ID}
                  style={{
                    width: '100%',
                    paddingVertical: 30,
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#f0f0f0"
                  }}
                  onPress={() => router.push({pathname: '/pages/customer/detail', params: data})}
                >
                  <Text>{"Name : " + data.name}</Text>
                  <Text>{"Address : " + data.address}</Text>
                  <Text>{"Phone : " + data.phone}</Text>
                </TouchableOpacity>
              )
            })
          : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 30
              }}
            >{loading ? "Load customers...." : "Customer not available"}</Text>
          )
        }
      </ScrollView>
    </View>
  )
}