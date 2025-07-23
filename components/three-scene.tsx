"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface ThreeSceneProps {
  className?: string
}

export function ThreeScene({ className }: ThreeSceneProps) {
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

      // Create floating cyber cubes
      const cubes: THREE.Mesh[] = []
      const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

      for (let i = 0; i < 15; i++) {
        const cubeMaterial = new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? 0x00f7ef : i % 3 === 1 ? 0x7c3aed : 0x06b6d4,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        })

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

        cubes.push(cube)
        scene.add(cube)
      }

      // Create connecting lines between cubes
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00f7ef,
        transparent: true,
        opacity: 0.3,
      })

      const connections: THREE.Line[] = []
      for (let i = 0; i < cubes.length; i++) {
        for (let j = i + 1; j < cubes.length; j++) {
          const distance = cubes[i].position.distanceTo(cubes[j].position)
          if (distance < 4) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([cubes[i].position, cubes[j].position])
            const line = new THREE.Line(lineGeometry, lineMaterial)
            connections.push(line)
            scene.add(line)
          }
        }
      }

      // Create floating particles
      const particleGeometry = new THREE.BufferGeometry()
      const particleCount = 100
      const positions = new Float32Array(particleCount * 3)

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x00f7ef,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
      })

      const particles = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(particles)

      camera.position.z = 8

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)

        // Rotate cubes
        cubes.forEach((cube, index) => {
          cube.rotation.x += 0.01 + index * 0.001
          cube.rotation.y += 0.01 + index * 0.001
          cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
        })

        // Update connections
        connections.forEach((line, index) => {
          const cubeA = cubes[Math.floor(index / (cubes.length - 1))]
          const cubeB = cubes[(index % (cubes.length - 1)) + Math.floor(index / (cubes.length - 1)) + 1]
          if (cubeA && cubeB) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([cubeA.position, cubeB.position])
            line.geometry.dispose()
            line.geometry = lineGeometry
          }
        })

        // Rotate particles
        particles.rotation.y += 0.002

        // Camera movement
        camera.position.x = Math.sin(Date.now() * 0.0005) * 2
        camera.position.y = Math.cos(Date.now() * 0.0003) * 1
        camera.lookAt(0, 0, 0)

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
        cubes.forEach((cube) => {
          cube.geometry.dispose()
          if (Array.isArray(cube.material)) {
            cube.material.forEach((material) => material.dispose())
          } else {
            cube.material.dispose()
          }
        })

        connections.forEach((line) => {
          line.geometry.dispose()
          if (Array.isArray(line.material)) {
            line.material.forEach((material) => material.dispose())
          } else {
            line.material.dispose()
          }
        })

        particleGeometry.dispose()
        particleMaterial.dispose()
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
