'use client';

import { useState } from 'react';
import { loginAction } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8 font-bold text-xl text-amber-950 flex items-center gap-2">
        Student Feedback Portal
      </Link>
      
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-amber-200/60 shadow-xl shadow-amber-500/5">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-amber-600" />
          </div>
          <CardTitle className="text-2xl text-amber-950">Dashboard Access</CardTitle>
          <CardDescription className="text-amber-900/60">
            Please enter your password to view the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Enter password..."
                className="h-12 border-amber-200 focus-visible:ring-amber-500"
                required
              />
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all"
              disabled={isPending}
            >
              {isPending ? 'Verifying...' : (
                <>
                  Access Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
