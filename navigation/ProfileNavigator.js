import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import useAuth from "../auth/useAuth";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.user ? (
        <Stack.Screen name="Account" component={AccountScreen} />
      ) : (
        // <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
