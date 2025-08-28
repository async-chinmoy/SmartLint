import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import CodeAnalyser from "../../../components/CodeAnalyser";

export default async function DashboardPage() {
  const { userId } = await auth();


  if (!userId) {
    return redirect("/sign-in");
  }
  
  
  const user = await currentUser();

  return (
    <main className="text-gray-100 px-6 py-10">
      <div className="mb-10 md:px-20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Welcome, {user?.firstName || "Developer"} 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Submit your code and let SmartLint AI do the heavy lifting.
        </p>
      </div>
      
      <CodeAnalyser />
    </main>
  );
}
