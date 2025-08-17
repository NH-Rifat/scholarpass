import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const FormHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>
          Get a <Text style={styles.highlightText}>Full Scholarship</Text> for
          Personalized Learning
        </Text>
        <Text style={styles.subtitle}>
          ScholarPASS makes it possible for every student to receive
          high-quality tutoring, courses, and bootcamps without the financial
          burden. Complete the application below to get started.
        </Text>
      </View>

      <View style={styles.formTitleContainer}>
        <MaterialIcons name="description" size={24} color="#374151" />
        <Text style={styles.formTitle}>ScholarPASS Application Form</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  content: {
    alignItems: "center",
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 32,
  },
  highlightText: {
    color: "#8B5CF6",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 600,
  },
  formTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
});
