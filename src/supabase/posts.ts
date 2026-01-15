
import { Supabase } from "@/config/supabase";

export const createPost = async (postData: any) => {
  console.log("Creating post in Supabase...", postData);

  const { data, error } = await Supabase.from("posts")
    .insert({
      user_id: postData.id,
      image_url: postData.img,
      storage_id: postData.storageId,
      caption: postData.caption,
      likes: 0,
      comments: 0,
    })
    .select()
    .single();

  console.log("DATA:: ", data);
  console.log("ERROR:: ", error);

  return data;
};
