"use client";

import { api } from "@/libs/api";
import Link from "next/link";
import { Spinner } from "phosphor-react";
import React, { FormEvent, useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setError("Preencha e-mail!");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    const result = await api.forgotPassword(email);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Email enviado para recuperação de senha!");
    }
  }

  return (
    <>
      <p className="font-light text-sm mt-8">Deseja recuperar sua senha?</p>
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
              {loading ? "Carregando..." : "Recuperar senha"}
              {loading && <Spinner size={24} className="animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
