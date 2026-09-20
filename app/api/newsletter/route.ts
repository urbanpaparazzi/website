import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address" },
      { status: 400 },
    );
  }

  try {
    const existing = await writeClient.fetch(
      `*[_type == "newsletterSubscription" && email == $email][0]{ _id }`,
      { email },
    );

    if (existing?._id) {
      return NextResponse.json({ message: "You're already subscribed!" });
    }

    await writeClient.create({
      _type: "newsletterSubscription",
      email,
      subscribedAt: new Date().toISOString(),
      status: "active",
    });

    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Newsletter subscribe failed", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
