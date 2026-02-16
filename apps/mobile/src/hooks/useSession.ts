import { useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../storage/local-store";

const SESSION_KEY = "agron_mobile_session";

export function useSession() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getItem(SESSION_KEY).then((token) => {
      setAccessToken(token);
      setReady(true);
    });
  }, []);

  async function login(token: string) {
    setAccessToken(token);
    await setItem(SESSION_KEY, token);
  }

  async function logout() {
    setAccessToken(null);
    await removeItem(SESSION_KEY);
  }

  return { accessToken, ready, login, logout };
}
