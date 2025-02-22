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
  const { user, isLoading } = useAuth();

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          {!user ? (
            <>
              <Stack.Screen name="index" />
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="auth/register" />

              {/* customers */}
              <Stack.Screen name="pages/customer/add" />
              <Stack.Screen name="pages/customer/detail" />
              <Stack.Screen name="pages/customer/edit" />
            </>
          ) : (
            <Stack.Screen name="(tabs)/customer" />
          )}
        </Stack>
      )}
    </>
  );
}
