import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getCustomers } from '../service/customer';
import { useAuth } from '../contexts/AuthContext';

const DropdownSearchCustomer = ({action}) => {
    const { token } = useAuth();

    const [value, setValue] = useState(null);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        const data = await getCustomers(token);
        if(data){
            setCustomers(data.data.map((data) => ({label: data.name, value: data.ID})));
        }else{
            console.log(data);
        }
    };

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        color="black"
                        name="checkcircle"
                        size={15}
                        style={{marginRight: 5}}
                    />
                )}
            </View>
        );
    };

    return (
        <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={{fontSize: 13}}
            data={customers}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Pilih Customer"
            searchPlaceholder="Cari..."
            value={value}
            onChange={item => {
                setValue(item.value);
                action(item.value);
            }}
            renderItem={renderItem}
        />
    );
};

export default DropdownSearchCustomer;

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "black"
    },
    item: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    inputSearchStyle: {
        fontSize: 15,
    },
});