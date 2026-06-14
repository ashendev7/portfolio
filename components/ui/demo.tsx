'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <div className="w-full h-[500px] relative overflow-hidden flex flex-col md:flex-row">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Interactive 3D
        </h1>
        <p className="mt-4 text-neutral-400 max-w-lg text-base leading-relaxed">
          Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
          that capture attention and enhance your design.
        </p>
      </div>

      <div className="flex-1 relative min-h-[300px] md:min-h-full">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
        {/* Smooth bottom fade-out overlay to prevent harsh cutoff */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}
