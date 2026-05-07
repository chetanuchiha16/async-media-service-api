import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 relative overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/30 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10 relative">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue to Hinaverse</p>
        </div>
        <LoginForm className="shadow-2xl shadow-primary/5 rounded-2xl border-white/10" />
      </div>
    </div>
  )
}
