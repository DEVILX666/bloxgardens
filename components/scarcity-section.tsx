"use client"

import Image from "next/image"

interface ScarcitySectionProps {
  onCtaClick: () => void
  playClickSound: () => void
}

export default function ScarcitySection({ onCtaClick, playClickSound }: ScarcitySectionProps) {
  return (
    <section className="py-16 bg-[var(--soft-beige)]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-500 relative overflow-hidden">
          {/* Urgent flashing border animation */}
          <div className="absolute inset-0 border-4 border-red-500 rounded-xl animate-pulse"></div>

          <div className="relative z-10">
            <div className="inline-block bg-red-500 text-white px-4 py-1 rounded-full font-bold mb-4 animate-bounce">
              🚨 URGENT: LIMITED SUPPLY 🚨
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-full md:w-1/2">
                <Image
                  src="https://aldi.today/photo/raccoon.jpg"
                  alt="Rare Raccoon Pet"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-lg border-4 border-[var(--sunshine-yellow)] shadow-lg animate-pulse"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">Only 17 Raccoons Left Today</h2>

                <div className="w-full bg-gray-200 h-6 rounded-full mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-6 rounded-full animate-pulse"
                    style={{ width: "23%" }}
                  ></div>
                </div>

                <div className="text-lg mb-4 text-gray-700">
                  <div className="font-bold text-red-600 mb-2">⚠️ HURRY BEFORE THEY'RE ALL GONE! ⚠️</div>
                  <p>These exclusive pets are in extremely high demand.</p>
                  <p className="text-sm text-gray-500 mt-2">Last restock was 3 weeks ago!</p>
                </div>
              </div>
            </div>

            <button className="cta-button-urgent" onClick={onCtaClick} onMouseEnter={playClickSound}>
              🔥 GET MY RACCOON NOW 🔥
            </button>

            <div className="mt-4 text-sm text-red-600 font-bold animate-pulse">
              ⏰ Offer resets in 3 hours, 27 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
