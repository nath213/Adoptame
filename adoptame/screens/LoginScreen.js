import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Bienvenido</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.buttonBackground, color: theme.textColor }]}
        placeholder="Usuario"
        placeholderTextColor={theme.textColor}
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text.trim().toLowerCase())}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.buttonBackground, color: theme.textColor }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.textColor}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        onPress={() => login(username, password)}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={toggleTheme}>
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Cambiar Tema</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", height: 40, borderWidth: 1, marginVertical: 10, padding: 8, borderRadius: 8 },
  button: { padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;
