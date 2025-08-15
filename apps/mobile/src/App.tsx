import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Pressable, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import type { Task } from '@acme/types';
import { AppButton, AppTextInput } from '@acme/ui';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      Alert.alert('Error', 'Cannot reach API: ' + String(e));
    }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    setTitle('');
    load();
  };

  const toggle = async (task: Task) => {
    await fetch(`${API_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    load();
  };

  const remove = async (task: Task) => {
    await fetch(`${API_URL}/api/tasks/${task.id}`, { method: 'DELETE' });
    load();
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Constants.statusBarHeight, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Tasks (Mobile)</Text>

      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <AppTextInput
          placeholder="New task..."
          value={title}
          onChangeText={setTitle}
          style={{ flex: 1 }}
        />
        <AppButton title="Add" onPress={add} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(t) => String(t.id)}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 }}>
            <Pressable onPress={() => toggle(item)}>
              <Text style={{ fontSize: 18 }}>{item.completed ? '✅' : '⬜️'}</Text>
            </Pressable>
            <Text style={{ flex: 1, fontSize: 16, textDecorationLine: item.completed ? 'line-through' : 'none' }}>
              {item.title}
            </Text>
            <Pressable onPress={() => remove(item)}>
              <Text>🗑️</Text>
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ddd' }} />}
      />
    </SafeAreaView>
  );
}
