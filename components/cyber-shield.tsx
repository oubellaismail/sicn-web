"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface CyberShieldProps {
  className?: string
}

export function CyberShield({ className }: CyberShieldProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationIdRef = useRef<number>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mountRef.current) return

    // Small delay to ensure DOM is fully ready
    const initTimeout = setTimeout(() => {
      if (!mountRef.current) return

      // Scene setup
      const scene = new THREE.Scene()
      sceneRef.current = scene

      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000,
      )

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      renderer.setClearColor(0x000000, 0)
      rendererRef.current = renderer

      mountRef.current.appendChild(renderer.domElement)

      // Create shield geometry
      const shieldGeometry = new THREE.ConeGeometry(1.5, 2, 6)
      const shieldMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f7ef,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      })

      const shield = new THREE.Mesh(shieldGeometry, shieldMaterial)
      shield.rotation.x = Math.PI
      scene.add(shield)

      // Create inner shield
      const innerShieldGeometry = new THREE.ConeGeometry(1.2, 1.6, 6)
      const innerShieldMaterial = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })

      const innerShield = new THREE.Mesh(innerShieldGeometry, innerShieldMaterial)
      innerShield.rotation.x = Math.PI
      scene.add(innerShield)

      // Create orbiting rings
      const rings: THREE.Mesh[] = []
      for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.05, 8, 32)
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x00f7ef : i === 1 ? 0x7c3aed : 0x06b6d4,
          transparent: true,
          opacity: 0.7,
        })

        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 6
        rings.push(ring)
        scene.add(ring)
      }

      // Create floating data points
      const dataPoints: THREE.Mesh[] = []
      const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8)

      for (let i = 0; i < 20; i++) {
        const pointMaterial = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00f7ef : 0x7c3aed,
          transparent: true,
          opacity: 0.8,
        })

        const point = new THREE.Mesh(pointGeometry, pointMaterial)
        const radius = 3 + Math.random() * 2
        const angle = (i / 20) * Math.PI * 2

        point.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 4, Math.sin(angle) * radius)

        dataPoints.push(point)
        scene.add(point)
      }

      camera.position.z = 6

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)

        const time = Date.now() * 0.001

        // Rotate shields
        shield.rotation.y += 0.01
        innerShield.rotation.y -= 0.015

        // Animate rings
        rings.forEach((ring, index) => {
          ring.rotation.z += 0.02 + index * 0.005
          ring.position.y = Math.sin(time + index) * 0.2
        })

        // Animate data points
        dataPoints.forEach((point, index) => {
          const radius = 3 + Math.sin(time + index) * 0.5
          const angle = (index / 20) * Math.PI * 2 + time * 0.5

          point.position.x = Math.cos(angle) * radius
          point.position.z = Math.sin(angle) * radius
          point.position.y += Math.sin(time * 2 + index) * 0.01
        })

        // Pulse effect
        const pulse = 1 + Math.sin(time * 3) * 0.1
        shield.scale.setScalar(pulse)
        innerShield.scale.setScalar(pulse * 0.9)

        renderer.render(scene, camera)
      }

      // Start animation immediately
      animate()

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !rendererRef.current) return

        const width = mountRef.current.clientWidth
        const height = mountRef.current.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        rendererRef.current.setSize(width, height)
      }

      window.addEventListener("resize", handleResize)

      // Cleanup
      return () => {
        clearTimeout(initTimeout)
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
        shieldGeometry.dispose()
        shieldMaterial.dispose()
        innerShieldGeometry.dispose()
        innerShieldMaterial.dispose()

        rings.forEach((ring) => {
          ring.geometry.dispose()
          if (Array.isArray(ring.material)) {
            ring.material.forEach((material) => material.dispose())
          } else {
            ring.material.dispose()
          }
        })

        dataPoints.forEach((point) => {
          point.geometry.dispose()
          if (Array.isArray(point.material)) {
            point.material.forEach((material) => material.dispose())
          } else {
            point.material.dispose()
          }
        })

        pointGeometry.dispose()
      }
    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(initTimeout)
    }
  }, [isClient])

  if (!isClient) {
    return <div className={className} />
  }

  return <div ref={mountRef} className={className} />
}
