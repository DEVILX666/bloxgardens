"use client"

import { useState, useEffect, useRef } from "react"

const pets = [
  { id: 1, src: "https://aldi.today/photo/raccoon.jpg", alt: "Raccoon" },
  { id: 2, src: "https://aldi.today/photo/dragonfly.jpg", alt: "Dragonfly" },
  { id: 3, src: "https://aldi.today/photo/redfox.jpg", alt: "Red Fox" },
  { id: 4, src: "https://aldi.today/photo/theowl.jpg", alt: "The Owl" },
]

export default function PetCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(pets.length).fill(false))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Start the carousel rotation after a short delay
    const timer = setTimeout(() => {
      rotateCarousel()

      // Set up interval for automatic rotation
      intervalRef.current = setInterval(rotateCarousel, 3000)
    }, 500)

    return () => {
      clearTimeout(timer)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const rotateCarousel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pets.length)
  }

  const handleImageLoad = (index: number) => {
    const newLoaded = [...isLoaded]
    newLoaded[index] = true
    setIsLoaded(newLoaded)
  }

  const getItemClass = (index: number) => {
    if (index === currentIndex) return "active"
    if (index === (currentIndex - 1 + pets.length) % pets.length) return "prev"
    if (index === (currentIndex + 1) % pets.length) return "next"
    return ""
  }

  return (
    <div className="pet-carousel">
      {pets.map((pet, index) => (
        <img
          key={pet.id}
          src={pet.src || "/placeholder.svg"}
          alt={pet.alt}
          className={`pet-item ${getItemClass(index)} ${isLoaded[index] ? "loaded" : ""}`}
          onLoad={() => handleImageLoad(index)}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  )
}
