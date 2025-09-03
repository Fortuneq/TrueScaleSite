/**
 * THREE.JS BACKGROUND ANIMATION MODULE
 * 
 * Creates a scroll-responsive 3D icosahedron background animation
 * Uses custom shaders loaded from GitHub Gists
 * 
 * Features:
 * - Scroll-based animation parameters
 * - Custom shader material with uniforms
 * - Responsive canvas sizing (30% larger than viewport)
 * - Continuous rotation animation
 * 
 * Dependencies: Three.js, GSAP
 * Shader Sources: GitHub Gists (vertex and fragment shaders)
 */

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("animation-section");
    if (!container) {
        console.warn('Animation container not found');
        return;
    }
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    
    // CANVAS SIZING: Calculate size - make it 30% larger and center it
    const baseWidth = window.innerWidth;
    const baseHeight = window.innerHeight;
    const scaleFactor = 1.3; // 30% larger for better coverage
    const canvasWidth = baseWidth * scaleFactor;
    const canvasHeight = baseHeight * scaleFactor;
    
    // CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
    camera.position.z = 2.5;
    
    // RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(canvasWidth, canvasHeight);
    
    // CANVAS POSITIONING: Position canvas in center of viewport
    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    
    container.appendChild(canvas);

    /**
     * SHADER LOADING: Fetch custom shaders from GitHub Gists
     * Vertex shader: Controls vertex positioning and deformation
     * Fragment shader: Controls color and visual effects
     */
    Promise.all([
        fetch('https://gist.githubusercontent.com/jeune-toujours/25623564367c8a51239cce2b2710b6d5/raw/vertex.glsl')
            .then(response => response.text()),
        fetch('https://gist.githubusercontent.com/jeune-toujours/07e27eb2b3234d3b8243a3866c51f335/raw/fragment.glsl')
            .then(response => response.text())
    ]).then(([vertexShader, fragmentShader]) => {

        // GEOMETRY: Create icosahedron with high subdivision for smooth deformation
        const geometry = new THREE.IcosahedronGeometry(1, 64);

        // MATERIAL: Custom shader material with animation uniforms
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uFrequency: { value: 0 },    // Deformation frequency
                uAmplitude: { value: 0 },    // Deformation amplitude
                uDensity: { value: 1 },      // Mesh density
                uStrength: { value: 0 },     // Effect strength
                uBlueGradient: { value: 1 }, // Blue gradient intensity
                uOpacity: { value: 1 }       // Overall opacity
            },
            wireframe: true,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        // MESH: Create and add mesh to scene
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        /**
         * SCROLL ANIMATION: Update shader uniforms based on scroll position
         * Creates dynamic visual effects that respond to user scroll
         */
        window.addEventListener('scroll', function () {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Animate shader uniforms with GSAP for smooth transitions
            gsap.to(material.uniforms.uFrequency, { 
                value: scrollPercent * 4,
                duration: 0.5
            });
            gsap.to(material.uniforms.uAmplitude, { 
                value: scrollPercent * 4,
                duration: 0.5
            });
            gsap.to(material.uniforms.uStrength, { 
                value: scrollPercent * 1.1,
                duration: 0.5
            });
            gsap.to(material.uniforms.uBlueGradient, { 
                value: 1 - scrollPercent,
                duration: 0.5
            });
            gsap.to(material.uniforms.uOpacity, { 
                value: 0.33 + scrollPercent * 0.33,
                duration: 0.5
            });
        });

        /**
         * ANIMATION LOOP: Continuous rotation and rendering
         * Creates subtle rotation animation for visual interest
         */
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate mesh slowly over time
            const elapsedTime = performance.now() * 0.0001;
            mesh.rotation.x = elapsedTime;
            mesh.rotation.y = elapsedTime;
            
            // Render the scene
            renderer.render(scene, camera);
        }
        
        // Start animation loop
        animate();
        
    }).catch(error => {
        console.error('Failed to load shaders:', error);
    });
});