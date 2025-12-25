import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (token && token.value.length > 0) {
    redirect("/dashboard");
  }
  return <LoginForm />;
};

export default LoginPage;
