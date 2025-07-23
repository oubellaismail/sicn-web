"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const partners = [
  {
    name: "CyberDefense Corp",
    logo: "/placeholder.svg?height=80&width=120&text=CyberDefense",
    category: "Security Solutions",
    description: "Leading provider of enterprise cybersecurity solutions and threat intelligence.",
  },
  {
    name: "SecureNet Systems",
    logo: "/placeholder.svg?height=80&width=120&text=SecureNet",
    category: "Network Security",
    description: "Specialized in network security infrastructure and monitoring systems.",
  },
  {
    name: "DataShield Technologies",
    logo: "/placeholder.svg?height=80&width=120&text=DataShield",
    category: "Data Protection",
    description: "Advanced data encryption and protection solutions for modern enterprises.",
  },
  {
    name: "ThreatHunter Labs",
    logo: "/placeholder.svg?height=80&width=120&text=ThreatHunter",
    category: "Threat Detection",
    description: "AI-powered threat detection and incident response platform.",
  },
  {
    name: "CryptoGuard Inc",
    logo: "/placeholder.svg?height=80&width=120&text=CryptoGuard",
    category: "Cryptography",
    description: "Cutting-edge cryptographic solutions and blockchain security services.",
  },
  {
    name: "SecureCloud Partners",
    logo: "/placeholder.svg?height=80&width=120&text=SecureCloud",
    category: "Cloud Security",
    description: "Cloud security architecture and compliance management solutions.",
  },
  {
    name: "DigitalFortress",
    logo: "/placeholder.svg?height=80&width=120&text=DigitalFortress",
    category: "Penetration Testing",
    description: "Professional penetration testing and vulnerability assessment services.",
  },
  {
    name: "CyberEducate Pro",
    logo: "/placeholder.svg?height=80&width=120&text=CyberEducate",
    category: "Training & Certification",
    description: "Comprehensive cybersecurity training and professional certification programs.",
  },
]

export function PartnerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const itemsPerView = 5
  const maxIndex = Math.max(0, partners.length - itemsPerView)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  return (
    <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 backdrop-blur-sm"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 backdrop-blur-sm"
        onClick={goToNext}
        disabled={currentIndex === maxIndex}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Partners Container */}
      <div className="overflow-hidden mx-12">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {partners.map((partner, index) => (
            <div key={index} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 h-full backdrop-blur-sm hover:bg-slate-700/50 transition-colors">
                <div className="flex flex-col items-center text-center space-y-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    className="w-20 h-12 object-contain opacity-80"
                  />
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{partner.name}</h3>
                    <p className="text-xs text-cyan-400 mb-2">{partner.category}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{partner.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-cyan-400" : "bg-slate-600"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 bg-slate-800 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
