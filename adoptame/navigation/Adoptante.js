import { createDrawerNavigator } from "@react-navigation/drawer";
import ListaMacotas from "../screens/ListaMacotas";
import Favoritos from "../screens/Favoritos";

const Drawer = createDrawerNavigator();

const Adoptante = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Mascotas" component={ListaMacotas} />
    <Drawer.Screen name="Favoritos" component={Favoritos} />
  </Drawer.Navigator>
);

export default Adoptante;
