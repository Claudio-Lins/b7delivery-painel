"use client";

import { api } from "@/libs/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "phosphor-react";
import React, { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
      return;
    }
    setError("");
    setLoading(true);
    const result = await api.login(email, password);
    setLoading(false);
    router.push('/')
    if (result.error) {
      setError(result.error);
      return;
    }
  }

  return (
    <>
      <p className="font-light text-sm mt-8">
        Digite seus dados para entrar no painel administrativo do
        estabelecimento e gerenciar produtos/pedidos.
      </p>
      <div className="w-full p-4 border rounded-lg mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              disabled={loading}
              className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="flex flex-col mt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={loading}
              className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
            />
          </div>
          {error && (
            <div className="flex flex-col mt-4 w-full bg-red-700 p-2 rounded-md ">
              <span className="text-white text-center text-sm">{error}</span>
            </div>
          )}
          <div className="flex flex-col w-full items-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 flex items-center justify-center gap-2 hover:bg-blue-600 text-white w-full font-semibold px-4 py-2 rounded-lg mr-auto focus:outline-none"
            >
              {loading ? "Carregando..." : "Entrar"}
              {loading && <Spinner size={24} className="animate-spin" />}
            </button>
            <Link
              href="/login/forgot"
              className="text-xs text-gray-500 hover:text-gray-700 text-center mt-2"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
