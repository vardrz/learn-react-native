import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { isLoading } = useAuth();

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />

          {/* customers */}
          <Stack.Screen name="pages/customer/add" />
          <Stack.Screen name="pages/customer/detail" />
          <Stack.Screen name="pages/customer/edit" />

          {/* product */}
          <Stack.Screen name="pages/product/add" />
          <Stack.Screen name="pages/product/detail" />
          <Stack.Screen name="pages/product/edit" />

          {/* product */}
          <Stack.Screen name="pages/order/add" />
          {/* <Stack.Screen name="pages/product/detail" />
          <Stack.Screen name="pages/product/edit" /> */}
        </Stack>
      )}
    </>
  );
}
