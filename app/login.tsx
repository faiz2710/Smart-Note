import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";

// ── Reusable Field ─────────────────────────────────
function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  const [focused, setFocused] = useState(false);
  const line = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    setFocused(true);
    Animated.timing(line, { toValue: 1, duration: 220, useNativeDriver: false }).start();
  };

  const onBlur = () => {
    setFocused(false);
    Animated.timing(line, { toValue: 0, duration: 220, useNativeDriver: false }).start();
  };

  const lineWidth = line.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={f.wrap}>
      <Text style={f.label}>{label}</Text>

      <TextInput
        style={f.input}
        placeholderTextColor="#9ca3af"
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />

      <View style={f.track} />
      <Animated.View style={[f.activeLine, { width: lineWidth }]} />
    </View>
  );
}

const f = StyleSheet.create({
  wrap: { marginBottom: 28 },
  label: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: "#111",
    paddingVertical: 8,
  },
  track: {
    height: 1,
    backgroundColor: "#e5e7eb",
    width: "100%",
  },
  activeLine: {
    height: 1,
    backgroundColor: "#2563eb",
    marginTop: -1,
  },
});

// ── Google Icon ────────────────────────────────────
function GoogleIcon() {
  return (
    <View style={g.iconWrap}>
      <Text style={g.g}>G</Text>
    </View>
  );
}

const g = StyleSheet.create({
  iconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  g: {
    fontSize: 11,
    fontWeight: "800",
    color: "#222",
  },
});

// ── Main Screen ────────────────────────────────────
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" />

      <View style={s.inner}>
        {/* Logo */}
        <View style={s.wordmarkWrap}>
          <View style={s.pill} />
          <Text style={s.wordmark}>SmartNote</Text>
        </View>

        {/* Tagline */}
        <Text style={s.tagline}>
          Your thoughts,{"\n"}refined.
        </Text>

        {/* Form */}
        <View style={s.form}>
          <Field
            label="Email"
            placeholder="Cecep@gmail.com"
            value={email}
            onChangeText={setEmail}
          />

          <Field
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable style={s.forgotWrap}>
            <Text style={s.forgot}>Forgot password?</Text>
          </Pressable>

          <AppButton
            title="Login"
            onPress={() => router.replace("/(tabs)")}
            style={s.loginBtn}
          />

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerTxt}>or</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Google */}
          <Pressable style={s.googleBtn}>
            <GoogleIcon />
            <Text style={s.googleTxt}>Continue with Google</Text>
          </Pressable>
        </View>

        {/* Signup */}
        <Pressable onPress={() => router.push("/register")} style={s.signupWrap}>
          <Text style={s.signupTxt}>
            No account?{" "}
            <Text style={s.signupLink}>Sign up →</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ─────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },

  wordmarkWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  pill: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: "#2563eb",
    marginRight: 10,
  },
  wordmark: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },

  tagline: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111",
    lineHeight: 42,
    marginBottom: 48,
  },

  form: {
    flex: 1,
  },

  forgotWrap: {
    alignSelf: "flex-end",
    marginTop: -14,
    marginBottom: 28,
  },
  forgot: {
    fontSize: 12,
    color: "#6b7280",
  },

  loginBtn: {
    marginBottom: 28,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerTxt: {
    fontSize: 11,
    color: "#9ca3af",
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  googleTxt: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },

  signupWrap: {
    paddingTop: 28,
    alignItems: "center",
  },
  signupTxt: {
    fontSize: 13,
    color: "#6b7280",
  },
  signupLink: {
    color: "#2563eb",
    fontWeight: "600",
  },
});