"use client"

import { useEffect, useRef } from "react"

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const steps = stepsRef.current?.querySelectorAll(".step")
          steps?.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add("active")
            }, index * 1000) // Very slow animation with 1 second delay between each step
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (stepsRef.current) {
      observer.observe(stepsRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--forest-green)]">How It Works</h2>

        <div ref={stepsRef} className="grid gap-8 md:grid-cols-3">
          <div className="step">
            <div className="step-number">1</div>
            <div className="w-full max-w-[300px] h-[150px] overflow-hidden rounded-lg border-3 border-[var(--sunshine-yellow)] mb-4">
              <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-[var(--forest-green)]">Enter Roblox Username</h3>
              <p>We'll verify your Grow a Garden account securely.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="w-full max-w-[300px] h-[150px] overflow-hidden rounded-lg border-3 border-[var(--sunshine-yellow)] mb-4">
              <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-[var(--forest-green)]">Choose Your Favorite Pet</h3>
              <p>Select from raccoons, dragonflies, foxes, and more.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="w-full max-w-[300px] h-[150px] overflow-hidden rounded-lg border-3 border-[var(--sunshine-yellow)] mb-4">
              <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-[var(--forest-green)]">Complete Simple Tasks</h3>
              <p>Finish quick offers to unlock your pets instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
