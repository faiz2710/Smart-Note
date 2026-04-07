import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Begin your journey in the Digital Atelier.
      </Text>

      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email Address" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />

      <AppButton title="Register" onPress={() => {}} />

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>
          Already have an account?{" "}
          <Text style={{ color: "#2F6BFF" }}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}

// ⬇️ STYLE DI BAWAH
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#777",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F1F2F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  link: {
    textAlign: "center",
    marginTop: 20,
  },
});