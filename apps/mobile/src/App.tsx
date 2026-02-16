import { useMemo } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { applyDirection, resolveLocale, t } from "./i18n";
import { ProgramsHubScreen } from "./screens/ProgramsHubScreen";
import { SimulatorScreen } from "./screens/SimulatorScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { SubscriptionScreen } from "./screens/SubscriptionScreen";

interface AppProps {
  locale?: string;
}

export function App({ locale }: AppProps) {
  const resolvedLocale = useMemo(() => resolveLocale(locale), [locale]);
  const isRtl = applyDirection(resolvedLocale);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: "800" }}>AGRON Mobile</Text>
          <Text>
            Locale: {resolvedLocale} | Direction: {isRtl ? "rtl" : "ltr"}
          </Text>
          <Text>{t(resolvedLocale, "startTraining")}</Text>
          <ProgramsHubScreen />
          <SimulatorScreen />
          <ProgressScreen />
          <SubscriptionScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
