// src/app/components/DataTableContainer.tsx
import React from "react";
import DataTable from "@/components/my-components/DataTable";
import prisma from "@/lib/prisma";

export default async function DataTableContainer() {
  // Fetch data from the Prisma `GeneratedCode` model
  const data = await prisma.generatedCodes.findMany();

  return <DataTable data={data} />;
}
