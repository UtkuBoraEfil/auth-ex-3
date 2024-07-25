import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { signIn } from "@/auth";

export function LoginForm() {
  async function loginUser(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      console.error("ERROR_WHILE_LOGIN", error);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login a new account to access all the features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={loginUser}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              defaultValue="ardakaanaydilek@gmail.com"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              defaultValue="Ardakaan057"
            />
          </div>
          <Button className="mt-4">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}
