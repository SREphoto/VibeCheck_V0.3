import { OutputMode, GenModel } from './types';

export const MODEL_LABELS: Record<GenModel, string> = {
  [GenModel.FLASH_LITE]: 'Gemini 2.5 Flash-Lite',
  [GenModel.FLASH_2_5]: 'Gemini 2.5 Flash',
  [GenModel.FLASH_2_5_THINKING]: 'Gemini 2.5 Flash (Thinking)',
  [GenModel.PRO_3_0]: 'Gemini 3.0 Pro (Preview)',
  [GenModel.FLASH_IMAGE]: 'Gemini 2.5 Flash Image',
  [GenModel.IMAGEN_4]: 'Imagen 4.0 (High Quality)',
};

export const FRACTAL_PROMPTS: string[] = [
  // --- Classics ---
  "A classic Mandelbrot set with zoom capability and colorful palette mapping",
  "Julia set visualization that animates based on mouse position affecting the constant c",
  "Burning Ship fractal zoomed into the 'armada' section with fire-like coloring",
  "Newton fractal (Newton-Raphson iteration) for z^3 - 1 = 0 showing basins of attraction",
  "Sierpinski triangle recursively drawn using random chaos game algorithm",
  "Koch snowflake generation growing outward step-by-step",
  "Dragon curve fractal animation unfolding over time",
  "Barnsley Fern generated using iterated function systems (IFS) with green gradients",
  // --- 3D & Complex ---
  "Menger Sponge 3D visualization rotating in space (raymarching)",
  "3D Mandelbulb raytracer with orbit controls and shadow calculations",
  "Pythagoras tree fractal growing and swaying like natural vegetation",
  "Cantor dust visualization in 3D space",
  "Apollonian gasket circle packing simulation with dynamic resizing",
  "Vicsek fractal cross animation",
  "Levy C curve generation with color gradients",
  // --- Mathematical Curiosities ---
  "Buddhabrot rendering showing probability distribution of the Mandelbrot set",
  "Hilbert curve space-filling curve traversal animation",
  "Lyapunov fractal generated from the sequence AB",
  "Kleinian group limit set visualization",
  "Biomorph fractal resembling biological organisms",
  "T-square fractal evolution animation",
  "Gosper curve (flowsnake) generation",
  "Duffing map chaotic attractor phase space visualization",
  "Ikeda map trajectory plotter with fading trails",
  // --- New Additions (20+) ---
  "Phoenix set fractal with periodic parameter modulation",
  "Spider fractal (a variation of the Mandelbrot set) with web-like strands",
  "Magnet fractal visualization showing magnetic roots",
  "Nova fractal (Newton's method for sin(z)-1) with deep zoom",
  "Cubic Mandelbrot set (z^3 + c) displaying 3-fold symmetry",
  "Lambda fractal (logistic map in the complex plane)",
  "Simonbrot visualization combining Mandelbrot and multibrot sets",
  "Talbot's curve (cornu spiral) interference pattern",
  "Brusselator reaction-diffusion system simulation",
  "Gingerbreadman chaotic map visualized as a scatter plot",
  "Henon map phase space diagram with high point density",
  "Rossler attractor 3D trajectory visualization",
  "Thomas cyclically symmetric attractor with color mapping",
  "Halvorsen attractor rotating in 3D space",
  "Sprott attractors (cycling through Case A to Z)",
  "Clifford attractor with soft transparent rendering",
  "Gumowski-Mira attractor resembling marine life",
  "De Jong attractor with aesthetic pixel density mapping",
  "Hopalong attractor visualization (Barry Martin's map)",
  "Peter de Jong map with high iteration count and exposure control",
  "Pickover Biomorphs using trigonometric functions",
  "Popcorn fractal (Pickover) animation",
  "Tinkerbell map chaotic attractor",
  "Lorenz-84 attractor visualization",
  // --- Final Batch ---
  "Multibrot set (z^d + c) where d oscillates between 2 and 5",
  "Burning Ship fractal variant 'The Shark' zoom",
  "Celtic Mandelbrot (using abs(Re(z)) + i*Im(z))",
  "Perpendicular Mandelbrot (using abs(Re(z)) + i*abs(Im(z)))",
  "Collatz fractal based on the 3n+1 conjecture",
  "Magnet Type II fractal showing distinct magnetic domains",
  "Virial fractal derived from physical virial coefficients",
  "Zeipel fractal based on celestial mechanics",
  "Markus-Lyapunov fractal with 'ABC' sequence",
  "Zubieta fractal derived from root finding methods",
  "Hopalong attractor with color cycling based on orbit speed",
  "Latoocarfian chaotic attractor (Clifford variant)",
  "Piecewise linear chaotic map visualization",
  "Standard map (Chirikov-Taylor map) phase space",
  "Bogdanov map bifurcation diagram",
  "Circle map Arnold tongues visualization",
  "Tent map cobweb plot animation",
  "Gauss map iteration showing chaotic scattering",
  "Lozi map attractor (piecewise linear)",
  "Rulkov map model of neuronal spiking"
];

export const MODE_SPECIFIC_PROMPTS: Record<OutputMode, string[]> = {
  [OutputMode.P5JS]: [
    // --- Original & Basics ---
    "A colorful Mandelbrot set zoom animation",
    "Julia set visualization with oscillating parameters",
    "Interactive flocking simulation with boid algorithm",
    "Perlin noise flow field with shifting neon colors",
    "Recursive tree fractal that sways in the wind",
    "Generative typography that responds to mouse distance",
    "Fibonacci spiral particle system exploring golden ratio",
    "Audio visualizer simulation with dancing geometric shapes",
    "Conway's Game of Life with random initial state and color aging",
    "Interactive water ripple effect using pixel manipulation",
    // --- Physics & Simulation ---
    "Lissajous curve patterns evolving over time with trailing effects",
    "Voronoi diagram generation with moving seed points",
    "Kaleidoscopic drawing tool with 8-way symmetry",
    "Falling sand particle physics simulation with different element types",
    "Reaction-diffusion algorithm (Gray-Scott model) visualization",
    "Circle packing algorithm that fills a text shape",
    "A physics-based double pendulum simulation leaving colorful trails",
    "Interactive soft-body physics blob using mass-spring systems",
    "Fluid dynamics simulation using grid-based solver",
    "Simulating gravity and collision between hundreds of colored circles",
    // --- New Additions (20+) ---
    "Phyllotaxis pattern generator (sunflower seeds) with animated growth",
    "Poisson disc sampling visualization filling the screen",
    "Quadtree spatial subdivision interactive visualization where mouse splits nodes",
    "Marching squares algorithm rendering topographic maps from noise",
    "Langton's Ant simulation with multiple colored ants/rules",
    "Fourier series drawing machine tracing a custom svg path",
    "Interactive cloth simulation using verlet integration and mouse tearing",
    "Ten Print (10 PRINT CHR$(205.5+RND(1)); : GOTO 10) maze generator in 3D",
    "Pixel sorting animation on a loaded noise buffer (Glitch art)",
    "Supershapes (Superformula) 3D mesh generation rotating",
    "Worley noise (cellular noise) visualization resembling biological cells",
    "Flow field following particles with life-spans and palette mapping",
    "Chaos game rendering a pentagon fractal point by point",
    "Hexagonal grid heatmap with pulsing interaction",
    "Chaikin's corner cutting algorithm for curve smoothing animation",
    "Visualizing Pi digits as a colored random walk",
    "Rosenclaire fractal rendered with pixel manipulation",
    "Strange attractor (Lorenz or Aizawa) 3D rotation with trails",
    "Wave function collapse algorithm generating a tilemap",
    "Spirograph simulation with multiple rotating gears and pen offsets",
    "Recaman's sequence visualization with semi-circles on a number line",
    "Maurer rose pattern generator with adjustable variables (n, d)",
    "Interactive particle text that flees from mouse cursor",
    "Simulating a dripping painting effect with random walkers",
    // --- Final Batch ---
    "Euler spiral (Clothoid) drawing visualization",
    "Ulam spiral prime number visualization with distinct colors",
    "Interactive bezier curve editor with draggable control points",
    "Metaballs rendering using pixel manipulation in 2D",
    "Visualizing the Collatz conjecture (3n+1) as a directed graph",
    "Sorting algorithm visualization (comparing Bubble, Merge, Quick sort)",
    "Raycasting engine (Wolfenstein 3D style) in p5.js",
    "Inverse kinematics interactive arm following mouse",
    "Steering behaviors (seek, flee, arrive) vehicle simulation",
    "Procedural terrain generation using 2D perlin noise mapping",
    "Kaleidoscope painter with rotational symmetry and mirroring",
    "L-System fractal plant generator with customizable rules",
    "Particles tracing a hidden text message",
    "Simulating a galaxy with gravitational n-body physics",
    "Drawing a seamless pattern using domain warping noise",
    "A* pathfinding algorithm visualization on a grid",
    "Dithering algorithm demonstration (Floyd-Steinberg) on a gradient",
    "Visualizing sound waves (FFT) from microphone input (simulated)",
    "Interactive squishy ball using soft body physics",
    "Generative art based on circle packing with varying radii"
  ],
  [OutputMode.SVG]: [
    // --- Graphic Design ---
    "Geometric Bauhaus style poster design with primary colors",
    "Intricate floral mandala pattern with gradient strokes",
    "Isometric city block illustration with shadows",
    "Minimalist line art logo of a fox",
    "Retro synthwave sunset with grid lines",
    "Abstract topographical map with contour lines",
    "Set of 4 flat design weather icons (sunny, rainy, cloudy, snow)",
    "Detailed circuit board pattern background with nodes",
    "Infographic timeline diagram with 5 colored milestones",
    "Cute vector illustration of a sleeping cat on a rug",
    // --- Technical & Diagrams ---
    "Complex Celtic knotwork border design",
    "Isometric server room equipment illustration",
    "Abstract geometric owl logo using golden ratio circles",
    "Seamless hexagon tessellation pattern with 3D cube effect",
    "Flat design space rocket launch scene with smoke clouds",
    "Schematic blueprint of a fictional sci-fi engine",
    "Periodic table layout with color-coded element groups",
    "Subway transit map for a fantasy city",
    "Exploded view diagram of a mechanical watch",
    // --- New Additions (20+) ---
    "Vector portrait of a woman with flowing hair in Art Nouveau style",
    "Set of 6 social media icons in a neumorphic style",
    "Detailed snowflake generation with crystalline symmetry",
    "Isometric pixel-art style room interior using vector blocks",
    "Data visualization chart: Radial bar chart with gradients",
    "Anatomy illustration of a human heart with labels",
    "Ornate vintage frame border with filigree details",
    "Low-poly landscape of mountains and a lake",
    "Planets of the solar system to scale with orbital paths",
    "Geometric origami bird set (crane, swan, owl)",
    "Abstract op-art illusion using black and white lines",
    "Technical drawing of a bicycle geometry",
    "Stylized world map using dot patterns (Pointillism)",
    "Heraldic crest design with a lion and shield",
    "Wireframe vector model of a sports car",
    "Decorative drop cap letter 'A' with floral intertwining",
    "Vector pattern of sushi rolls and chopsticks",
    "Minimalist movie poster design for a space thriller",
    "Architecture floor plan of a modern 2-bedroom apartment",
    "Playful monster character sheet with different expressions",
    "Radial convergence lines background (Manga action style)",
    "Stained glass window pattern with rose window geometry",
    "Maze generator (perfect maze) solved with a red line",
    "Knolling layout of camping gear (vector illustration)",
    // --- Final Batch ---
    "Isometric illustration of a coffee shop interior",
    "Vector set of 12 zodiac signs in a minimalist style",
    "Abstract geometric composition inspired by Kandinsky",
    "Detailed topographic map of a fictional island",
    "Seamless pattern of tropical leaves and flowers",
    "Flat design illustration of a workspace desk setup",
    "Vector diagram of a neuron and synapse",
    "Art Deco style party invitation border",
    "Stylized vector portrait of a cyberpunk character",
    "Infographic flowchart showing a recycling process",
    "Set of 5 gemstone vector icons with facets",
    "Blueprint schematic of a retro camera",
    "Abstract sound wave visualization graphic",
    "Geometric low-poly wolf head logo",
    "Vector illustration of a food truck",
    "Pattern design using Japanese Seigaiha waves",
    "Diagram of the layers of the Earth",
    "Vector UI kit elements (buttons, sliders, inputs)",
    "Badge design for a space exploration mission",
    "Isometric view of a factory production line"
  ],
  [OutputMode.HTML]: [
    // --- UI Components ---
    "Neumorphic calculator with soft shadows and gradients",
    "Glassmorphism credit card component with tilt effect",
    "Interactive pricing table with toggle switch for monthly/yearly",
    "Animated login form with floating labels and validation",
    "Responsive dashboard card showing a sales chart using CSS grid",
    "Loading spinner collection with pure CSS animations",
    "Dark mode toggle switch with sun/moon smooth transition",
    "Trello-style kanban board column with drag-and-drop simulation",
    "Music player card with spinning vinyl record animation",
    "Analog clock with functional moving hands using CSS transforms",
    // --- Apps & Games ---
    "Parallax scrolling hero section with 3 depth layers",
    "Todo list app with strike-through animation on completion",
    "Interactive periodic table element card with hover details",
    "CSS-only accordion menu with smooth height transitions",
    "Profile card with expanding bio section and social links icons",
    "A searchable data table with pagination UI",
    "Virtual keyboard with key-press animations and sound simulation",
    "Interactive code editor window with syntax highlighting mockup",
    "E-commerce product card with color selector and image slider",
    "Countdown timer to New Year's with confetti effect",
    // --- New Additions (20+) ---
    "Weather dashboard widget showing forecast with CSS weather icons",
    "Chat interface mockup with incoming message bubbles animation",
    "Circular progress bar with percentage counter animation",
    "File upload drag-and-drop zone with progress simulation",
    "Responsive navigation bar that transforms into a hamburger menu",
    "Testimonial carousel slider with auto-play and touch swipe",
    "FAQ section with expanding/collapsing answers and plus/minus icons",
    "Cookie consent banner with slide-up animation",
    "404 Error page with an interactive ghost or robot character",
    "Timeline component showing vertical history of events",
    "Color palette generator that copies hex codes on click",
    "Typing test game with WPM counter",
    "Memory card matching game grid (Emoji match)",
    "Interactive star rating component with hover states",
    "Notification toast system that stacks messages",
    "Masonry image gallery layout using pure CSS",
    "Ticket booking seat selector UI (Cinema style)",
    "Cryptocurrency ticker widget with flashing price updates",
    "Morphing button that turns into a loading spinner then checkmark",
    "Split-screen landing page with hover expansion effect",
    "Markdown editor mockup with split preview pane",
    "Pomodoro timer with circular visualization",
    "Simple drum machine sequencer with grid pads",
    "Solar system animation using only CSS div border-radius",
    // --- Final Batch ---
    "Interactive Canvas: Fireworks particle effect on click",
    "Interactive Canvas: Matrix digital rain effect",
    "Interactive Canvas: Ripple water effect on mouse move",
    "Interactive Canvas: Conway's Game of Life simulation",
    "CSS Grid layout: Periodic table of elements",
    "CSS Art: Pure CSS drawing of a Nintendo Switch",
    "CSS Art: Animated solar system using border-radius",
    "UI: Credit card input form with auto-formatting",
    "UI: Multi-step wizard form with progress bar",
    "UI: Audio visualization bars using CSS animations",
    "Game: Tic-Tac-Toe with basic AI",
    "Game: Snake game using HTML5 Canvas",
    "App: Calculator with history tape sidebar",
    "App: Digital sticky notes board with drag-and-drop",
    "Component: Custom video player controls overlay",
    "Component: Image comparison slider (Before/After)",
    "Component: Interactive map with tooltips (SVG map)",
    "Layout: Magazine style layout using CSS Grid areas",
    "Animation: Kinetic typography text reveal",
    "Animation: Hero header with 3D tilt effect on mouse move"
  ],
  [OutputMode.THREEJS]: [
    // --- Scenes & Environments ---
    "Rotating wireframe icosahedron with glowing edges",
    "Particle system raining down neon cubes on a plane",
    "Interactive solar system with orbit controls",
    "Procedural terrain generation using displacement map",
    "Reflective chrome sphere reflecting a starry sky environment",
    "Abstract tunnel fly-through with fog effects",
    "Low poly tree swaying in the wind",
    "Rubik's cube 3D model that automatically shuffles",
    "Galaxy simulation with thousands of swirling star particles",
    "DNA double helix rotating structure with connecting bonds",
    // --- Shaders & Effects ---
    "Interactive amorphous blob using vertex displacement shader",
    "Matrix code rain effect in 3D space",
    "Cyberpunk city street at night with neon signs and wet road reflection",
    "Physics simulation of 50 bouncy balls falling into a glass box",
    "Low poly floating island with a low-poly waterfall animation",
    "Interactive molecular structure viewer",
    "GLSL shader art: Sea of clouds with raymarching",
    "Procedural city generation with simple building blocks",
    "Retro vaporwave grid floor moving towards a sunset sun",
    "Interactive fluid simulation using particles",
    // --- New Additions (20+) ---
    "3D text intro animation like 'Star Wars' scrolling into distance",
    "Metaballs implementation (marching cubes algorithm)",
    "Infinite starfield warp speed effect",
    "Realistic water shader with reflection, refraction and waves",
    "Minecraft-style voxel terrain generator where you can click to remove blocks",
    "Physics cloth simulation pinned at two corners blowing in wind",
    "Digital rain/Matrix effect mapped onto a 3D human head model",
    "Audio visualizer mapping frequency to bar heights arranged in a circle",
    "Procedural planet generator with atmosphere shader and clouds",
    "Interactive 3D graph visualization of a mathematical function (z = sin(x) + cos(y))",
    "Newton's cradle physics simulation with momentum transfer",
    "Dissolve effect shader on a statue model (disintegrating)",
    "Day/Night cycle simulation with moving sun and changing shadow length",
    "Kaleidoscope shader effect on a rotating camera feed",
    "Fireworks display particle system with trails and explosions",
    "Fractal sponge (Menger sponge) recursion visualization",
    "Interactive car configurator (color change) on a low poly car model",
    "Portal effect looking into another scene (stencil buffer magic)",
    "Volumetric lighting (God rays) through a window",
    "Post-processing glitch effect on a rotating skull model",
    "Boids flocking simulation in 3D space (fish or birds)",
    "Procedural cave generation using 3D Perlin noise",
    "Interactive ripple effect on a water plane on mouse click",
    "Neon city flyover with glowing buildings",
    // --- Final Batch ---
    "Shader: Lava flow effect using noise textures",
    "Shader: Hologram effect on a 3D character model",
    "Shader: Toon shading (Cel shading) on a torus knot",
    "Physics: Jenga tower collapse simulation",
    "Physics: Domino effect chain reaction",
    "Scene: Low-poly campfire with particle fire",
    "Scene: Infinite mirror room effect",
    "Scene: Floating islands in the sky with bridges",
    "Effect: Motion blur on fast moving spheres",
    "Effect: Depth of field focusing on near objects",
    "Visualization: Network graph 3D force directed layout",
    "Visualization: 3D Bar chart growing animation",
    "Interactive: Paint on a 3D sphere surface",
    "Interactive: First-person camera movement in a maze",
    "GenArt: 3D L-System tree growth animation",
    "GenArt: Flow field tubes avoiding obstacles",
    "Tech: Instanced mesh rendering of 10,000 cubes",
    "Tech: Raycasting selection of objects in scene",
    "Environment: Underwater scene with caustics and bubbles",
    "Environment: Mars surface with rover rover tracks"
  ],
  [OutputMode.IMAGE]: [
    // --- Realistic & Cinematic ---
    "Cyberpunk street food vendor, neon lights, highly detailed, cinematic lighting",
    "Oil painting of a cottage in the woods, impasto style, cozy atmosphere",
    "Futuristic solarpunk city with hanging gardens, wide angle",
    "Macro photography of a mechanical eye, intricate clockwork details",
    "Minimalist vector illustration of a mountain landscape at dawn",
    "Portrait of a robot wearing baroque clothing, digital art",
    "Surreal composition of melting clocks in a desert, Dali style",
    "Pixel art of a fantasy RPG tavern interior, isometric view",
    "Studio photography of a translucent glass apple, professional lighting",
    "Isometric 3D render of a cozy gaming room, pastel colors",
    // --- Artistic Styles ---
    "Pencil sketch of an old wise wizard, high contrast, rough paper texture",
    "Vaporwave aesthetic statue bust with glitches and palm leaves",
    "Double exposure portrait of a woman and a dense forest",
    "Cute knitted wool texture monster, 3d render style, depth of field",
    "Cinematic shot of an astronaut walking on Mars, red dust storm, dramatic shadows",
    "Ukiyo-e style woodblock print of a surfer on a great wave",
    "A miniature world inside a lightbulb, fantasy forest, bioluminescence",
    "Knolling photography of retro astronaut gear, organized layout, top down",
    "Watercolor painting of a rainy street in Paris, blurry lights, artistic",
    "Paper cut-out craft art of a coral reef, layered depth, shadows",
    // --- New Additions (20+) ---
    "Diagrammatic botanical drawing of a fictional alien plant",
    "Pop art style portrait of a cat wearing sunglasses, halftone dots",
    "Noir detective scene, black and white, rainy alleyway, dramatic silhouette",
    "Low poly 3D game asset of a treasure chest, glowing gems",
    "Stained glass window design depicting a cosmic supernova",
    "Chalkboard art menu design with ornate typography and food doodles",
    "Claymation style character of a friendly dragon, fingerprint textures",
    "Blueprint schematic of a steampunk time machine",
    "Thermal camera view of a predator in the jungle",
    "Graffiti street art mural of a giant octopus on a brick wall",
    "Vintage travel poster for 'The Moon', 1950s style, distressed texture",
    "Cinematic wide shot of a battle between wizards, magic particle effects",
    "Macro shot of a soap bubble surface, interference rainbow colors",
    "Architecture visualization of a glass house on a cliff, sunset",
    "Concept art of a floating island marketplace, Ghibli style",
    "X-ray photography of a complex mechanical flower",
    "Mosaic tile art of a peacock with gold leaf accents",
    "ASCII art style portrait of a hacker, green text on black",
    "Risograph print of a retro robot, misaligned colors, grain",
    "Hyper-realistic close-up of a dragon's eye, scales texture",
    "Isometric cross-section of a subway station, rich details",
    "Synthwave grid landscape with a DeLorean driving into the sun",
    "Charcoal drawing of a bustling city street, smudged and raw",
    "Lego brick build of the Taj Mahal, depth of field",
    // --- Final Batch ---
    "Interior design of a mid-century modern living room, photorealistic",
    "Fantasy map of a fictional continent, parchment texture, ink lines",
    "Anime style character portrait, magical girl, sparkling effects",
    "3D render of abstract glass shapes with dispersion, octane render",
    "Pixel art animation frame of a fighting game character",
    "Vintage botanical illustration of poisonous mushrooms",
    "Cyberpunk city aerial view, raining, neon signs reflecting",
    "Surreal collage art, giant fish flying in the sky",
    "Line art tattoo design of a geometric wolf",
    "Paper quill art of a hummingbird, vibrant colors",
    "Marble statue of a greek god wearing streetwear",
    "Infographic poster of the solar system, flat design",
    "Polaroid photo of a road trip, vintage filter, scratches",
    "Tilt-shift photography of a miniature toy city",
    "Glow-in-the-dark mushrooms in a cave, bioluminescent",
    "Steampunk airship flying over a Victorian city",
    "Pattern design of cute sushi characters, seamless",
    "Abstract expressionist painting, chaotic brushstrokes, vivid colors",
    "Low key photography of a silhouette in a doorway",
    "Retro comic book cover, superhero action shot, halftone"
  ]
};

export const P5_SCAFFOLD = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
  <style>body { margin: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; background: transparent; }</style>
</head>
<body>
  <main></main>
  <script>
    // Error catching
    window.onerror = function(message, source, lineno, colno, error) {
      window.parent.postMessage({ type: 'error', message: message }, '*');
    };
    
    // User Code Injection
    /*__CODE__*/
  </script>
</body>
</html>
`;

export const THREE_SCAFFOLD = `
<!DOCTYPE html>
<html>
<head>
  <style>body { margin: 0; overflow: hidden; }</style>
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
      }
    }
  </script>
</head>
<body>
  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    
    window.onerror = function(message) {
      window.parent.postMessage({ type: 'error', message: message }, '*');
    };

    // User Code Injection
    /*__CODE__*/
  </script>
</body>
</html>
`;

export const HTML_SCAFFOLD = `
<!DOCTYPE html>
<html>
<head>
  <style>body { margin: 0; font-family: sans-serif; }</style>
</head>
<body>
  <!-- Content -->
  /*__CODE__*/
</body>
</html>
`;

export const SYSTEM_INSTRUCTIONS: Record<OutputMode, string> = {
  [OutputMode.P5JS]: "You are a creative coding expert. Write a p5.js sketch. OUTPUT ONLY THE JAVASCRIPT CODE inside `setup()` and `draw()` functions. Do not include HTML. Ensure the canvas fills the window using `createCanvas(windowWidth, windowHeight)`.",
  [OutputMode.SVG]: "You are a vector graphics expert. Generate a standalone SVG code block. It should be beautiful and complex. OUTPUT ONLY THE SVG CODE starting with <svg ...> and ending with </svg>. No markdown.",
  [OutputMode.HTML]: "You are a frontend expert. Write a single-file HTML/CSS/JS interactive component. Use inline CSS and JS. OUTPUT ONLY THE HTML CODE. Do not use external resources besides standard fonts.",
  [OutputMode.THREEJS]: "You are a 3D graphics expert. Write a Three.js script using ES modules. The scene, camera, and renderer are NOT pre-initialized; you must initialize them. Append renderer to document.body. Handle window resize. OUTPUT ONLY THE JAVASCRIPT CODE inside the module tag logic. Import THREE from 'three'.",
  [OutputMode.IMAGE]: "You are a digital artist. Create a prompt for an AI image generator based on the user request.", 
};