'use client'

import { useAppDispatch, useAppSelector } from "@/lib/store/store"
import { setDarkMode, startLoading, stopLoading } from "@/lib/store/slices/uiSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReduxTest() {
  const dispatch = useAppDispatch()
  const { isLoading, darkMode } = useAppSelector((state) => state.ui)

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Redux Test</CardTitle>
        <CardDescription>Testing Redux integration in Next.js</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Loading State:</p>
          <p className="text-lg font-bold">{isLoading ? "Loading..." : "Idle"}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Dark Mode:</p>
          <p className="text-lg font-bold">{darkMode ? "Enabled" : "Disabled"}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={() => dispatch(startLoading())}
            variant="default"
          >
            Start Loading
          </Button>
          
          <Button 
            onClick={() => dispatch(stopLoading())}
            variant="secondary"
          >
            Stop Loading
          </Button>
          
          <Button 
            onClick={() => dispatch(setDarkMode())}
            variant="outline"
          >
            Toggle Dark Mode
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
