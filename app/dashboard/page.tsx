"use client";

import { useSession } from "next-auth/react";
import React from "react";

const InfluencerSignInPage = () => {
  const { data: session } = useSession();

  const firstName = session?.user.name?.split(" ")[0]; // Get the first name

  return (
    <div>
      <h3 className="text-3xl font-semibold capitalize">
        {firstName || session?.user.name}'s Dashboard
      </h3>
    </div>
  );
};

export default InfluencerSignInPage;
