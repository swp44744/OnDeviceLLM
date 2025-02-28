import { View, TextInput, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import { useDebounce } from "use-debounce";
// import { useExperts } from "@/hooks/useExperts";
import { Ionicons } from "@expo/vector-icons";

const CustomTextInput = () => {
  const [textInput, setTextInput] = useState("");
  const [debouncedTextInput] = useDebounce(textInput, 1000);
//   const { refetch } = useExperts({ specialty: debouncedSearchTerm || "" });

  useEffect(() => {
    if (debouncedTextInput !== undefined) {
    //   refetch();
    console.log('DEBOUNCED TEXT: ', debouncedTextInput);
    
    }
  }, [debouncedTextInput]);

  return (
    <Animated.View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Search Expert"
          placeholderTextColor="#fff"
          autoCorrect={false}
          autoCapitalize="none"
          value={textInput}
          onChangeText={setTextInput}
        />
        {textInput.length > 0 && (
          <Pressable onPress={() => setTextInput("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={22} color="#bbb" />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 10,
    width: '100%'
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23248d",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default CustomTextInput;
