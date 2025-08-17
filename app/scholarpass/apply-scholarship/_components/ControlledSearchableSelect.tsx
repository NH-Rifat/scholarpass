import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Option {
  id: number;
  name: string;
  [key: string]: any; // Allow additional properties
}

interface ControlledSearchableSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
  isLoading?: boolean;
  onSearch?: (query: string) => void;
  icon?: React.ReactNode;
  rules?: object;
  renderOption?: (option: Option) => React.ReactNode;
  disabled?: boolean;
}

export const ControlledSearchableSelect: React.FC<
  ControlledSearchableSelectProps
> = ({
  name,
  label,
  placeholder = "Search and select...",
  options = [],
  isLoading = false,
  onSearch,
  icon,
  rules = {},
  renderOption,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Animation values
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  // Find the selected option by matching the stored value
  const selectedOption = options.find(
    (option) => value === option.name || value === option.id || value === option
  );

  // Filter options based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = options.filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);

      // Trigger external search if provided
      onSearch?.(searchQuery);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options, onSearch]);

  // Animation functions
  const openModal = () => {
    if (disabled) return;
    setModalVisible(true);
    setSearchQuery("");
    setFilteredOptions(options);

    // Reset animations and start opening animation
    slideAnim.setValue(Dimensions.get("window").height);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").height,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  const handleSelectOption = (option: Option) => {
    onChange(option.name); // Store the name as the value
    closeModal();
  };

  const handleOpenModal = () => {
    openModal();
  };

  const renderItem = ({ item }: { item: Option }): React.JSX.Element => {
    if (renderOption) {
      const renderedOption = renderOption(item);
      if (React.isValidElement(renderedOption)) {
        return renderedOption;
      }
    }

    return (
      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => handleSelectOption(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.optionText}>{item.name}</Text>
        {/* Additional info can be shown here */}
        {(item as any).city && (
          <Text style={styles.optionSubText}>
            {(item as any).city}
            {(item as any).state?.name ? `, ${(item as any).state.name}` : ""}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[
          styles.selectButton,
          error && styles.selectButtonError,
          disabled && styles.selectButtonDisabled,
        ]}
        onPress={handleOpenModal}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <Text
          style={[
            styles.selectButtonText,
            !selectedOption && styles.placeholderText,
            disabled && styles.selectButtonTextDisabled,
            ...(icon ? [styles.textWithIcon] : []),
          ]}
        >
          {selectedOption ? selectedOption.name : placeholder}
        </Text>

        <Feather name="chevron-down" size={20} color="#6B7280" />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={closeModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Feather name="x" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Feather
                name="search"
                size={20}
                color="#6B7280"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
                autoFocus={true}
              />
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8B5CF6" />
                <Text style={styles.loadingText}>Loading options...</Text>
              </View>
            ) : filteredOptions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Feather name="search" size={48} color="#D1D5DB" />
                <Text style={styles.emptyText}>
                  {searchQuery ? "No results found" : "No options available"}
                </Text>
                {searchQuery && (
                  <Text style={styles.emptySubText}>
                    Try adjusting your search query
                  </Text>
                )}
              </View>
            ) : (
              <FlatList
                data={filteredOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.optionsList}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={10}
                windowSize={10}
              />
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 52,
  },
  selectButtonError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  selectButtonDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
    opacity: 0.6,
  },
  iconContainer: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  textWithIcon: {
    marginLeft: 0,
  },
  selectButtonTextDisabled: {
    color: "#9CA3AF",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    minHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 12,
  },
  optionsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  optionSubText: {
    fontSize: 14,
    color: "#6B7280",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
  },
});
