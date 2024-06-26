import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import * as React from "react";
import { Button } from "./ui/button";
import { env } from "@/env";

interface AuthProps {}

const Auth: React.FC<AuthProps> = ({}) => {
  return (
    <>
      <SignedOut>
        <Button asChild className="" variant="outline">
          <SignInButton
            mode="modal"
            forceRedirectUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL}
          />
        </Button>
      </SignedOut>
      <SignedIn>
        <Button variant="outline" asChild>
          <UserButton afterSignOutUrl="/" />
        </Button>
      </SignedIn>
    </>
  );
};

export default Auth;
