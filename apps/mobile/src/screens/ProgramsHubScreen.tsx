import { View, Text } from "react-native";

export function ProgramsHubScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Programs Hub</Text>
      <Text style={{ marginTop: 12 }}>
        Part 107, Flight Skills, Simulator, and Corporate tracks.
      </Text>
    </View>
  );
}
