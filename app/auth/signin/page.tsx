import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid place-items-center">
      <Tabs defaultValue="register" className="max-w-lg w-full">
        <TabsList className="w-full gap-5">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
