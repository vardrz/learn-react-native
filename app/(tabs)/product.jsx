import { View, Text, TouchableOpacity, ScrollView, RefreshControl, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from '../../contexts/AuthContext';
import { searchProduct } from '../../service/products';
import { router } from 'expo-router';
import { useDebounce } from 'use-debounce';

export default function Product() {
    const { token } = useAuth();
    const [products, setProducts] = useState(null);

    // search
    const [search, setSearch] = useState('');
    const [searchKey] = useDebounce(search, 500);
    
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        
        handleSearchCustomers("");

        setRefreshing(false);
    };

    useEffect(() => {
        if (token) {
            handleSearchCustomers("");
        }
    }, [])

    useEffect(() => {
        handleSearchCustomers(searchKey);
    }, [searchKey])

    const handleSearchCustomers = async (keyword) => {
        setLoading(true);
        setProducts(null);
    
        try {
            let body = {
                search: keyword,
                limit: "50",
                page: "1",
                order: "nama",
            }
    
            const data = await searchProduct(token, body);
          
            setProducts(data.data);
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
                >Produk</Text>
                <TouchableOpacity
                    onPress={() => router.push('/pages/product/add')}
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
                    products ?
                        products.map((data) => {
                        return (
                            <TouchableOpacity
                                key={data.ID}
                                style={{
                                    width: '100%',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#f0f0f0"
                                }}
                                onPress={() => router.push({pathname: '/pages/product/detail', params: data})}
                            >
                                <Text>{data.nama}</Text>
                            </TouchableOpacity>
                        )
                        })
                    : (
                        <Text
                            style={{
                                textAlign: "center",
                                marginTop: 30
                            }}
                        >{loading ? "Load products...." : "Products not available"}</Text>
                    )
                }
            </ScrollView>
        </View>
    )
}