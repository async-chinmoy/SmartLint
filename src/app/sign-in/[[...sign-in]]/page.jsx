import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="flex flex-col min-h-full w-full items-center justify-center">
    <SignIn />
  </div>;
}