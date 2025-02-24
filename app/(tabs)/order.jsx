import { View, Text, TextInput, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import Colors from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '../../contexts/AuthContext';
import { AllOrder, GetOrderByNumber } from '../../service/order';
import { router } from 'expo-router';
import { useDebounce } from 'use-debounce';
import { toRupiah } from 'to-rupiah';

export default function Order() {
    const { token } = useAuth();
    const [orders, setOrders] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = () => {
        setRefreshing(true);
        
        handleSearchOrder("");

        setRefreshing(false);
    };
    
    useEffect(() => {
        if (token) {
            handleSearchOrder("");
        }
    }, [])

    // search
    const [search, setSearch] = useState('');
    const [searchKey] = useDebounce(search, 500);

    useEffect(() => {
        handleSearchOrder(searchKey)
    }, [searchKey])
    
    const handleSearchOrder = async (keyword) => {
        setLoading(true);
        setOrders(null);

        try {
            let data;
            if (keyword != "") {
                data = await GetOrderByNumber(token, keyword);
                setOrders(data);
            }else{
                data = await AllOrder(token);
                setOrders(data.data);
            }
        } catch (error) {
            setOrders(null);
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
                >Order</Text>
                <TouchableOpacity
                    onPress={() => router.push('/pages/order/add')}
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
                    placeholder='Nomor Order ...'
                    style={{
                    width: "100%",
                    height: 40,
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
                orders
                    ? orders.map((data) => {
                        return (
                            <TouchableOpacity
                                key={data.ID}
                                style={{
                                    width: '100%',
                                    paddingVertical: 20,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#f0f0f0",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                                onPress={() => {
                                    let order = {
                                        id: data.ID,
                                        order_number: data.order_number,
                                        customer_id: data.customer_id,
                                        customer_name: data.customer.name,
                                        discount: data.discount,
                                        subtotal: data.subtotal,
                                        details: JSON.stringify(data.details)
                                    };
                                    router.push({pathname: '/pages/order/detail', params: order})
                                }}
                            >
                                <View>
                                    <Text style={{fontWeight: "500"}}>{data.order_number}</Text>
                                    <Text>{"Oleh : " + data.customer.name}</Text>
                                </View>
                                <Text style={{fontSize: 15, fontWeight: "500"}}>
                                    {toRupiah(data.subtotal-data.discount, { dot: '.', floatingPoint: 0 })}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                    : (
                    <Text
                        style={{
                        textAlign: "center",
                        marginTop: 30
                        }}
                    >{loading ? "Load orders...." : "Order not available"}</Text>
                    )
            }
            </ScrollView>
        </View>
    )
}