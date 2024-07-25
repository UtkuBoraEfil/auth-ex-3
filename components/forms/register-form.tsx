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
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";

export function RegisterForm() {
  async function registerUser(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      if (!user) throw new Error("User not created");

      console.log("USER_CREATED", user);

      return { message: "User created successfully" };
    } catch (error) {
      console.error("ERROR_WHILE_REGISTERING", error);

      return { error: "Error while registering" };
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register a new account to access all the features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={registerUser}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              defaultValue="ardakaanaydilek@gmail.com"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Username</Label>
            <Input
              type="password"
              id="password"
              name="password"
              defaultValue="Ardakaan057"
            />
          </div>
          <Button type="submit" className="mt-4">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
