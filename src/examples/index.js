const profileCardCode = `import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cover} />
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.handle}>@janedoe</Text>
        <Text style={styles.bio}>
          Product designer &amp; React Native developer. Building beautiful mobile experiences.
        </Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>248</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12.4K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>891</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.followBtn, following && styles.followingBtn]}
          onPress={() => setFollowing(!following)}
        >
          <Text style={[styles.followText, following && styles.followingText]}>
            {following ? 'Following ✓' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    margin: 16,
  },
  cover: {
    height: 90,
    backgroundColor: '#4F46E5',
  },
  avatarRow: {
    alignItems: 'center',
    marginTop: -36,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  body: {
    padding: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  handle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  followBtn: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#4F46E5',
    borderRadius: 24,
  },
  followingBtn: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  followText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  followingText: {
    color: '#374151',
  },
});
`;

const weatherWidgetCode = `import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function WeatherWidget() {
  const [unit, setUnit] = useState('C');
  const tempC = 22;
  const temp = unit === 'C' ? tempC : Math.round(tempC * 9 / 5 + 32);

  const hourly = [
    { time: '12 PM', icon: '☀️', temp: 22 },
    { time: '1 PM', icon: '⛅', temp: 21 },
    { time: '2 PM', icon: '🌤', temp: 23 },
    { time: '3 PM', icon: '☀️', temp: 24 },
    { time: '4 PM', icon: '🌥', temp: 20 },
    { time: '5 PM', icon: '🌦', temp: 18 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.city}>San Francisco</Text>
          <Text style={styles.condition}>Partly Cloudy</Text>
        </View>
        <View style={styles.unitToggle}>
          <TouchableOpacity onPress={() => setUnit('C')} style={[styles.unitBtn, unit === 'C' && styles.unitActive]}>
            <Text style={[styles.unitText, unit === 'C' && styles.unitActiveText]}>°C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUnit('F')} style={[styles.unitBtn, unit === 'F' && styles.unitActive]}>
            <Text style={[styles.unitText, unit === 'F' && styles.unitActiveText]}>°F</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainTemp}>
        <Text style={styles.weatherIcon}>⛅</Text>
        <Text style={styles.temperature}>{temp}°{unit}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💧</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>68%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>💨</Text>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>14 km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailIcon}>👁</Text>
          <Text style={styles.detailLabel}>Visibility</Text>
          <Text style={styles.detailValue}>10 km</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
        {hourly.map((item, i) => (
          <View key={i} style={styles.hourlyItem}>
            <Text style={styles.hourlyTime}>{item.time}</Text>
            <Text style={styles.hourlyIcon}>{item.icon}</Text>
            <Text style={styles.hourlyTemp}>
              {unit === 'C' ? item.temp : Math.round(item.temp * 9 / 5 + 32)}°
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E3A5F',
    borderRadius: 20,
    padding: 20,
    margin: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  city: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  condition: {
    fontSize: 14,
    color: '#93C5FD',
    marginTop: 2,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 2,
  },
  unitBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  unitActive: {
    backgroundColor: '#fff',
  },
  unitText: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    fontSize: 13,
  },
  unitActiveText: {
    color: '#1E3A5F',
  },
  mainTemp: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  weatherIcon: {
    fontSize: 56,
  },
  temperature: {
    fontSize: 52,
    fontWeight: '200',
    color: '#fff',
    marginTop: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 20,
  },
  detailLabel: {
    fontSize: 11,
    color: '#93C5FD',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 2,
  },
  hourlyScroll: {
    marginTop: 4,
  },
  hourlyItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
    minWidth: 64,
  },
  hourlyTime: {
    fontSize: 11,
    color: '#93C5FD',
  },
  hourlyIcon: {
    fontSize: 22,
    marginVertical: 4,
  },
  hourlyTemp: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
`;

const todoListCode = `import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Design the new onboarding flow', done: true },
    { id: 2, text: 'Review pull requests', done: true },
    { id: 3, text: 'Write unit tests for API layer', done: false },
    { id: 4, text: 'Update documentation', done: false },
    { id: 5, text: 'Prepare sprint retrospective', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));
  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo.trim(), done: false }]);
    setNewTodo('');
  };

  const done = todos.filter(t => t.done).length;
  const pct = todos.length ? Math.round((done / todos.length) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.progress}>{done}/{todos.length} done</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: pct + '%' }]} />
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoItem}>
            <TouchableOpacity
              style={[styles.checkbox, todo.done && styles.checkboxDone]}
              onPress={() => toggleTodo(todo.id)}
            >
              {todo.done && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={[styles.todoText, todo.done && styles.todoTextDone]}>
              {todo.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo(todo.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#9CA3AF"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  progress: {
    fontSize: 13,
    color: '#6B7280',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  list: {
    maxHeight: 240,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 20,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
  },
});
`;

export const exampleComponents = [
  {
    name: 'ProfileCard',
    description: 'A social profile card with avatar, bio, follower stats, and a follow button.',
    brandId: 'default',
    code: profileCardCode,
  },
  {
    name: 'WeatherWidget',
    description: 'A weather widget showing temperature, conditions, detail stats, and an hourly forecast scroll.',
    brandId: 'dark',
    code: weatherWidgetCode,
  },
  {
    name: 'TodoList',
    description: 'An interactive to-do list with progress bar, checkboxes, delete, and add-task input.',
    brandId: 'default',
    code: todoListCode,
  },
];
