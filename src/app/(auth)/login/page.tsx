"use client";
import { Button } from "@/components/ui/button";
import { LoginRequestDTO } from "@/Data/DTOs/auth.dto";
import { loginUseCase } from "@/Services/auth/auth.services";
import { translateErrorMessage } from "@/utils/error_translate";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginPage() {
  const [form, setForm] = useState<LoginRequestDTO>({ username: "", password: "", client: "web"});
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await loginUseCase.execute(form);
      if(user) router.replace("/dashboard")
      // simpan ke context atau localstorage dsb.
    } catch (err) {
      setError((err as Error).message);
      translateErrorMessage(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button onClick={handleLogin}>Login</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
