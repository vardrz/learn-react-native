import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { deleteProduct } from '../../../service/products'
import { Button } from '../../../components/button';
import { ConfirmDelete } from '../../../components/confirmDelete';
import { useAuth } from '../../../contexts/AuthContext';

export default function DetailProduct() {
    const data = useLocalSearchParams();
    const { token } = useAuth();

    const [visible, setVisible] = useState(false);

    const handleDelete = async () => {
        console.log(`deleted id: ${data.ID}`);
        setVisible(false);
        
        const response = await deleteProduct(token, data.ID);
        
        if(response.status){
            alert("Produk dihapus");
            router.replace('/(tabs)/product');
        }else{
            alert(response.message);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 50,
                alignItems: "center",
                backgroundColor: "white"
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginVertical: 30
                }}
            >Detail Produk</Text>

            <View
                style={{
                    alignItems: "baseline",
                    width: "100%"
                }}
            >
                <Text style={styles.text}>{"Nama : " + data.nama}</Text>
                <Text style={styles.text}>{"Deskripsi : " + data.deskripsi}</Text>
            </View>

            <Button
                type="info"
                action={() => router.push({pathname: '/pages/product/edit', params: data})}
            >Edit</Button>
            <Button
                type="danger"
                action={() => setVisible(true)}
            >Hapus</Button>
            <Button type="secondary" action={() => router.back()}>Back</Button>

            {/* confirm */}
            <ConfirmDelete
                text={`Yakin hapus data produk: ${data.nama}`}
                visible={visible}
                handleCancel={() => setVisible(false)}
                handleDelete={handleDelete}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 10
    }
})