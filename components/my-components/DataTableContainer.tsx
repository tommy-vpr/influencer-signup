import React from "react";
import DataTable from "@/components/my-components/DataTable";
import prisma from "@/lib/prisma";
import { GeneratedCode } from "@/components/my-components/DataTable"; // Adjust the path based on where `types.ts` is located

export default async function DataTableContainer() {
  const data: GeneratedCode[] = await prisma.generatedCodes.findMany();
  return <DataTable data={data} />;
}
