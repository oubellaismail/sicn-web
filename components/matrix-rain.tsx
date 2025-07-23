"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface MatrixRainProps {
  className?: string
}

export function MatrixRain({ className }: MatrixRainProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create matrix characters
    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const drops: { mesh: THREE.Mesh; speed: number; resetY: number }[] = []

    // Create font texture
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")!
    canvas.width = 64
    canvas.height = 64
    context.fillStyle = "#00F7EF"
    context.font = "48px monospace"
    context.textAlign = "center"
    context.textBaseline = "middle"

    for (let i = 0; i < 50; i++) {
      // Clear canvas
      context.clearRect(0, 0, 64, 64)

      // Draw random character
      const char = characters[Math.floor(Math.random() * characters.length)]
      context.fillText(char, 32, 32)

      // Create texture
      const texture = new THREE.CanvasTexture(canvas)

      // Create material
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: Math.random() * 0.8 + 0.2,
      })

      // Create geometry
      const geometry = new THREE.PlaneGeometry(0.5, 0.5)
      const mesh = new THREE.Mesh(geometry, material)

      // Position
      mesh.position.set((Math.random() - 0.5) * 20, Math.random() * 20 + 10, 0)

      drops.push({
        mesh,
        speed: Math.random() * 0.1 + 0.05,
        resetY: mesh.position.y + 20,
      })

      scene.add(mesh)
    }

    camera.position.z = 5

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Move drops down
      drops.forEach((drop) => {
        drop.mesh.position.y -= drop.speed

        // Reset when off screen
        if (drop.mesh.position.y < -15) {
          drop.mesh.position.y = drop.resetY
          drop.mesh.position.x = (Math.random() - 0.5) * 20

          // Change character occasionally
          if (Math.random() < 0.1) {
            const char = characters[Math.floor(Math.random() * characters.length)]
            const context = canvas.getContext("2d")!
            context.clearRect(0, 0, 64, 64)
            context.fillText(char, 32, 32)

            const newTexture = new THREE.CanvasTexture(canvas)
            drop.mesh.material.map = newTexture
            drop.mesh.material.needsUpdate = true
          }
        }

        // Fade effect
        const fadeStart = drop.resetY - 5
        const fadeEnd = drop.resetY - 15
        if (drop.mesh.position.y < fadeStart && drop.mesh.position.y > fadeEnd) {
          const fadeProgress = (fadeStart - drop.mesh.position.y) / (fadeStart - fadeEnd)
          drop.mesh.material.opacity = 1 - fadeProgress
        } else if (drop.mesh.position.y >= fadeStart) {
          drop.mesh.material.opacity = Math.random() * 0.8 + 0.2
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return

      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      const aspect = width / height
      const frustumSize = 20

      camera.left = (-frustumSize * aspect) / 2
      camera.right = (frustumSize * aspect) / 2
      camera.top = frustumSize / 2
      camera.bottom = -frustumSize / 2
      camera.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }

      // Dispose geometries and materials
      drops.forEach((drop) => {
        drop.mesh.geometry.dispose()
        if (Array.isArray(drop.mesh.material)) {
          drop.mesh.material.forEach((material) => {
            if (material.map) material.map.dispose()
            material.dispose()
          })
        } else {
          if (drop.mesh.material.map) drop.mesh.material.map.dispose()
          drop.mesh.material.dispose()
        }
      })
    }
  }, [])

  return <div ref={mountRef} className={className} />
}
