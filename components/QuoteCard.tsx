import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuoteCardProps {
  quote: string;
  author: string;
  onPress?: () => void;
}

export default function QuoteCard({
  quote,
  author,
  onPress,
}: QuoteCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.leftAccent} />

      <View style={styles.content}>
        <View style={styles.textWrap}>
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.author}>{author.toUpperCase()}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.bookmarkBtn,
            bookmarked && styles.bookmarkBtnActive,
          ]}
          onPress={() => setBookmarked((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={18}
            color={bookmarked ? "#fff" : "#aaa"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
  },
  leftAccent: {
    width: 4,
    backgroundColor: "#2563eb",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  textWrap: {
    flex: 1,
  },
  quote: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    lineHeight: 22,
    marginBottom: 8,
  },
  author: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 0.5,
  },
  bookmarkBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f2f4f8",
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkBtnActive: {
    backgroundColor: "#2563eb",
  },
});