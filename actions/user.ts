"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET current user
export const getUser = async () => {
  const session = await auth();

  if (!session?.user?.email) return null;

  return await prisma.user.findUnique({
    where: { email: session.user.email },
    omit: { password: true },
  });
};
