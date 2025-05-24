
import { UserCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person portrait"/>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Your Profile</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Account Information</h3>
            <Separator />
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Username:</span>
              <span>JaneDoe123</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Email:</span>
              <span>jane.doe@example.com</span>
            </div>
             <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Member Since:</span>
              <span>January 1, 2023</span>
            </div>
          </div>
          
          <div className="space-y-2">
             <h3 className="font-semibold text-lg">Preferences</h3>
             <Separator />
             <p className="text-sm text-muted-foreground pt-2">
                Profile customization and preference settings are under construction. Please check back later.
             </p>
          </div>

          <Button className="w-full" disabled>Edit Profile (Coming Soon)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
