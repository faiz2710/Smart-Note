import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Bikin interface/tipe data buat props
export interface Note {
  id: string;
  title: string;
  snippet: string;
  tag: string;
  date: string;
}

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  // Bikin logic kecil buat bedain style tag (warna biru khusus STRATEGY)
  const isStrategy = note.tag.toUpperCase() === 'STRATEGY';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={[styles.tagContainer, isStrategy && styles.tagContainerBlue]}>
          <Text style={[styles.tagText, isStrategy && styles.tagTextBlue]}>
            {note.tag.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.dateText}>{note.date}</Text>
      </View>
      
      <Text style={styles.title} numberOfLines={1}>{note.title}</Text>
      <Text style={styles.snippet} numberOfLines={2}>{note.snippet}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    // Soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  tagContainerBlue: {
    backgroundColor: '#e6efff', // Biru sangat muda
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9ca3af',
    letterSpacing: 1,
  },
  tagTextBlue: {
    color: '#2563eb', // Biru tulisan
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2933',
    marginBottom: 8,
  },
  snippet: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});