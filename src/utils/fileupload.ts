import { createClient } from "@supabase/supabase-js";
import * as FileSystem from "expo-file-system/legacy";

// Supabase client
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!
);

export const uploadFile = async (uri: string) => {
  try {
    // Read image as base64 (legacy API – explicitly allowed)
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    // Convert base64 → Uint8Array
    const buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const filePath = `${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("spotlight-posts")
      .upload(filePath, buffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) throw error;

    // console.log(data);

    return {
      success: true,
      id: data.id,
      fullPath: data.fullPath,
      path: data.path,
    };
  } catch (error) {
    console.error("Supabase upload failed:", error);
    return {
      success: false,
    };
  }
};
