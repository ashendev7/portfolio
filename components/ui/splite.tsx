'use client'

import { Suspense, lazy, useRef, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  inView?: boolean
}

export function SplineScene({ scene, className, inView = true }: SplineSceneProps) {
  const splineAppRef = useRef<any>(null)

  const handleLoad = (splineApp: any) => {
    splineAppRef.current = splineApp
    if (!inView && splineApp && typeof splineApp.stop === 'function') {
      try {
        splineApp.stop()
      } catch (e) {
        console.error('Error stopping spline on load:', e)
      }
    }
  }

  useEffect(() => {
    const splineApp = splineAppRef.current
    if (!splineApp || typeof splineApp.play !== 'function' || typeof splineApp.stop !== 'function') return

    try {
      if (inView) {
        splineApp.play()
      } else {
        splineApp.stop()
      }
    } catch (e) {
      console.error('Error toggling spline animation:', e)
    }
  }, [inView])

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader text-muted-foreground animate-spin"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={handleLoad}
      />
    </Suspense>
  )
}
