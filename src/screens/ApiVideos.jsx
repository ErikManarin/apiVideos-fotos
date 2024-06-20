import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

function ApiVideos() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    const apiKey = 'szVhM3AvR5eKu2WhnV6UiZcsBcnz2wxoow3X94jsUUochAa3wig0TYp3';

    axios.get('https://api.pexels.com/videos/', {
      params: {
        api_key: apiKey,
      },
    })
    .then(response => {
      setVideos(response.data.results);
    })
    .catch(error => {
      console.error('Erro ao buscar Videos:', error);
    });
  }, []);

  const renderVideos = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
      />
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Videos</Text>
      <FlatList
        data={Videos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderVideos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
});

export default ApiVideos;
