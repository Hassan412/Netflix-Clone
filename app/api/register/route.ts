import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, hashPassword } = body;
    if (!email) {
      return new NextResponse("Email is missing", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is missing", { status: 400 });
    }
    if (!hashPassword) {
      return new NextResponse("Password is missing", { status: 403 });
    }
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return new NextResponse("Email already taken", { status: 422 });
    }
    const hashpassword = await bcrypt.hash(hashPassword, 12);

    const user = await prismadb.user.create({
      data: {
        hashedPassword: hashpassword,
        email: email,
        name: name,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("Register error", error);
    return new NextResponse("Internel error", { status: 500 });
  }
}
