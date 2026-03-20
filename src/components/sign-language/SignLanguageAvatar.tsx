"use client"

import React, { useEffect, useRef, useState } from 'react'

interface SignLanguageAvatarProps {
  text?: string
  onAnimationComplete?: () => void
}

export function SignLanguageAvatar({ text, onAnimationComplete }: SignLanguageAvatarProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<any>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return

    let mounted = true

    const loadAvatar = async () => {
      try {
        // Dynamic imports
        const THREE = await import('three')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        const { defaultPose } = await import('./animations/defaultPose')
        const words = await import('./animations/words')
        const alphabets = await import('./animations/alphabets')

        if (!mounted || !canvasRef.current) return

        const ref = componentRef.current
        
        // Clear any existing scene
        if (ref.scene) ref.scene.clear()
        if (ref.renderer) ref.renderer.dispose()
        
        ref.flag = false
        ref.pending = false
        ref.animations = []
        ref.characters = []

        // Create scene
        ref.scene = new THREE.Scene()
        ref.scene.background = new THREE.Color(0x1a1a2e)

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        ref.scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9)
        directionalLight.position.set(0, 5, 5)
        ref.scene.add(directionalLight)

        // Create renderer
        ref.renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true
        })
        ref.renderer.setSize(350, 350)
        ref.renderer.setClearColor(0x000000, 0)

        // Create camera
        ref.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000)
        ref.camera.position.set(0, 1.4, 1.8)

        // Clear and append canvas
        if (canvasRef.current) {
          canvasRef.current.innerHTML = ''
          canvasRef.current.appendChild(ref.renderer.domElement)
        }

        // Load avatar model
        const loader = new GLTFLoader()
        
        loader.load(
          '/models/xbot.glb',
          (gltf: any) => {
            if (!mounted) return
            
            ref.avatar = gltf.scene
            
            ref.avatar.traverse((child: any) => {
              if (child.type === 'SkinnedMesh') {
                child.frustumCulled = false
              }
            })
            
            ref.avatar.scale.set(1, 1, 1)
            ref.avatar.position.set(0, 0, 0)
            ref.scene.add(ref.avatar)
            
            defaultPose(ref)
            setIsLoaded(true)
            ref.renderer.render(ref.scene, ref.camera)
          },
          undefined,
          (error: any) => {
            console.error('Error loading avatar:', error)
            setError('Failed to load 3D avatar model')
          }
        )

        // Animation function
        ref.animate = () => {
          if (!mounted) return
          
          if (ref.animations.length === 0) {
            ref.pending = false
            setIsAnimating(false)
            setCurrentText('')
            onAnimationComplete?.()
            return
          }

          requestAnimationFrame(ref.animate)
          
          if (ref.animations[0].length) {
            if (!ref.flag) {
              for (let i = 0; i < ref.animations[0].length;) {
                const [boneName, action, axis, limit, sign] = ref.animations[0][i]
                
                try {
                  const bone = ref.avatar.getObjectByName(boneName)
                  if (!bone) {
                    ref.animations[0].splice(i, 1)
                    continue
                  }

                  if (sign === '+' && bone[action][axis] < limit) {
                    bone[action][axis] += 0.18
                    bone[action][axis] = Math.min(bone[action][axis], limit)
                    i++
                  } else if (sign === '-' && bone[action][axis] > limit) {
                    bone[action][axis] -= 0.18
                    bone[action][axis] = Math.max(bone[action][axis], limit)
                    i++
                  } else {
                    ref.animations[0].splice(i, 1)
                  }
                } catch (error) {
                  ref.animations[0].splice(i, 1)
                }
              }
            }
          } else {
            ref.flag = true
            setTimeout(() => {
              ref.flag = false
            }, 450)
            ref.animations.shift()
          }
          
          ref.renderer.render(ref.scene, ref.camera)
        }

        // Store modules for text processing
        ref.words = words
        ref.alphabets = alphabets

      } catch (error) {
        console.error('Failed to initialize avatar:', error)
        setError('Failed to initialize sign language avatar')
      }
    }

    loadAvatar()

    return () => {
      mounted = false
      const ref = componentRef.current
      if (ref.avatar) {
        ref.scene?.remove(ref.avatar)
        ref.avatar = null
      }
      if (ref.scene) {
        ref.scene.clear()
        ref.scene = null
      }
      if (ref.renderer) {
        ref.renderer.dispose()
        ref.renderer = null
      }
      if (canvasRef.current) {
        canvasRef.current.innerHTML = ''
      }
    }
  }, [])

  // Handle text changes for sign language animation
  useEffect(() => {
    if (!text || !isLoaded || !componentRef.current.avatar) return

    const ref = componentRef.current
    const processedText = text.toUpperCase().replace(/[^\w\s]/g, '').substring(0, 50) // Limit to 50 chars
    const textWords = processedText.split(' ').filter(word => word.length > 0)

    if (textWords.length === 0) return

    setIsAnimating(true)
    setCurrentText(processedText)
    
    ref.animations = []
    
    for (const word of textWords) {
      try {
        const wordAnimation = ref.words?.[word]
        if (wordAnimation && typeof wordAnimation === 'function') {
          wordAnimation(ref)
          ref.animations.push([])
        } else {
          // Spell out word letter by letter
          for (const char of word) {
            const charAnimation = ref.alphabets?.[char]
            if (charAnimation && typeof charAnimation === 'function') {
              charAnimation(ref)
              ref.animations.push([])
            }
          }
          ref.animations.push([])
        }
      } catch (error) {
        console.error(`Error processing word "${word}":`, error)
      }
    }

    if (!ref.pending && ref.animations.length > 0) {
      ref.pending = true
      ref.animate()
    }
  }, [text, isLoaded, onAnimationComplete])

  if (error) {
    return (
      <div className="sign-language-avatar">
        <div className="w-full h-[350px] flex items-center justify-center rounded-lg border"
          style={{ 
            backgroundColor: "var(--color-bg-secondary)",
            borderColor: "var(--color-border)"
          }}>
          <div className="text-center p-4">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{error}</p>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>
              Please ensure the 3D model is available
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sign-language-avatar" role="region" aria-label="Indian Sign Language Avatar" aria-live="polite">
      <div className="mb-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
          role="status"
          aria-live="polite"
          aria-label={isAnimating ? `Signing: ${currentText}` : isLoaded ? 'Sign language avatar ready' : 'Loading sign language avatar'}
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            color: "var(--color-text)"
          }}>
          <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-green-500 animate-pulse' : isLoaded ? 'bg-blue-500' : 'bg-gray-400'}`} aria-hidden="true"></div>
          {isAnimating ? 'Signing...' : isLoaded ? 'Ready' : 'Loading...'}
        </div>
      </div>
      
      {currentText && (
        <div className="mb-2 text-center">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Translating: <span className="font-mono font-semibold">{currentText}</span>
          </div>
        </div>
      )}
      
      <div 
        ref={canvasRef} 
        className="w-full h-[350px] flex items-center justify-center rounded-lg border"
        style={{ 
          minHeight: '350px',
          backgroundColor: "var(--color-bg-secondary)",
          borderColor: "var(--color-border)"
        }}
      />
      {isLoaded && (
        <div className="mt-2 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
          Indian Sign Language Avatar
        </div>
      )}
    </div>
  )
}
