import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ListaMascotas = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const dogsRes = await fetch('https://dog.ceo/api/breeds/image/random/5');
        const dogsData = await dogsRes.json();
        const dogs = dogsData.message.map((img, i) => ({
          id: `dog-${i}`,
          nombre: `Perro ${i+1}`,
          imagen: img,
          tipo: 'perro'
        }));
        const catsRes = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
        const catsData = await catsRes.json();
        const cats = catsData.map((cat, i) => ({
          id: `cat-${cat.id}`,
          nombre: `Gato ${i+1}`,
          imagen: cat.url,
          tipo: 'gato'
        }));

        setMascotas([...dogs, ...cats]);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const toggleFavorito = (id) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favButton}
        onPress={() => navigation.navigate('Favoritos', {
          mascotasFavoritas: mascotas.filter(m => favoritos.includes(m.id))
        })}
      >
        <Text>Ver Favoritos ({favoritos.length})</Text>
      </TouchableOpacity>

      <FlatList
        data={mascotas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.petCard}>
            <Image source={{ uri: item.imagen }} style={styles.petImage} />
            <Text>{item.nombre}</Text>
            <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
              <Text>{favoritos.includes(item.id) ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  favButton: { padding: 16, backgroundColor: '#ddd', marginBottom: 16 },
  petCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  petImage: { width: 50, height: 50, borderRadius: 25, marginRight: 16 }
});

export default ListaMascotas;