"use client"

import { Check, X } from "lucide-react"

interface ComparisonSectionProps {
  onCtaClick: () => void
  playClickSound: () => void
}

export default function ComparisonSection({ onCtaClick, playClickSound }: ComparisonSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[var(--forest-green)]/10 rounded-xl p-6 border-2 border-[var(--forest-green)] relative">
            <div className="absolute top-0 right-0 bg-[var(--forest-green)] text-white px-3 py-1 rounded-bl-lg font-bold">
              THE RIGHT ONE
            </div>
            <h3 className="text-xl font-bold mb-6 text-[var(--forest-green)]">Onmod</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="text-[var(--forest-green)] mt-1 shrink-0" />
                <span>We will Actually give you Raccoons 4 Free</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[var(--forest-green)] mt-1 shrink-0" />
                <span>FREE (just do a dumb tasks)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[var(--forest-green)] mt-1 shrink-0" />
                <span>Safe & Stupid Easy Tasks To do</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[var(--forest-green)] mt-1 shrink-0" />
                <span>Fast delivery. No "waiting 24 hours" nonsense</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[var(--forest-green)] mt-1 shrink-0" />
                <span>100% Legit. Trusted by Lot of players.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-[var(--forest-green)] mt-1 shrink-0" />
                <span>24/7 Support BABY</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-500">Other Websites</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <X className="text-red-500 mt-1 shrink-0" />
                <span>They Don't give you sh*t</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="text-red-500 mt-1 shrink-0" />
                <span>They are nerds and charge you up money 4 it</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="text-red-500 mt-1 shrink-0" />
                <span>Support slower than a noob in Adopt Me</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="text-red-500 mt-1 shrink-0" />
                <span>Too many scammers out there</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="text-red-500 mt-1 shrink-0" />
                <span>Don't Make Mogged Indians Sell you Raccoons</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-[var(--forest-green)]">🚀 SMASH THIS BUTTON FOR LOOT!</h3>
          <button className="cta-button-rainbow" onClick={onCtaClick} onMouseEnter={playClickSound}>
            Let's Get It
          </button>
        </div>
      </div>
    </section>
  )
}
