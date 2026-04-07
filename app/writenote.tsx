import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

// Daftar tag buat fitur gonta-ganti tag
const TAGS = ['PERSONAL', 'STRATEGY', 'PROJECT'];

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState(TAGS[0]); // Default 'PERSONAL'
  const [currentDate, setCurrentDate] = useState('');

  // Generate tanggal hari ini pas halaman dibuka
  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setCurrentDate(today.toLocaleDateString('id-ID', options));
  }, []);

  // Fungsi buat gonta-ganti tag pas pill "Tambah Tag" dipencet
  const toggleTag = () => {
    const currentIndex = TAGS.indexOf(tag);
    const nextIndex = (currentIndex + 1) % TAGS.length;
    setTag(TAGS[nextIndex]);
  };

  // Fungsi SIMPAN ke AsyncStorage
  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Eits!', 'Judul atau isi catatan nggak boleh kosong dong.');
      return;
    }

    try {
      // 1. Ambil data yang udah ada dulu
      const existingNotes = await AsyncStorage.getItem('@smartnote_notes');
      let notesArray = existingNotes ? JSON.parse(existingNotes) : [];

      // 2. Bikin objek catatan baru
      const newNote = {
        id: Date.now().toString(), // Bikin ID unik pakai timestamp
        title: title.trim() || 'Tanpa Judul',
        snippet: content.trim() || '...',
        tag: tag,
        date: currentDate,
      };

      // 3. Masukin ke posisi paling atas (awal array)
      notesArray.unshift(newNote);

      // 4. Save balik ke AsyncStorage
      await AsyncStorage.setItem('@smartnote_notes', JSON.stringify(notesArray));

      // 5. Balik ke halaman Home
      router.back();
    } catch (error) {
      console.error('Gagal menyimpan catatan:', error);
      Alert.alert('Error', 'Gagal menyimpan catatan.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
            <Feather name="arrow-left" size={24} color="#1f2933" />
            <Text style={styles.headerTitle}>Tulis Catatan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Simpan</Text>
          </TouchableOpacity>
        </View>

        {/* META PILLS (Date & Tag) */}
        <View style={styles.metaContainer}>
          <View style={styles.pill}>
            <Feather name="calendar" size={14} color="#64748b" />
            <Text style={styles.pillText}>{currentDate}</Text>
          </View>
          <TouchableOpacity style={styles.pill} onPress={toggleTag} activeOpacity={0.7}>
            <Feather name="plus-circle" size={14} color="#2563eb" />
            <Text style={styles.pillText}>{tag}</Text>
          </TouchableOpacity>
        </View>

        {/* INPUT AREA */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Judul Catatan"
            placeholderTextColor="#cbd5e1"
            value={title}
            onChangeText={setTitle}
          />
          {/* Garis biru pendek di bawah judul sesuai desain */}
          <View style={styles.titleUnderline} />

          <TextInput
            style={styles.contentInput}
            placeholder="Mulai mengetik ide kamu di sini..."
            placeholderTextColor="#cbd5e1"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
        </View>

        {/* BOTTOM TOOLBAR */}
        <View style={styles.toolbar}>
          <View style={styles.toolbarIcons}>
            <TouchableOpacity><Text style={styles.formatIconText}>B</Text></TouchableOpacity>
            <TouchableOpacity><Text style={[styles.formatIconText, { fontStyle: 'italic' }]}>I</Text></TouchableOpacity>
            <TouchableOpacity><Feather name="list" size={20} color="#fff" /></TouchableOpacity>
            <TouchableOpacity><Feather name="image" size={20} color="#fff" /></TouchableOpacity>
            <TouchableOpacity><Feather name="mic" size={20} color="#fff" /></TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.aiButton} activeOpacity={0.8}>
            <MaterialCommunityIcons name="magic-staff" size={18} color="#fff" />
            <Text style={styles.aiButtonText}>SMART AI</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2933',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb', // Warna biru khas SmartNote
  },
  metaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleInput: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1f2933',
    padding: 0, // Reset padding bawaan android
  },
  titleUnderline: {
    width: 60, // Lebar garis biru pendek
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 24,
  },
  contentInput: {
    flex: 1,
    fontSize: 18,
    color: '#4b5563',
    lineHeight: 28,
    paddingTop: 0,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333', // Warna dark grey melengkung
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 40, // Bentuk pill
  },
  toolbarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingLeft: 8,
  },
  formatIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});