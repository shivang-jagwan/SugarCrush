'use server';

/**
 * @fileOverview Generates an animated hero section with cake illustrations from a text prompt.
 *
 * - generateAnimatedHeroSection - A function that generates the animated hero section.
 * - AnimatedHeroSectionInput - The input type for the generateAnimatedHeroSection function.
 * - AnimatedHeroSectionOutput - The return type for the generateAnimatedHeroSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimatedHeroSectionInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired hero section.'),
});
export type AnimatedHeroSectionInput = z.infer<typeof AnimatedHeroSectionInputSchema>;

const AnimatedHeroSectionOutputSchema = z.object({
  mediaUrl: z.string().describe('The URL of the generated animated hero section image.'),
});
export type AnimatedHeroSectionOutput = z.infer<typeof AnimatedHeroSectionOutputSchema>;

export async function generateAnimatedHeroSection(input: AnimatedHeroSectionInput): Promise<AnimatedHeroSectionOutput> {
  return generateAnimatedHeroSectionFlow(input);
}

const generateAnimatedHeroSectionPrompt = ai.definePrompt({
  name: 'generateAnimatedHeroSectionPrompt',
  input: {schema: AnimatedHeroSectionInputSchema},
  output: {schema: AnimatedHeroSectionOutputSchema},
  prompt: `Generate an animated hero section image based on the following description: {{{prompt}}}.  The image should contain cake illustrations or floating elements like sprinkles. Return the image as a data URI.`, 
});

const generateAnimatedHeroSectionFlow = ai.defineFlow(
  {
    name: 'generateAnimatedHeroSectionFlow',
    inputSchema: AnimatedHeroSectionInputSchema,
    outputSchema: AnimatedHeroSectionOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.prompt,
    });

    if (!media?.url) {
      throw new Error('No image was generated.');
    }

    return {mediaUrl: media.url};
  }
);
