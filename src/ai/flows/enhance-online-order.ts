'use server';

/**
 * @fileOverview A flow to enhance online cake orders with AI recommendations and clarifications.
 *
 * - enhanceOnlineOrder - A function that enhances cake orders with AI.
 * - EnhanceOnlineOrderInput - The input type for the enhanceOnlineOrder function.
 * - EnhanceOnlineOrderOutput - The return type for the enhanceOnlineOrder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceOnlineOrderInputSchema = z.object({
  orderDetails: z
    .string()
    .describe('Details of the cake order specified by the customer.'),
});
export type EnhanceOnlineOrderInput = z.infer<typeof EnhanceOnlineOrderInputSchema>;

const EnhanceOnlineOrderOutputSchema = z.object({
  enhancedOrderDetails: z
    .string()
    .describe(
      'AI-enhanced order details, including recommendations for flavors or customization, or requests for clarification.'
    ),
});
export type EnhanceOnlineOrderOutput = z.infer<typeof EnhanceOnlineOrderOutputSchema>;

export async function enhanceOnlineOrder(
  input: EnhanceOnlineOrderInput
): Promise<EnhanceOnlineOrderOutput> {
  return enhanceOnlineOrderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceOnlineOrderPrompt',
  input: {schema: EnhanceOnlineOrderInputSchema},
  output: {schema: EnhanceOnlineOrderOutputSchema},
  prompt: `You are an AI assistant specializing in enhancing online cake orders.

  Based on the customer's order details, provide smart recommendations for flavors or customization, or request clarification if needed.

  Order Details: {{{orderDetails}}}

  Enhanced Order Details: `,
});

const enhanceOnlineOrderFlow = ai.defineFlow(
  {
    name: 'enhanceOnlineOrderFlow',
    inputSchema: EnhanceOnlineOrderInputSchema,
    outputSchema: EnhanceOnlineOrderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
