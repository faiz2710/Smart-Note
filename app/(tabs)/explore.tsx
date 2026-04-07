import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ArticleCard from "@/components/articlecard";
import QuoteCard from "@/components/QuoteCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function InspirasiHariIniScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Inspirasi Hari Ini</Text>

        <TouchableOpacity style={styles.avatarBtn}>
          <Ionicons name="person-outline" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* FEATURED QUOTE */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredBadgeWrap}>
            <Text style={styles.featuredBadge}>FEATURED QUOTE</Text>
          </View>

          <Text style={styles.featuredQuote}>
            "Creativity is intelligence having fun."
          </Text>

          <Text style={styles.featuredAuthor}>
            — Albert Einstein
          </Text>
        </View>

        {/* FEED */}
        <View style={styles.feed}>
          <ArticleCard
            title="Menjaga Fokus di Era Distraksi Digital"
            excerpt="Teknik deep work untuk meningkatkan produktivitas..."
            author="Andi Pratama"
          />

          <QuoteCard
            quote='"Hanya mereka yang berani gagal total yang dapat meraih keberhasilan total."'
            author="Robert F. Kennedy"
          />

          <ArticleCard
            title="Minimalisme: Seni Melepaskan"
            excerpt="Bagaimana ruang yang bersih menciptakan pikiran yang jerni..."
            author="Siska Rahayu"
          />

          <QuoteCard
            quote='"The best way to predict your future is to create it."'
            author="Abraham Lincoln"
          />
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push("/writenote")}
      >
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#eef1f7",
    paddingBottom: 40, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  featuredCard: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  featuredBadgeWrap: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
  },
  featuredBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  featuredQuote: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 30,
    marginBottom: 14,
  },
  featuredAuthor: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  feed: {
    gap: 0,
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