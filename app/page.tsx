import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {session?.user && (
        <div className="flex items-center flex-col gap-2">
          <h1 className="font-bold">
            Welcome {session && session.user?.email}
          </h1>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      )}
    </main>
  );
}
