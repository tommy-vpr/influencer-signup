"use client";

import React, { useEffect, useRef, useState } from "react";
import { registerInfluencer } from "@/app/actions/influencer";
import SubmitButton from "./SubmitButton";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { InfluencerSchema } from "@/lib/InfluencerSchema";
import Image from "next/image";

import stripes from "@/assets/images/stripes.png";

const InfluencerRegisterForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: session } = useSession();
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Convert formData to an object
      const data = Object.fromEntries(formData.entries());

      // Prepare influencer data and validate it
      const newInfluencer = {
        email: data.email as string,
        state: data.state as string,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        password: data.password as string,
        code: data.code as string,
      };

      // Validate the input data with Zod schema
      const validateInput = InfluencerSchema.safeParse(newInfluencer);

      if (!validateInput.success) {
        // Map errors to fields
        const fieldErrors = validateInput.error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {} as { [key: string]: string });

        setErrors(fieldErrors);
        return;
      }

      const response = await registerInfluencer(validateInput.data);

      ref.current?.reset();

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      // Automatically sign in the user after successful registration
      const signInResponse = await signIn("influencer-credentials", {
        redirect: false,
        email: validateInput.data.email,
        code: validateInput.data.code,
      });

      if (signInResponse?.error) {
        toast.error("Sign-in failed. Please try logging in.");
      } else {
        toast.success("Welcome! Litto Influencer");
        router.push("/dashboard"); // Redirect to dashboard
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[500px] p-8 space-y-6 rounded-lg">
      <Image
        src={stripes}
        height={180}
        alt="litto secondary"
        className="absolute top-6 right-6 invert"
      />
      <h1 className="text-2xl font-bold text-center uppercase">
        Influencer Signup
      </h1>
      <form action={clientAction} className="space-y-4" ref={ref}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">First name</label>
          <input
            type="text"
            name="firstName"
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.firstName && (
            <p className="text-sm text-red-400">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Last name</label>
          <input
            type="text"
            name="lastName"
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.lastName && (
            <p className="text-sm text-red-400">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.state && (
            <p className="text-sm text-red-400">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Invitation Code</label>
          <input
            type="text"
            name="code"
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md"
          />
          {errors.code && <p className="text-sm text-red-400">{errors.code}</p>}
        </div>

        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      <div className="text-sm">
        Have an account?{" "}
        <Link href="/login" className="underline underline-offset-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default InfluencerRegisterForm;
