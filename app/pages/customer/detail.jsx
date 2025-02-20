import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { deleteCustomer } from '../../../service/customer'
import { Button } from '../../../components/button';
import { ConfirmDelete } from '../../../components/confirmDelete';
import { useAuth } from '../../../contexts/AuthContext';

export default function DetailCustomer() {
    const data = useLocalSearchParams();
    const { token } = useAuth();

    const [visible, setVisible] = useState(false);

    const handleConfirmDelete = () => {
        setVisible(true);
    };

    const handleDelete = async () => {
        console.log(`deleted id: ${data.ID}`);
        setVisible(false);
        
        const response = await deleteCustomer(token, data.ID);
        
        if(response.status){
            alert("Customer dihapus");
            router.replace('/(tabs)/customer');
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
            >Detail Customer</Text>

            <View
                style={{
                    alignItems: "baseline",
                    width: "100%"
                }}
            >
                <Text style={styles.text}>{"Name : " + data.name}</Text>
                <Text style={styles.text}>{"Address : " + data.address}</Text>
                <Text style={styles.text}>{"Phone : " + data.phone}</Text>
            </View>

            <Button
                type="info"
                action={() => router.push({pathname: '/pages/customer/edit', params: data})}
            >Edit</Button>
            <Button
                type="danger"
                action={() => handleConfirmDelete()}
            >Hapus</Button>
            <Button type="secondary" action={() => router.back()}>Back</Button>

            {/* confirm */}
            <ConfirmDelete
                text={`Yakin hapus data customer: ${data.name}`}
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