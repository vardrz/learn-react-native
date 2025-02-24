import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { Button } from '../../../components/button'
import { InsertOrder } from '../../../service/order'
import DropdownSearchCustomer from '../../../components/dropdownSearchCustomer'
import DropdownSelectProduct from '../../../components/dropdownSelectProduct'
import Dialog from "react-native-dialog";
import { useAuth } from '../../../contexts/AuthContext'
import { toRupiah } from 'to-rupiah'

export default function CreateOrder() {
    const { token } = useAuth();

    const randomInt = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    const [visible, setVisible] = useState(false);

    const [data, setData] = useState({
        order_number: "ORD-" + randomInt,
        customer_id: null,
        discount: 0,
        subtotal: 0,
    })
    
    const [products, setProducts] = useState([])

    function selectCustomer(id) {
        setData({...data, customer_id: id});
    }

    function handleValidation() {
        if (data.customer_id == null) {
            return alert("Pilih customer terlebih dahulu!");
        }
        
        if (products.length < 1) {
            return alert("Belum ada produk yang dipilih!");
        }

        if (products.filter((data) => data.qty == 0).length > 0) {
            return alert("Cek lagi Qty setiap produk!");
        }
        
        if (products.filter((data) => data.price == 0).length > 0) {
            return alert("Cek lagi harga setiap produk!");
        }

        setVisible(true);
    }

    const handleSave = async () => {
        let fixProducts = products.map((product) => ({
            product_id: product.product_id,
            qty: parseInt(product.qty),
            price: parseInt(product.price),
        }));
        let body = {
            order_number: data.order_number,
            customer_id: parseInt(data.customer_id),
            discount: parseInt(data.discount),
            subtotal: parseInt(data.subtotal),
            details: fixProducts
        };
        console.log(body);
        
        const response = await InsertOrder(token, body);
        if(response.status){
            alert("Berhasil membuat order");
            router.replace('/(tabs)/order');
        }else{
            alert(response.message);
        }
    }




    // helper func
    function handleProductChangePrice(product_id, price) {
        let updatedProducts = products.map(item => {
            if(item.product_id == product_id){
                return { ...item, price: price };
            }
            return item;
        });

        setProducts(updatedProducts);
    }

    function handleProductChangeQty(product_id, qty) {
        let updatedProducts = products.map(item => {
            if(item.product_id == product_id){
                return { ...item, qty: qty };
            }
            return item;
        });

        setProducts(updatedProducts);
    }

    function getSubtotal() {
        return products.reduce((total, item) => total + (item.price*item.qty), 0)
    }
    useEffect(() => {
        setData({...data, subtotal: getSubtotal()})
    }, [products])

    function handleDeleteProduct(product_id) {
        let filteredProducts = products.filter((data) => data.product_id != product_id)

        setProducts(filteredProducts);
    }

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
                >Buat Order</Text>
                <TextInput
                    placeholder='Nomor Order'
                    style={styles.inputReadOnly}
                    defaultValue={data.order_number}
                    readOnly
                />
                <DropdownSearchCustomer action={(val) => selectCustomer(val)}/>
                <DropdownSelectProduct
                    action={(data) => {
                        setProducts(data);
                    }}
                    selectedProducts={products}
                />

                {/* products */}
                <View
                    style={{
                        flexDirection: "column",
                        marginTop: 20
                    }}
                >
                    {
                        products.map((product) => (
                            <View key={product.product_id}>
                                <View
                                    style={{
                                        borderBottomColor: 'black',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        marginTop: 10
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: "column"
                                    }}
                                >
                                    <TextInput
                                        style={styles.inputReadOnly}
                                        defaultValue={product.product_name}
                                        readOnly
                                    />
                                    <TextInput
                                        placeholder='Qty'
                                        style={styles.input}
                                        value={product.qty.toString()}
                                        onChangeText={(value) => handleProductChangeQty(product.product_id, value)}
                                        keyboardType="numeric"
                                    />
                                    <TextInput
                                        placeholder='Harga'
                                        style={styles.input}
                                        defaultValue={product.price}
                                        onChangeText={(value) => handleProductChangePrice(product.product_id, value)}
                                        keyboardType="numeric"
                                    />
                                    <TouchableOpacity
                                        style={{
                                            width: "100%",
                                            height: 40,
                                            backgroundColor: "#cc261b",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 5,
                                            borderRadius: 10,
                                        }}
                                        onPress={() => handleDeleteProduct(product.product_id)}
                                    >
                                        <Text style={{color: "white"}}>Hapus</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                    
                    { products.length < 1 && <Text style={{textAlign: "center", marginBottom: 10}}>Belum ada produk yang dipilih</Text> }

                    <View
                        style={{
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: 'black',
                            marginVertical: 10,
                            paddingTop: 5,
                            paddingBottom: 10,
                        }}
                    >
                        <TextInput
                            placeholder='Diskon'
                            style={styles.input}
                            // value={data.discount.toString()}
                            onChangeText={(value) => setData({...data, discount: value})}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
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
                    <Text style={{fontSize: 20, fontWeight: "700"}}>Total</Text>
                    <Text style={{fontSize: 20, fontWeight: "700"}}>{toRupiah((data.subtotal-data.discount), { dot: '.', floatingPoint: 0 })}</Text>
                </View>
            </View>

            <Button action={() => handleValidation()}>Buat Order</Button>

            <View
                style={{marginBottom: 50}}
            >
                <Button type="secondary" action={() => router.back()}>Kembali</Button>
            </View>


            {/* confirm modal */}
            <View style={styles.container}>
                <Dialog.Container visible={visible}>
                    <Dialog.Title style={{color: "black"}}>Konfirmasi</Dialog.Title>
                    <Dialog.Description>Simpan data order ini?</Dialog.Description>
                    
                    <Dialog.Button color="gray" label="Cek Lagi" onPress={() => setVisible(false)} />
                    <Dialog.Button style={{fontWeight: "bold"}} label="Simpan" onPress={() => handleSave()} />
                </Dialog.Container>
            </View>
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