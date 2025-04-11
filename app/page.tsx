"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Store, Navigation } from "lucide-react"

type Outlet = {
  outletId: number
  outletName: string
  establishment: string
  latitude: number
  longitude: number
  distance: number
}

export default function Home() {
  const [latitude, setLatitude] = useState<string>("28.6139")
  const [longitude, setLongitude] = useState<string>("77.2090")
  const [radius, setRadius] = useState<string>("5")
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/outlets?lat=${latitude}&lng=${longitude}&radius=${radius}`)

      if (!response.ok) {
        throw new Error("Failed to fetch outlets")
      }

      const data = await response.json()
      setOutlets(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setOutlets([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Nearby Outlets</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="latitude" className="text-sm font-medium">
                  Latitude
                </label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="longitude" className="text-sm font-medium">
                  Longitude
                </label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Enter longitude"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="radius" className="text-sm font-medium">
                  Radius (km)
                </label>
                <Select value={radius} onValueChange={setRadius}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search Outlets"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {outlets.length > 0
          ? outlets.map((outlet) => (
              <Card key={outlet.outletId} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{outlet.outletName}</h3>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Store className="h-4 w-4 mr-1" />
                        <span>{outlet.establishment}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 px-2 py-1 rounded-md flex items-center">
                      <Navigation className="h-4 w-4 mr-1" />
                      <span className="font-medium">{outlet.distance.toFixed(2)} km</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {outlet.latitude.toFixed(6)}, {outlet.longitude.toFixed(6)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          : !isLoading &&
            !error && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No outlets found within the specified radius. Try increasing the radius or changing your location.
              </div>
            )}
      </div>
    </main>
  )
}
