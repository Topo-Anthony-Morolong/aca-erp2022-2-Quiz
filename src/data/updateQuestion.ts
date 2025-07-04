    // src/updateQuestions.ts
import { supabase } from "./superbaseClient";
import { questions } from "../data/questions";

const updateQuestions = async () => {
  const { data, error } = await supabase
    .from("Questions_table")
    .update({ q_Data: JSON.stringify(questions) })
    .eq("id", 1); // Update based on the row's ID (adjust if different column is needed)

  if (error) {
    console.error("❌ Failed to update questions:", error.message);
  } else {
    console.log("✅ Successfully updated q_Data column.");
  }
};

updateQuestions();
