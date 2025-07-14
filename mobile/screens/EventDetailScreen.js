import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';

export default function EventDetailScreen({ route }) {
  const { event } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [seatNumber, setSeatNumber] = useState(1);

  // 👉 Hàm xử lý đặt vé
  const handleBooking = async () => {
    try {
      const res = await axios.post('http://192.168.200.27:3000/api/bookings', {
        event_id: event.id_event,
        user_id: 25, // hoặc id_user thực tế có trong bảng user
        quantity: quantity,
        seat_number: seatNumber,
      });

      if (res.data.success) {
        Alert.alert('Thành công', 'Bạn đã đặt vé thành công!');
      } else {
        Alert.alert('Thất bại', 'Không thể đặt vé. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi đặt vé:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri:
            event.image_url ||
            'https://via.placeholder.com/400x200.png?text=No+Image',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.info}>Ngày bắt đầu: {event.start_time}</Text>
        <Text style={styles.info}>Giá vé: {event.ticket_price}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={{ marginVertical: 10 }}>
          <Text>Số lượng vé:</Text>
          <TextInput
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(Number(text))}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              marginBottom: 8,
            }}
          />
          <Text>Số ghế:</Text>
          <TextInput
            value={seatNumber.toString()}
            onChangeText={(text) => setSeatNumber(Number(text))}
            keyboardType="numeric"
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 8 }}
          />
        </View>

        {/* 👉 Nút Đặt Vé */}
        <View style={styles.buttonContainer}>
          <Button title="Đặt vé" onPress={handleBooking} color="#1e90ff" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 250 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 4 },
  description: { fontSize: 16, marginTop: 12, lineHeight: 22 },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
