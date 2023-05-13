"use client";

import { Input } from "@/components/Input";
import { api } from "@/libs/api";
import Link from "next/link";
import { Spinner } from "phosphor-react";
import React, { FormEvent, useState } from "react";

export default function Confirm() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password || !passwordConfirm) {
      setError("Preencha nova senha!");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Senhas não conferem!");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);
    const result = await api.redefinePassword(password, '123');
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Senha redefinida com sucesso!");
      setPassword('')
      setPasswordConfirm('')
    }
  }

  return (
    <>
      <p className="font-light text-sm mt-8">
        Olá #Usuário, digite sua nova senha!
      </p>
      <div className="w-full p-4 border rounded-lg mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Input
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Digite sua nova senha"
              disabled={loading}
              />
          </div>
          <div className="flex flex-col">
            <Input
              type="password"
              value={passwordConfirm}
              onChange={setPasswordConfirm}
              placeholder="Digite sua nova senha"
              disabled={loading}
            />
          </div>
          {error && (
            <div className="flex flex-col mt-4 w-full bg-red-700 p-2 rounded-md ">
              <span className="text-white text-center text-sm">{error}</span>
            </div>
          )}
          {success && (
            <div className="flex flex-col mt-4 w-full bg-green-700 p-2 rounded-md ">
              <span className="text-white text-center text-sm">{success}</span>
            </div>
          )}

          <div className="flex flex-col w-full items-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 flex items-center justify-center gap-2 hover:bg-blue-600 text-white w-full font-semibold px-4 py-2 rounded-lg mr-auto focus:outline-none"
            >
              {loading ? "Carregando..." : "Definir nova senha"}
              {loading && <Spinner size={24} className="animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
