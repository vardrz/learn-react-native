import { TouchableOpacity, Text } from "react-native";

export const Button = ({ children, action, type }) => {
    let bgColor;
    switch (type) {
        case "primary":
            bgColor = "black"
            break;
        case "warning":
            bgColor = "yellow"
            break;
        case "info":
            bgColor = "#2563EB"
            break;
        case "danger":
            bgColor = "#DC2626"
            break;
        case "secondary":
            bgColor = "#334155"
            break;
        default:
            bgColor = "black"
            break;
    }

    return (
        <TouchableOpacity
            style={{
                width: "100%",
                height: 50,
                backgroundColor: bgColor,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                borderRadius: 10,
            }}
            onPress={action}
        >
            <Text style={{ color: "white" }}>{children}</Text>
        </TouchableOpacity>
    );
}