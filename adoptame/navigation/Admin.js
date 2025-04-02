import { createDrawerNavigator } from "@react-navigation/drawer";
import MascotasAdmin from "../screens/MascotasAdmin";
import FormularioAdmin from "../screens/FormularioAdmin";

const Drawer = createDrawerNavigator();

const Admin = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Mascotas" component={MascotasAdmin} />
    <Drawer.Screen name="Formulario" component={FormularioAdmin} />
  </Drawer.Navigator>
);

export default Admin;
