"use server";

import { UserSchema, UserType } from "@/lib/InfluencerSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const SIGNIN_CODE = "LITTO1010";

export const registerUser = async (newUser: UserType) => {
  const validateInput = UserSchema.safeParse(newUser);

  if (!validateInput.success) {
    const errorMessage = validateInput.error.issues
      .map((issue) => `${issue.path[0]}: ${issue.message}`)
      .join(". ");
    return { error: errorMessage };
  }

  try {
    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validateInput.data.email },
    });

    if (existingUser) {
      return {
        error: "A user with this email already exists",
      };
    }
    // Validate and update DB code
    if (SIGNIN_CODE !== validateInput.data.code) {
      return {
        error: "Invalid code",
      };
    }

    const hashedPassword = await bcrypt.hash(validateInput.data.password, 10);

    await prisma.user.create({
      data: {
        ...validateInput.data,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error details:", error);
    return { error: "An error occurred while adding the user." };
  }
};
