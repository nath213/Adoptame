import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MascotasAdmin = () => {
  const [perros, setPerros] = useState([]);
  const [gatos, setGatos] = useState([]);
  const [mascotasLocales, setMascotasLocales] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/5')
      .then(res => res.json())
      .then(data => {
        const perrosConInfo = data.message.map((foto, index) => ({
          id: `perro-${index}`,
          nombre: `Perro ${index + 1}`,
          tipo: 'perro',
          foto: foto,
        }));
        setPerros(perrosConInfo);
      })
      .catch(error => console.log("Error trayendo perros:", error));
  }, []);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=5')
      .then(res => res.json())
      .then(data => {
        const gatosConInfo = data.map((gatito, index) => ({
          id: `gato-${gatito.id}`,
          nombre: `Gato ${index + 1}`,
          tipo: 'gato',
          foto: gatito.url,
        }));
        setGatos(gatosConInfo);
      })
      .catch(error => console.log("Error trayendo gatos:", error));
  }, []);

  const borrarMascota = (id) => {
    Alert.alert(
      '¿Eliminar mascota?',
      'Esta acción no se puede deshacer',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          onPress: () => setMascotasLocales(mascotasLocales.filter(m => m.id !== id)) 
        },
      ]
    );
  };

  const todasLasMascotas = [...perros, ...gatos, ...mascotasLocales];

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity 
        style={estilos.botonAgregar}
        onPress={() => navigation.navigate('FormularioMascota', { modo: 'agregar' })}
      >
        <Text style={estilos.textoBoton}> Añadir Mascota</Text>
      </TouchableOpacity>

      <FlatList
        data={todasLasMascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={estilos.tarjeta}>
            <Image source={{ uri: item.foto }} style={estilos.imagen} />
            <Text style={estilos.nombre}>{item.nombre}</Text>
            <Text>{item.tipo === 'perro' ? 'Perro' : 'Gato'}</Text>

            <View style={estilos.botonesAccion}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('FormularioMascota', { 
                  modo: 'editar', 
                  mascota: item 
                })}
              >
                <Text style={estilos.botonEditar}>Editar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => borrarMascota(item.id)}>
                <Text style={estilos.botonBorrar}>Borrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  botonAgregar: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center'
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold'
  },
  tarjeta: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  imagen: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  botonesAccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  botonEditar: {
    color: '#2196F3'
  },
  botonBorrar: {
    color: '#F44336'
  },
});

export default MascotasAdmin;