'use server';

/**
 * @fileOverview AI agent for recommending neighborhoods based on user preferences.
 *
 * - neighborhoodRecommendation - A function that takes user preferences and returns neighborhood recommendations.
 * - NeighborhoodRecommendationInput - The input type for the neighborhoodRecommendation function.
 * - NeighborhoodRecommendationOutput - The return type for the neighborhoodRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NeighborhoodRecommendationInputSchema = z.object({
  lifestylePreferences: z
    .string()
    .describe(
      'A description of the user lifestyle preferences and priorities when choosing a neighborhood.'
    ),
});
export type NeighborhoodRecommendationInput = z.infer<
  typeof NeighborhoodRecommendationInputSchema
>;

const NeighborhoodRecommendationOutputSchema = z.object({
  neighborhoodRecommendations: z
    .string()
    .describe('A list of recommended neighborhoods based on the user preferences.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the neighborhood recommendations.'),
});
export type NeighborhoodRecommendationOutput = z.infer<
  typeof NeighborhoodRecommendationOutputSchema
>;

export async function neighborhoodRecommendation(
  input: NeighborhoodRecommendationInput
): Promise<NeighborhoodRecommendationOutput> {
  return neighborhoodRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'neighborhoodRecommendationPrompt',
  input: {schema: NeighborhoodRecommendationInputSchema},
  output: {schema: NeighborhoodRecommendationOutputSchema},
  prompt: `You are an expert in neighborhood recommendations. Based on the user's lifestyle preferences and priorities, recommend a list of neighborhoods and explain your reasoning.

User Preferences: {{{lifestylePreferences}}}

Recommendations:
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const neighborhoodRecommendationFlow = ai.defineFlow(
  {
    name: 'neighborhoodRecommendationFlow',
    inputSchema: NeighborhoodRecommendationInputSchema,
    outputSchema: NeighborhoodRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
