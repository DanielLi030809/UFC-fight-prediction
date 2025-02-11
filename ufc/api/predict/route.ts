import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the URL object from the request
  const { searchParams } = new URL(request.url);
  
  // Get fighter1 and fighter2 from query params
  const fighter1Name = searchParams.get("fighter1");
  const fighter2Name = searchParams.get("fighter2");

  // Validate input
  if (!fighter1Name || !fighter2Name) {
    return NextResponse.json(
      { error: "Both fighter names are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch both fighters in parallel
    const [fighter1, fighter2] = await Promise.all([
      prisma.input.findFirst({
        where: {
          name: {
            equals: fighter1Name,
            mode: 'insensitive' // Case insensitive search
          }
        }
      }),
      prisma.input.findFirst({
        where: {
          name: {
            equals: fighter2Name,
            mode: 'insensitive'
          }
        }
      })
    ]);

    // Check if both fighters were found
    if (!fighter1 || !fighter2) {
      return NextResponse.json(
        { error: "One or both fighters not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ fighter1, fighter2 });

  } catch (error) {
    console.error('Error fetching fighters:', error);
    return NextResponse.json(
      { error: "Failed to fetch fighters" },
      { status: 500 }
    );
  }
}