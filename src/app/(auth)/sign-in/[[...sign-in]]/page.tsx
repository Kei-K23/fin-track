import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2, Wallet } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="mb-6">
            <h1 className="text-center text-2xl md:text-3xl font-bold mb-3">
              Welcome Back!
            </h1>
            <p className="max-w-[580px] text-base text-muted-foreground text-center">
              Login or create new account to access the power of{" "}
              <span className="text-blue-500 font-bold">FinTrack</span> to
              manage your finance
            </p>
          </div>
          <ClerkLoading>
            <Loader2 className="animate-spin w-[40px] h-[40px]" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
        </div>
      </div>
      <div className="h-full hidden bg-blue-600 lg:flex flex-col items-center justify-center px-4">
        <div>
          <Wallet className="w-[100px] h-[100px] text-neutral-100" />
        </div>
      </div>
    </div>
  );
}
