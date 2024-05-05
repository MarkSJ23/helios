import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function SignUpPage() {
  // TODO: Better Styling
  return (
    <main className="flex grow flex-col items-center p-4">
      <div className="grow-0 text-center text-7xl font-black">
        Empower Your <span className="text-green-700">Potential</span>
      </div>
      <div className="grow" />
      <div className="flex grow-0 flex-col gap-2">
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign Up</Button>
        </SignUpButton>
      </div>
      <div className="grow" />
    </main>
  );
}
