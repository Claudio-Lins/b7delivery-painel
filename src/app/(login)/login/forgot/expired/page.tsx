"use client";

import { api } from "@/libs/api";
import Link from "next/link";
import { Spinner } from "phosphor-react";
import React, { FormEvent, useState } from "react";

export default function Expires() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (result.error) {
      setError(result.error);
      return;
    }
  }

  return (
    <>
      <div className="w-full p-4 border rounded-lg mt-8">
        
          <div className="flex flex-col mt-4 w-full bg-red-700 p-2 rounded-md ">
            <span className="text-white text-center text-xl">Este link expirou!</span>
          </div>
        <div className="flex flex-col">
          <Link
            href="/login/forgot"
            className="text-xs text-gray-500 hover:text-gray-700 text-center mt-2"
          >
            Esqueceu sua senha
          </Link>
        </div>
      </div>
    </>
  );
}
