import NoteCard, { Note } from "@/components/NoteCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@smartnote_notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Gagal load catatan:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.brandTitle}>SmartNote</Text>

          <TouchableOpacity style={styles.avatarBtn}>
            <Ionicons name="person-outline" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Catatanku</Text>
          <Text style={styles.pageSubtitle}>
            You have {notes.length} active thoughts today.
          </Text>
        </View>

        {/* LIST CATATAN */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => {
                console.log("Card ditekan:", item.title);
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada catatan.</Text>
              <Text style={styles.emptySubtext}>
                Tekan tombol + di bawah untuk membuat catatan baru.
              </Text>
            </View>
          }
        />

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.85}
          onPress={() => router.push("./writenote")}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563eb",
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#d0d8e8",
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1f2933",
    marginBottom: 8,
    letterSpacing: -1,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#9ca3af",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 120,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});