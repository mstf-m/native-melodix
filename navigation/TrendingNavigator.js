import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const TrendingNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
  </Stack.Navigator>
);

export default TrendingNavigator;
