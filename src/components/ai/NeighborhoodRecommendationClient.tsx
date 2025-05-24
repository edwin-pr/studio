
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, AlertCircle } from 'lucide-react';
import { neighborhoodRecommendation, type NeighborhoodRecommendationOutput } from '@/ai/flows/neighborhood-recommendation';

export function NeighborhoodRecommendationClient() {
  const [preferences, setPreferences] = useState('');
  const [recommendation, setRecommendation] = useState<NeighborhoodRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await neighborhoodRecommendation({ lifestylePreferences: preferences });
      setRecommendation(result);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Lightbulb className="h-7 w-7 mr-2 text-accent" />
            Neighborhood Recommendation AI
          </CardTitle>
          <CardDescription>
            Describe your lifestyle, priorities, and what you&apos;re looking for in a neighborhood. Our AI will suggest some great options for you!
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="preferences" className="text-base font-medium">Your Preferences</Label>
              <Textarea
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g., I'm looking for a quiet area with good parks, family-friendly, and a short commute to downtown. I enjoy local coffee shops and farmers markets..."
                rows={6}
                className="text-base"
                required
              />
              <p className="text-xs text-muted-foreground">
                Be as detailed as possible for the best recommendations.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !preferences.trim()} className="w-full text-base py-3">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                'Find My Neighborhood'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendation && (
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Recommended Neighborhoods:</h3>
              <p className="text-muted-foreground whitespace-pre-line">{recommendation.neighborhoodRecommendations}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Reasoning:</h3>
              <p className="text-muted-foreground whitespace-pre-line">{recommendation.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
