"use client";
import { RegisterRequestDTO } from "@/Data/DTOs/auth.dto";
import { registerUseCase } from "@/Services/auth/auth.services";
import { translateErrorMessage } from "@/utils/error_translate";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterPage() {
  const [form, setForm] = useState<RegisterRequestDTO>({ username: "", password: "",email:"",name: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const user = await registerUseCase.execute(form);
      console.log("Logged in as", user);
      if(user) router.push("/login")
      // simpan ke context atau localstorage dsb.
    } catch (err) {
      setError((err as Error).message);
      translateErrorMessage(err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
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
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
