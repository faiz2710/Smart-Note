import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  authorAvatar?: any;
  onPress?: () => void;
}

export default function ArticleCard({
  title,
  excerpt,
  author,
  authorAvatar,
  onPress,
}: ArticleCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.excerpt}>{excerpt}</Text>

          <View style={styles.authorRow}>
            {authorAvatar ? (
              <Image source={authorAvatar} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
            <Text style={styles.author}>{author}</Text>
          </View>
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
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
    lineHeight: 21,
  },
  excerpt: {
    fontSize: 13,
    color: "#888",
    lineHeight: 18,
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  avatarPlaceholder: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ddd",
  },
  author: {
    fontSize: 12,
    color: "#555",
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