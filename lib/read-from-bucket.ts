// readJsonFromSupabase.ts
import { createClient } from "@supabase/supabase-js";
import { FeedItem } from "./feed-item";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const readJsonFromBucket = async () => {
  const { data, error } = await supabase.storage
    .from("sources")
    .download("results.json");

  if (error) {
    console.error("Error downloading the file:", error);
    return;
  }

  const text = await data?.text();

  try {
    const jsonData = safeJsonParse<FeedItem[]>(text);
    return jsonData;
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
};

const safeJsonParse = <T>(str: string) => {
    try {
      const jsonValue: T = JSON.parse(str);
  
      return jsonValue;
    } catch {
      return undefined;
    }
  };
