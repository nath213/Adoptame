import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const FormularioAdmin = ({ navigation, route }) => {
  const { modo, mascota } = route.params || { modo: 'agregar', mascota: null };
  const [nombre, setNombre] = useState(mascota?.nombre || '');
  const [tipo, setTipo] = useState(mascota?.tipo || 'perro');
  const guardarMascota = () => {
    if (!nombre.trim()) {
      Alert.alert('El nombre es obligatorio');
      return;
    }
    const nuevaMascota = {
      id: mascota?.id || `mascota-${Date.now()}`,
      nombre,
      tipo,
      foto: mascota?.foto || (tipo === 'perro' 
        ? 'https://images.dog.ceo/breeds/labrador/n02099712_741.jpg' 
        : 'https://cdn2.thecatapi.com/images/MTYwODk3Mg.jpg'),
    };
    Alert.alert(
      '¡Listo!',
      modo === 'agregar' ? 'Mascota agregada' : 'Datos actualizados',
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('ListaMascotas', { nuevaMascota }) 
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>
        {modo === 'agregar' ? 'Añadir Mascota' : 'Editar Mascota'}
      </Text>
      <TextInput
        style={estilos.input}
        placeholder="Nombre de la mascota"
        value={nombre}
        onChangeText={setNombre}
      />
      <View style={estilos.opcionesTipo}>
        <TouchableOpacity 
          style={[estilos.botonTipo, tipo === 'perro' && estilos.botonTipoSeleccionado]}
          onPress={() => setTipo('perro')}
        >
          <Text>Perro</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[estilos.botonTipo, tipo === 'gato' && estilos.botonTipoSeleccionado]}
          onPress={() => setTipo('gato')}
        >
          <Text>Gato</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={estilos.botonGuardar} onPress={guardarMascota}>
        <Text style={estilos.textoBotonGuardar}>
          {modo === 'agregar' ? 'Guardar' : 'Actualizar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  opcionesTipo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  botonTipo: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  botonTipoSeleccionado: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3'
  },
  botonGuardar: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  textoBotonGuardar: {
    color: 'white',
    fontWeight: 'bold'
  },
});

export default FormularioAdmin;