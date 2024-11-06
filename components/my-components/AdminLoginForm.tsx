// src/app/auth/signin/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/my-components/SubmitButton";
import { Lock } from "lucide-react";

const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof SignInSchema>;

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); // Redirect on successful sign-in
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-3xl font-semibold flex items-center gap-2">
        <Lock />
        Admin Login
      </h3>
      <p className="text-sm mb-8">* For admin use only </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default SignInPage;
