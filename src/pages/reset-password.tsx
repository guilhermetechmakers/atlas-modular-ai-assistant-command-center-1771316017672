import * as React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const requestSchema = z.object({ email: z.string().email('Invalid email') })
const resetSchema = z
  .object({
    password: z.string().min(8, 'At least 8 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type RequestData = z.infer<typeof requestSchema>
type ResetData = z.infer<typeof resetSchema>

export function ResetPasswordPage(): React.ReactElement {
  const [step, setStep] = React.useState<'request' | 'reset' | 'success'>('request')

  const requestForm = useForm<RequestData>({
    resolver: zodResolver(requestSchema),
  })
  const resetForm = useForm<ResetData>({
    resolver: zodResolver(resetSchema),
  })

  const onRequest = async (_data: RequestData): Promise<void> => {
    // TODO: Supabase password reset request
    setStep('reset')
  }
  const onReset = async (_data: ResetData): Promise<void> => {
    // TODO: Supabase password reset with token
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md border-border bg-card-surface">
          <CardHeader>
            <CardTitle className="text-foreground">Password reset</CardTitle>
            <CardDescription>Your password has been updated. You can now log in.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/login">Log in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-bold text-primary">Atlas</Link>
        </div>
        <Card className="border-border bg-card-surface shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">
              {step === 'request' ? 'Reset password' : 'Set new password'}
            </CardTitle>
            <CardDescription>
              {step === 'request'
                ? 'Enter your email and we’ll send a reset link.'
                : 'Enter your new password below.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'request' ? (
              <form onSubmit={requestForm.handleSubmit(onRequest)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...requestForm.register('email')}
                    className={requestForm.formState.errors.email ? 'border-destructive' : ''}
                  />
                  {requestForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {requestForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={requestForm.formState.isSubmitting}
                >
                  Send reset link
                </Button>
              </form>
            ) : (
              <form onSubmit={resetForm.handleSubmit(onReset)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...resetForm.register('password')}
                    className={resetForm.formState.errors.password ? 'border-destructive' : ''}
                  />
                  {resetForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {resetForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    {...resetForm.register('confirm')}
                    className={resetForm.formState.errors.confirm ? 'border-destructive' : ''}
                  />
                  {resetForm.formState.errors.confirm && (
                    <p className="text-sm text-destructive">
                      {resetForm.formState.errors.confirm.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={resetForm.formState.isSubmitting}
                >
                  Update password
                </Button>
              </form>
            )}
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">Back to log in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
