"use client";

import { useSession } from "next-auth/react";
import React from "react";

const InfluencerSignInPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h3 className="text-3xl font-semibold">Welcome, {session?.user.name}</h3>
    </div>
  );
};

export default InfluencerSignInPage;
