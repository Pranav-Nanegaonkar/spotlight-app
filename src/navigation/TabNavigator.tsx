import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import BookmarkScreen from "./screens/Bookmark";
import CreateScreen from "./screens/Create";
import NotificationScreen from "./screens/Notification";
import ProfileScreen from "./screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  const TabBarIcon = ({ name, size, color }: any) => {
    return <Ionicons name={name} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 40,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TabBarIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TabBarIcon name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TabBarIcon name="add-circle" size={size} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TabBarIcon name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <TabBarIcon name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
