import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Button } from '../../../components/button'
import { InsertOrder } from '../../../service/order'
import DropdownSearchCustomer from '../../../components/dropdownSearchCustomer'
import DropdownSelectProduct from '../../../components/dropdownSelectProduct'
import Dialog from "react-native-dialog";
import { useAuth } from '../../../contexts/AuthContext'
import { toRupiah } from 'to-rupiah'

export default function DetailOrder() {
    const { token } = useAuth();
    const data = useLocalSearchParams();
    const products = JSON.parse(data.details);

    return (
        <ScrollView
            style={{
                backgroundColor: "white",
                flex: 1,
                paddingHorizontal: 30
            }}
        >
            <View
                style={{
                    width: "100%"
                }}
            >
                <Text
                    style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: 50,
                        marginBottom: 20,
                        fontSize: 25,
                        fontWeight: "600",
                    }}
                >Detail Order</Text>
                <TextInput
                    placeholder='Nomor Order'
                    style={styles.inputReadOnly}
                    defaultValue={data.order_number}
                    readOnly
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 18}}>Customer</Text>
                    <Text style={{fontSize: 18}}>{data.customer_name}</Text>
                </View>

                {/* products */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginTop: 10,
                        marginHorizontal: 5
                    }}
                />
                {
                    products.map((product) => (
                        <View
                            key={product.product_id}
                            style={{
                                marginHorizontal: 5,
                                marginTop: 10
                            }}
                        >
                            <Text>{"Nama Produk " + product.product_id}</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text>{toRupiah(product.price, { dot: '.', floatingPoint: 0 }) + " x " + product.qty}</Text>
                                <Text>{toRupiah(product.price*product.qty, { dot: '.', floatingPoint: 0 })}</Text>
                            </View>
                        </View>
                    ))
                }

                {/* summaries */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 5,
                        marginVertical: 20
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 18}}>Subtotal</Text>
                    <Text style={{fontSize: 18}}>{toRupiah(data.subtotal, { dot: '.', floatingPoint: 0 })}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 18}}>Diskon</Text>
                    <Text style={{fontSize: 18}}>{toRupiah(data.discount, { dot: '.', floatingPoint: 0 })}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 20, fontWeight: "700"}}>Total</Text>
                    <Text style={{fontSize: 20, fontWeight: "700"}}>{toRupiah((data.subtotal-data.discount), { dot: '.', floatingPoint: 0 })}</Text>
                </View>
            </View>

            <Button type="secondary" action={() => router.back()}>Kembali</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputReadOnly: {
        backgroundColor: "#e8e8e8",
        color: "black",
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        border: "black"
    },
    input: {
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        border: "black"
    }
})