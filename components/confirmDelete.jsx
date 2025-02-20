import { StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

export const ConfirmDelete = ({ text, visible, handleCancel, handleDelete }) => {
    return (
        <View style={styles.container}>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Konfirmasi</Dialog.Title>
                <Dialog.Description>{text}</Dialog.Description>
                
                <Dialog.Button color="blue" label="Batal" onPress={handleCancel} />
                <Dialog.Button color="red" label="Hapus" onPress={handleDelete} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});