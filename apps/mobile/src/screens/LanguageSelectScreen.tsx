import { Pressable, Text, View } from "react-native";
import { SUPPORTED_LOCALES, type LocaleCode } from "../config/locales";

export function LanguageSelectScreen({
  current,
  onSelect
}: {
  current: LocaleCode;
  onSelect: (locale: LocaleCode) => void;
}) {
  return (
    <View style={{ flex: 1, padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Select language</Text>
      {SUPPORTED_LOCALES.map((locale) => (
        <Pressable
          key={locale}
          onPress={() => onSelect(locale)}
          style={{
            padding: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: current === locale ? "#0ea5e9" : "#94a3b8"
          }}
        >
          <Text>{locale.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
}
