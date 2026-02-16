import { View, Text } from "react-native";

export function SimulatorScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Simulator</Text>
      <Text style={{ marginTop: 12 }}>
        Phase 1 runtime target: WebView-hosted simulation with score sync endpoint.
      </Text>
    </View>
  );
}
