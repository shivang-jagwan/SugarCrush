"use server";

import { enhanceOnlineOrder } from "@/ai/flows/enhance-online-order";
import { z } from "zod";

const enhanceOrderSchema = z.object({
  orderDetails: z.string(),
});

export async function enhanceOrder(input: z.infer<typeof enhanceOrderSchema>) {
  const parsedInput = enhanceOrderSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: "Invalid input" };
  }

  try {
    const output = await enhanceOnlineOrder(parsedInput.data);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error enhancing order:", error);
    return { success: false, error: "Failed to enhance order" };
  }
}
