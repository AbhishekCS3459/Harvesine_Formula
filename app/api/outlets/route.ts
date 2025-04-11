import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"
import { calculateDistance } from "@/utils/harvestine"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // Get search parameters from URL
    const { searchParams } = new URL(request.url)

    // Parse and validate parameters
    const lat = Number.parseFloat(searchParams.get("lat") || "0")
    const lng = Number.parseFloat(searchParams.get("lng") || "0")
    const radius = Number.parseFloat(searchParams.get("radius") || "5")

    if (isNaN(lat) || isNaN(lng) || isNaN(radius)) {
      return NextResponse.json(
        { error: "Invalid parameters. Latitude, longitude, and radius must be valid numbers." },
        { status: 400 },
      )
    }

    // Fetch all outlets from the database
    const outlets = await prisma.outlet.findMany()

    // Calculate distance for each outlet and filter by radius
    const outletsWithDistance = outlets
      .map((outlet) => {
        const distance = calculateDistance(lat, lng, outlet.latitude, outlet.longitude)

        return {
          outletId: outlet.outletId,
          outletName: outlet.outletName,
          establishment: outlet.establishment,
          latitude: outlet.latitude,
          longitude: outlet.longitude,
          distance,
        }
      })
      .filter((outlet) => outlet.distance <= radius)
      .sort((a, b) => a.distance - b.distance)

    return NextResponse.json(outletsWithDistance)
  } catch (error) {
    console.error("Error fetching outlets:", error)
    return NextResponse.json({ error: "Failed to fetch outlets" }, { status: 500 })
  }
}
