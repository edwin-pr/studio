
import { MessageSquareText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-2xl">
            <MessageSquareText className="h-8 w-8 mr-3 text-primary" />
            Your Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This is where you&apos;ll find conversations with landlords and property managers.
          </p>
          <p className="text-sm text-muted-foreground">
            Currently, this feature is under construction. Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
