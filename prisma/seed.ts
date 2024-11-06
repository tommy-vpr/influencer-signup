import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define a type for the coupon object
interface CouponData {
  code: string;
  status: boolean;
}

// Function to generate random alphanumeric coupon code
function generateCouponCode(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}

// Function to generate and insert multiple coupons
async function generateAndInsertCoupons(
  numberOfCoupons: number,
  codeLength: number
): Promise<void> {
  const coupons: CouponData[] = [];

  // Generate coupon codes
  for (let i = 0; i < numberOfCoupons; i++) {
    const couponCode = generateCouponCode(codeLength);
    coupons.push({ code: couponCode, status: false });
  }

  // Insert the coupons into MongoDB using Prisma
  try {
    await prisma.generatedCodes.createMany({
      data: coupons,
    });
    console.log(`${numberOfCoupons} coupons inserted successfully!`);
  } catch (error) {
    console.error("Error inserting coupons:", error);
  } finally {
    // Close Prisma connection
    await prisma.$disconnect();
  }

  // Generate a PDF with the coupon codes
  generatePDF(coupons);
}

// Function to generate a PDF containing the coupon codes
function generatePDF(coupons: CouponData[]): void {
  const doc = new PDFDocument();

  // Pipe the PDF to a writable stream (saving to file)
  doc.pipe(fs.createWriteStream("coupons.pdf"));

  // Add some content to the PDF
  doc.fontSize(20).text("Generated Coupon Codes", { align: "center" });
  doc.moveDown();

  // Add each coupon to the PDF
  coupons.forEach((coupon, index) => {
    doc.fontSize(14).text(`${index + 1}. ${coupon.code}`, {
      align: "left",
    });
  });

  // Finalize the PDF and end the stream
  doc.end();

  console.log("PDF generated successfully!");
}

// Execute the function to generate and insert coupons
generateAndInsertCoupons(50, 8);

// // prisma/seed.ts
// import { PrismaClient } from '@prisma/client';
// import { v4 as uuidv4 } from 'uuid';

// const prisma = new PrismaClient();

// async function seed() {
//   const codesArray = [];

//   // Generate 100 unique UUID codes
//   for (let i = 0; i < 100; i++) {
//     const newCode = uuidv4(); // Generate a UUID
//     codesArray.push({
//       code: newCode,
//       status: false, // All codes are initially unused
//     });
//   }

//   try {
//     // Insert all 100 codes into the database
//     for (const codeData of codesArray) {
//       // Check if the UUID code already exists in the database
//       const existingCode = await prisma.code.findFirst({
//         where: { code: codeData.code },
//       });

//       // If the code doesn't exist, insert it
//       if (!existingCode) {
//         await prisma.code.create({
//           data: codeData,
//         });
//       }
//     }

//     console.log('Seeding completed: 100 unique UUID codes created!');
//   } catch (error) {
//     console.error('Error seeding the database:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Run the seed function
// seed();
