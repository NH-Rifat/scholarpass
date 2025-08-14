import { Stack } from "expo-router";
import { QueryProvider } from "../providers/QueryProvider";
import { ReduxProvider } from "../providers/ReduxProvider";

export default function RootLayout() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
            }}
          />
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
        <Stack.Screen
          name="scholarpass"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryProvider>
    </ReduxProvider>
  );
}
