import "@mantine/core/styles.css";
import {
  MantineProvider,
  Button,
  Stack,
  Text,
  Container,
} from "@mantine/core";
import { theme } from "./theme";
import BusyStatus from "./components/BusyDisplay";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

type UserId = "nono" | "lili";

const supabase = createClient(
  "https://aqabbiooegdfrigcouxi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYWJiaW9vZWdkZnJpZ2NvdXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTQ0NzcsImV4cCI6MjA2MDY3MDQ3N30.MZOHtaDo7Ftomij_4_nYiUw6oAXbhQIBz_sc039LunA",
);

const getUserFromLocalStorage = (): UserId | null => {
  const user = localStorage.getItem("banana-li-user");
  return user === "nono" || user === "lili" ? user : null;
};

export default function App() {
  const [user, setUser] = useState<UserId | null>(null);
  const [busy, setBusy] = useState(false);
  const [otherBusy, setOtherBusy] = useState(false);

  const getOther = (u: UserId): UserId => (u === "nono" ? "lili" : "nono");

  const saveUser = (u: UserId) => {
    localStorage.setItem("banana-li-user", u);
    setUser(u);
  };

  const fetchMyStatus = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("statuses")
      .select("is_busy")
      .eq("user_id", user)
      .single();
    if (error) console.error(error);
    if (data) setBusy(data.is_busy);
  }, [user]);

  const fetchOtherStatus = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("statuses")
      .select("is_busy")
      .eq("user_id", getOther(user))
      .single();
    if (error) console.error(error);
    if (data) setOtherBusy(data.is_busy);
  }, [user]);

  const onToggleBusy = useCallback(
    async (busy: boolean) => {
      if (!user) return;
      const { error } = await supabase
        .from("statuses")
        .update({ is_busy: busy })
        .eq("user_id", user);
      if (error) console.error(error);
      fetchMyStatus();
      fetchOtherStatus();
    },
    [user, fetchMyStatus, fetchOtherStatus]
  );

  // 🔁 Charger user au démarrage
  useEffect(() => {
    const savedUser = getUserFromLocalStorage();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // 🔁 Charger statuts au changement d'utilisateur
  useEffect(() => {
    if (user) {
      fetchMyStatus();
      fetchOtherStatus();
    }
  }, [user]);

  // ✅ Souscription en temps réel
  useEffect(() => {
    if (!user) return;

    const other = getOther(user);

    const channel = supabase
      .channel("status-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "statuses",
          filter: `user_id=eq.${other}`,
        },
        (payload) => {
          const updated = payload.new as { is_busy: boolean };
          setOtherBusy(updated.is_busy);
          console.log(`[Realtime] ${other} updated to`, updated.is_busy);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);


  console.log('meBusy', busy, 'otherBusy', otherBusy)

  // 🚪 Interface choix de user
  if (!user) {
    return (
      <MantineProvider theme={theme}>
        <Container size="xs" pt="xl">
          <Stack align="center" gap="lg">
            <Text size="xl" fw={600}>
              Who are you ?
            </Text>
            <Button size="xl" fullWidth onClick={() => saveUser("nono")}>
              Nono
            </Button>
            <Button size="xl" fullWidth onClick={() => saveUser("lili")}>
              Lili
            </Button>
          </Stack>
        </Container>
      </MantineProvider>
    );
  }

  // 🧠 Interface principale
  return (
    <MantineProvider theme={theme}>
      <BusyStatus
        user={user}
        meBusy={busy}
        otherBusy={otherBusy}
        onToggleBusy={onToggleBusy}
      />
    </MantineProvider>
  );
}
