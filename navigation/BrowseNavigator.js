import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const BrowseNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen name="Category" component={CategoryScreen} /> */}
  </Stack.Navigator>
);

export default BrowseNavigator;
