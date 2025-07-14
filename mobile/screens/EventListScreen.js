import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://192.168.200.27:3000/api/events') // thay IP LAN máy bạn
      .then((res) => {
        console.log('DATA:', res.data);
        setEvents(res.data);
      })
      .catch((err) => console.error('API error:', err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <Image
        source={{
          uri: item.image_url || 'https://via.placeholder.com/200x120.png?text=No+Image',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>Giá vé: {item.ticket_price}</Text>
        <Text style={styles.subtitle}>Ngày bắt đầu: {item.start_time}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id_event.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
});
