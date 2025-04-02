import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const Favoritos = ({ route }) => {
  const { mascotasFavoritas } = route.params;

  return (
    <View style={styles.container}>
      {mascotasFavoritas.length === 0 ? (
        <Text>No tienes mascotas favoritas</Text>
      ) : (
        <FlatList
          data={mascotasFavoritas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.petCard}>
              <Image source={{ uri: item.imagen }} style={styles.petImage} />
              <Text>{item.nombre}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  petCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  petImage: { width: 50, height: 50, borderRadius: 25, marginRight: 16 }
});

export default Favoritos;