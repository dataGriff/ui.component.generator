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
          Product designer & React Native developer. Building beautiful mobile experiences.
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

const holidayDestinationPickerCode = `import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HolidayDestinationPicker() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedIds, setSavedIds] = useState([1, 3]);
  const [selectedId, setSelectedId] = useState(null);

  const categories = ['All', '🏖 Beach', '🏔 Mountain', '🏙 City', '🏛 Culture'];

  const destinations = [
    {
      id: 1,
      name: 'Santorini',
      country: 'Greece 🇬🇷',
      category: '🏖 Beach',
      emoji: '🏝',
      color: '#1B6CA8',
      accentColor: '#87CEEB',
      price: 189,
      rating: 4.9,
      duration: '7 days',
      temp: '27°C',
      tags: ['Sunsets', 'Wine', 'Caldera Views'],
      description: 'Iconic blue-domed churches, dramatic caldera views, and the most breathtaking sunsets in the world await you.',
    },
    {
      id: 2,
      name: 'Kyoto',
      country: 'Japan 🇯🇵',
      category: '🏛 Culture',
      emoji: '⛩️',
      color: '#C0392B',
      accentColor: '#F9A8A8',
      price: 145,
      rating: 4.8,
      duration: '10 days',
      temp: '18°C',
      tags: ['Temples', 'Cherry Blossoms', 'Tea Ceremony'],
      description: 'Ancient temples, bamboo forests, and geisha districts transport you to a timeless Japan.',
    },
    {
      id: 3,
      name: 'Banff',
      country: 'Canada 🇨🇦',
      category: '🏔 Mountain',
      emoji: '🏔',
      color: '#1A7A4A',
      accentColor: '#A8E6CF',
      price: 220,
      rating: 4.7,
      duration: '5 days',
      temp: '12°C',
      tags: ['Hiking', 'Glacial Lakes', 'Wildlife'],
      description: 'Turquoise glacial lakes, snow-capped peaks, and untamed wilderness make Banff a paradise for nature lovers.',
    },
    {
      id: 4,
      name: 'Amalfi Coast',
      country: 'Italy 🇮🇹',
      category: '🏖 Beach',
      emoji: '🌊',
      color: '#D35400',
      accentColor: '#FAD7A0',
      price: 210,
      rating: 4.9,
      duration: '8 days',
      temp: '25°C',
      tags: ['Cliffside', 'Limoncello', 'Boat Tours'],
      description: "Dramatic cliffs plunging into crystal-clear waters, colorful villages, and Italy's finest cuisine.",
    },
    {
      id: 5,
      name: 'Tokyo',
      country: 'Japan 🇯🇵',
      category: '🏙 City',
      emoji: '🗼',
      color: '#7D3C98',
      accentColor: '#D7BDE2',
      price: 130,
      rating: 4.8,
      duration: '6 days',
      temp: '20°C',
      tags: ['Neon Lights', 'Ramen', 'Shibuya'],
      description: 'A dazzling metropolis where ancient shrines sit alongside futuristic skyscrapers and world-class cuisine.',
    },
    {
      id: 6,
      name: 'Machu Picchu',
      country: 'Peru 🇵🇪',
      category: '🏛 Culture',
      emoji: '🏛️',
      color: '#1E8449',
      accentColor: '#F9E79F',
      price: 175,
      rating: 4.9,
      duration: '9 days',
      temp: '15°C',
      tags: ['Inca Trail', 'Sunrise', 'Mystical'],
      description: 'The lost city of the Incas perches high in the Andes — a UNESCO Wonder that takes your breath away.',
    },
  ];

  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>WHERE TO NEXT?</Text>
          <Text style={styles.title}>Dream Holidays ✈️</Text>
        </View>
        <View style={styles.savedBadge}>
          <Text style={styles.savedBadgeText}>❤️ {savedIds.length} saved</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoriesContent}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, activeCategory === cat && styles.catBtnActive]}
            onPress={() => { setActiveCategory(cat); setSelectedId(null); }}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list} contentContainerStyle={styles.listContent}>
        {filtered.map(dest => (
          <TouchableOpacity
            key={dest.id}
            style={styles.card}
            onPress={() => setSelectedId(selectedId === dest.id ? null : dest.id)}
            activeOpacity={0.92}
          >
            <View style={[styles.cardHero, { backgroundColor: dest.color }]}>
              <View style={[styles.heroGlow, { backgroundColor: dest.accentColor }]} />
              <Text style={styles.heroEmoji}>{dest.emoji}</Text>
              <TouchableOpacity style={styles.heartBtn} onPress={() => toggleSave(dest.id)}>
                <Text style={styles.heartIcon}>{savedIds.includes(dest.id) ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
              <View style={styles.tempBadge}>
                <Text style={styles.tempText}>{dest.temp}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View style={styles.cardTitleBlock}>
                  <Text style={styles.destName}>{dest.name}</Text>
                  <Text style={styles.destCountry}>{dest.country}</Text>
                </View>
                <View style={styles.priceBlock}>
                  <Text style={styles.priceLabel}>from</Text>
                  <Text style={styles.price}>\${dest.price}</Text>
                  <Text style={styles.priceNight}>/night</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingText}>⭐ {dest.rating}</Text>
                </View>
                <Text style={styles.duration}>🗓 {dest.duration}</Text>
              </View>

              <View style={styles.tags}>
                {dest.tags.map(tag => (
                  <View key={tag} style={[styles.tag, { borderColor: dest.color }]}>
                    <Text style={[styles.tagText, { color: dest.color }]}>{tag}</Text>
                  </View>
                ))}
              </View>

              {selectedId === dest.id && (
                <View style={styles.expandedSection}>
                  <Text style={styles.description}>{dest.description}</Text>
                  <TouchableOpacity style={[styles.bookBtn, { backgroundColor: dest.color }]}>
                    <Text style={styles.bookBtnText}>Explore Trip ✈️</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    margin: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  savedBadge: {
    backgroundColor: '#FFF1F2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  savedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E11D48',
  },
  categories: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    gap: 8,
  },
  catBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  catBtnActive: {
    backgroundColor: '#111827',
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  catTextActive: {
    color: '#fff',
  },
  list: {
    maxHeight: 500,
  },
  listContent: {
    padding: 12,
    paddingBottom: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardHero: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 110,
    height: 110,
    borderRadius: 55,
    opacity: 0.35,
  },
  heroEmoji: {
    fontSize: 48,
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 18,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 17,
  },
  tempBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tempText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  cardBody: {
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitleBlock: {
    flex: 1,
  },
  destName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  destCountry: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  priceNight: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  ratingPill: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  expandedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  bookBtn: {
    marginTop: 14,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
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
  {
    name: 'HolidayDestinationPicker',
    description: 'A vibrant holiday destination picker with category filters, save/heart, temperature badges, price info, and expandable trip details.',
    brandId: 'default',
    code: holidayDestinationPickerCode,
  },
];
