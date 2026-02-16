import { View, Text } from "react-native";

export function SubscriptionScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Billing & Entitlements</Text>
      <Text style={{ marginTop: 12 }}>
        iOS StoreKit and Google Play Billing should be verified server-side before entitlement unlock.
      </Text>
    </View>
  );
}
