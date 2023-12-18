import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;