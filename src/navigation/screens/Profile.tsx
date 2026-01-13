import { Supabase } from "@/config/supabase";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

export default function ProfileScreen() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data: todos, error } = await Supabase.from("todos").select();

        if (error) {
          console.error("Error fetching todos:", error.message);
          return;
        }

        if (todos && todos.length > 0) {
          setTodos(todos as any);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };

    getTodos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
      />
    </View>
  );
}
