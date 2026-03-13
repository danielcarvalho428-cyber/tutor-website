"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const supabase = createClient();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: "student",
            },
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        setMessage("Conta criada com sucesso.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        setMessage("Login feito com sucesso.");
      }
    } catch {
      setError("Algo deu errado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10">
      <div className="mb-8 flex rounded-full bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "login"
              ? "bg-slate-950 text-white"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === "signup"
              ? "bg-slate-950 text-white"
              : "text-slate-600 hover:text-slate-950"
          }`}
        >
          Criar conta
        </button>
      </div>

      <h2 className="text-2xl font-bold text-slate-950">
        {mode === "login" ? "Entrar" : "Criar conta"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        {mode === "signup" ? (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-yellow-500"
              placeholder="Seu nome"
            />
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-yellow-500"
            placeholder="voce@email.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-yellow-500"
            placeholder="••••••••"
            required
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>
    </div>
  );
}