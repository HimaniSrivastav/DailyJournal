"use client";
import { useState } from "react";
import { apiPost } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await apiPost("/user/login", { email, password });
    console.log("Login result:", result);
  }}