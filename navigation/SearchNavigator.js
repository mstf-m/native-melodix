import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChartScreen from "../screens/ChartScreen";

const Stack = createNativeStackNavigator();

const SearchNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Chart" component={ChartScreen} />
  </Stack.Navigator>
);

export default SearchNavigator;
