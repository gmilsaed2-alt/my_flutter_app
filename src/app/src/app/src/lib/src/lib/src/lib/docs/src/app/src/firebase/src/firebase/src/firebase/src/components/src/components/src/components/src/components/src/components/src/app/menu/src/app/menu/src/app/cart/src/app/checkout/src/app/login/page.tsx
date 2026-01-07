"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the password against a secure hash.
    // For this demo, we'll use a simple hardcoded password.
    if (password === 'admin123') {
      toast({ title: "تم تسجيل الدخول بنجاح" });
      router.push('/admin');
    } else {
      toast({ title: "كلمة المرور غير صحيحة", variant: 'destructive' });
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">لوحة تحكم المالك</CardTitle>
          <CardDescription>الرجاء إدخال كلمة المرور للوصول.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full">
              دخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
