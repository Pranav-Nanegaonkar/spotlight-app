import { Supabase } from "@/config/supabase";

interface CreateUserParams {
  clerkId: string | undefined;
  email: string | undefined;
  fullName: string | null | undefined;
  imageUrl: string | undefined;
  username?: string | undefined;
}

export const CreateUserInSupabase = async (userData: CreateUserParams) => {
  // console.log("Creating user in Supabase...", userData);

  try {
    // First, check if user already exists
    const { data: existingUser, error: fetchError } = await Supabase.from(
      "users"
    )
      .select("*")
      .eq("clerk_id", userData.clerkId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 is "not found" which is fine
      throw fetchError;
    }

    if (existingUser) {
      console.log("User already exists in Supabase");
      return { success: true, user: existingUser, isNew: false };
    }

    // Generate username from email or name
    const generatedUsername =
      userData.username ||
      (userData.email &&
        userData.email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "") + Math.floor(Math.random() * 1000));

    // Create new user
    const { data: newUser, error: insertError } = await Supabase.from("users")
      .insert({
        username: generatedUsername,
        fullname: userData.fullName || "User",
        email: userData.email,
        image: userData.imageUrl,
        clerk_id: userData.clerkId,
        followers: 0,
        following: 0,
        posts: 0,
      })
      .select("*")
      .single();

    if (insertError) {
      throw insertError;
    }

    console.log("User created successfully in Supabase:", newUser);
    return { success: true, user: newUser, isNew: true };
  } catch (error: any) {
    console.error("Error creating user in Supabase:", error);
    throw new Error(error.message || "Failed to create user");
  }
};

// Optional: Function to get user by Clerk ID
export const getUserByClerkId = async (clerkId: string) => {
  try {
    const { data, error } = await Supabase.from("users")
      .select("*")
      .eq("clerk_id", clerkId)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return null;
  }
};
