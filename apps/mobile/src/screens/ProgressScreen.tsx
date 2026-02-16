import { View, Text } from "react-native";

export function ProgressScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Progress</Text>
      <Text style={{ marginTop: 12 }}>
        Track completion, simulator trends, safety score, and weak-area recommendations.
      </Text>
    </View>
  );
}
