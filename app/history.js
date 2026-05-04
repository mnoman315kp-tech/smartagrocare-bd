import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { deleteHistory, getHistory } from './databaseFunctions';

export default function History() {
  const [data, setData] = useState([]);

  // ✅ Load data
  const loadData = () => {
    const result = getHistory();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Delete handler
  const handleDelete = (id) => {
    deleteHistory(id);
    loadData(); // refresh list after delete
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Text style={styles.heading}>Detection History</Text>

        {data.length === 0 ? (
          <Text style={styles.emptyText}>No history available</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                
                {/* Top Row: Disease + Delete Button */}
                <View style={styles.row}>
                  <Text style={styles.cardText}>
                    {item.disease}
                  </Text>

                  <Pressable onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#DC2626" />
                  </Pressable>
                </View>

                {/* Confidence */}
                <Text style={styles.subText}>
                  Confidence: {(item.confidence * 100).toFixed(1)}%
                </Text>

                {/* Date */}
                <Text style={styles.dateText}>
                  {new Date(item.date).toLocaleString()}
                </Text>

              </View>
            )}
          />
        )}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
  },
});