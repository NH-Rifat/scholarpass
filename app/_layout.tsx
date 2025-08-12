import { Stack } from "expo-router";
import { QueryProvider } from "../providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen
          name="(Home)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(Auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryProvider>
  );
}
