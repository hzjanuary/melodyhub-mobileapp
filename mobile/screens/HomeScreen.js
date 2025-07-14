import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Chào mừng */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeIcon}>🎵</Text>
        <Text style={styles.title}>Chào mừng đến với Melody Hub!</Text>
        <Text style={styles.subtitle}>
          Nơi bạn có thể khám phá những sự kiện âm nhạc hot nhất hiện nay.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Events')}
        >
          <FontAwesome5 name="calendar-alt" size={16} color="#fff" />
          <Text style={styles.buttonText}> Xem Sự Kiện</Text>
        </TouchableOpacity>
      </View>

      {/* Mục Sự kiện nổi bật */}
      <View style={styles.section}>
        <MaterialIcons name="whatshot" size={24} color="orange" />
        <Text style={styles.sectionTitle}> Sự Kiện Nổi Bật</Text>
      </View>

      {/* Mục Khám phá danh mục */}
      <View style={styles.section}>
        <Entypo name="grid" size={24} color="green" />
        <Text style={styles.sectionTitle}> Khám Phá Danh Mục</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Mai Zoooo®. All rights reserved.
        </Text>
        <Text style={styles.footerLinks}>
          Giới thiệu | Liên hệ | Chính sách
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  welcomeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#2a2a72',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  footerLinks: {
    fontSize: 12,
    color: '#1976d2',
    marginTop: 4,
  },
});
