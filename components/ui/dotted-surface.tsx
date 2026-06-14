'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 100;
		const AMOUNTX = 55;
		const AMOUNTY = 55;

		// Scene setup
		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x030712, 1000, 3000); // Blend into slate-950

		const camera = new THREE.PerspectiveCamera(
			55,
			window.innerWidth / window.innerHeight,
			1,
			5000,
		);
		camera.position.set(0, 400, 1000);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(scene.fog.color, 0);

		containerRef.current.appendChild(renderer.domElement);

		// Create particles
		const positions: number[] = [];
		const colors: number[] = [];

		const geometry = new THREE.BufferGeometry();

		// Determine colors based on theme
		const isDarkTheme = theme === 'dark' || !theme || theme === 'system';

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const y = 0;
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions.push(x, y, z);

				if (isDarkTheme) {
					// Soft violet-tinted white for dark mode
					colors.push(0.5, 0.4, 0.9); // Normalised RGB (128, 102, 230)
				} else {
					colors.push(0.1, 0.1, 0.1);
				}
			}
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3),
		);
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		// Create material
		const material = new THREE.PointsMaterial({
			size: 5,
			vertexColors: true,
			transparent: true,
			opacity: 0.25, // Subtle background dots
			sizeAttenuation: true,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		let animationId = 0;

		// Mouse coordinates tracking
		let mouseX = 0;
		let mouseY = 0;

		const handleMouseMove = (event: MouseEvent) => {
			mouseX = event.clientX - window.innerWidth / 2;
			mouseY = event.clientY - window.innerHeight / 2;
		};

		window.addEventListener('mousemove', handleMouseMove);

		// Animation function
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const positions = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const index = i * 3;

					// Animate Y position with double sine waves + dynamic mouse influence
					const baseWave = Math.sin((ix + count) * 0.25) * 35 + Math.sin((iy + count) * 0.35) * 35;
					positions[index + 1] = baseWave;

					i++;
				}
			}

			positionAttribute.needsUpdate = true;

			// Rotate camera slightly based on mouse cursor (Parallax effect)
			const targetX = mouseX * 0.4;
			const targetY = -mouseY * 0.4 + 400;

			camera.position.x += (targetX - camera.position.x) * 0.03;
			camera.position.y += (targetY - camera.position.y) * 0.03;
			camera.lookAt(scene.position);

			renderer.render(scene, camera);
			count += 0.03;
		};

		// Handle window resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		// Start animation
		animate();

		// Store references
		sceneRef.current = {
			scene,
			camera,
			renderer,
			particles: [points],
			animationId,
			count,
		};

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);

			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);

				sceneRef.current.scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((material) => material.dispose());
						} else {
							object.material.dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				if (containerRef.current && sceneRef.current.renderer.domElement) {
					containerRef.current.removeChild(
						sceneRef.current.renderer.domElement,
					);
				}
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 -z-10 opacity-90', className)}
			{...props}
		/>
	);
}
