"use client";

import AdminLoginForm from "@/components/my-components/AdminLoginForm";
import InfluencerLoginForm from "@/components/my-components/InfluencerLoginForm";
import { Home } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-[400px]">
        {isAdminLogin ? <AdminLoginForm /> : <InfluencerLoginForm />}

        <div className="text-sm mt-4 flex gap-2">
          <p>
            <Link
              href={"/"}
              className="flex items-center gap-1 underline underline-offset-4"
            >
              Home
            </Link>
          </p>
          <span className="text-gray-500"> | </span>
          <p
            className={`underline underline-offset-4 cursor-pointer`}
            onClick={() => setIsAdminLogin(true)}
          >
            Admin login
          </p>
          <span className="text-gray-500"> | </span>
          <p
            className={`underline underline-offset-4 cursor-pointer`}
            onClick={() => setIsAdminLogin(false)}
          >
            Influencer login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
