"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";

const InfluencerSignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  code: z.string().min(1, "Code is required"),
});

type InfluencerSignInFormData = z.infer<typeof InfluencerSignInSchema>;

const InfluencerSignInPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  // Check if the user is authenticated and redirect if necessary
  useEffect(() => {
    if (session?.user.role !== "influencer") {
      router.push("/login");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InfluencerSignInFormData>({
    resolver: zodResolver(InfluencerSignInSchema),
  });

  const onSubmit = async (data: InfluencerSignInFormData) => {
    setError(null);

    const result = await signIn("influencer-credentials", {
      redirect: false,
      email: data.email,
      code: data.code,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      reset();
      toast.success("Welcome!");
      router.push("/dashboard"); // Redirect on successful sign-in
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-3xl font-semibold flex items-center gap-2">
        Influencer Login
      </h3>
      <p className="text-sm mb-8">* Must signup as an influencer first</p>
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
          <label className="block text-sm font-medium">Invitation Code</label>
          <input
            type="text"
            {...register("code")}
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.code && (
            <p className="text-sm text-red-400">{errors.code.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default InfluencerSignInPage;
