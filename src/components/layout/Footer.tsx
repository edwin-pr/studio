
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tenant Haven. All rights reserved.</p>
        <p className="mt-1">Your trusted partner in finding the perfect home.</p>
      </div>
    </footer>
  );
}
