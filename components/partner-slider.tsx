"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const partners = [
  { name: "CyberTech Solutions", logo: "🔐", description: "Leading cybersecurity firm" },
  { name: "SecureNet Corp", logo: "🛡️", description: "Network security specialists" },
  { name: "DataGuard Inc", logo: "🔒", description: "Data protection experts" },
  { name: "ThreatHunter Pro", logo: "🎯", description: "Threat intelligence platform" },
  { name: "CryptoShield", logo: "🔑", description: "Encryption technology leaders" },
  { name: "SafeCloud Systems", logo: "☁️", description: "Cloud security solutions" },
  { name: "DigitalFortress", logo: "🏰", description: "Enterprise security platform" },
  { name: "CyberWatch", logo: "👁️", description: "24/7 security monitoring" },
]

export function PartnerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(partners.length / 4))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getVisiblePartners = () => {
    const startIndex = currentIndex * 4
    return partners.slice(startIndex, startIndex + 4)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ease-in-out">
        {getVisiblePartners().map((partner, index) => (
          <Card key={`${currentIndex}-${index}`} className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">{partner.logo}</div>
              <h3 className="font-semibold text-white mb-2">{partner.name}</h3>
              <p className="text-slate-400 text-sm">{partner.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(partners.length / 4) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-cyan-400" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
