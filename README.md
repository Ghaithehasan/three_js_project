# 🌍 Earth & Moon 3D Simulation

<p align="center">
  <img src="https://img.shields.io/badge/Three.js-0.176.0-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Webpack-5.x-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <strong>An interactive 3D visualization of Earth and Moon using Three.js</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#technologies">Technologies</a>
</p>

---

## Overview

A stunning 3D simulation of Earth and Moon built with Three.js, featuring realistic textures, lighting, atmospheric effects, and orbital mechanics. This project demonstrates advanced WebGL rendering techniques including bump mapping, specular highlights, cloud layers, and atmospheric glow.

**Live Demo:** [Add your deployed link here]

---

## Features

### 🌍 Realistic Earth Rendering
- **High-resolution textures** (4K Earth surface)
- **Bump mapping** for realistic terrain elevation
- **Specular mapping** for ocean reflections
- **Day/night cycle** with city lights
- **Dynamic cloud layer** with transparency
- **Atmospheric glow** using Fresnel shader
- **Proper Earth tilt** (23.4° axis)

### 🌙 Moon Simulation
- Realistic moon surface with bump mapping
- Accurate scale (0.27x Earth size)
- Orbital animation around Earth
- Metallic/roughness material properties

### ✨ Visual Effects
- **Starfield background** (2000+ procedural stars)
- **Directional sunlight** with realistic positioning
- **Smooth animations** for all celestial bodies
- **Anti-aliasing** for crisp graphics
- **Tone mapping** (ACES Filmic) for realistic colors

### 🎮 Interactive Controls
- **Orbit controls** - Rotate view with mouse drag
- **Zoom** - Mouse wheel to zoom in/out
- **Pan** - Right-click drag to pan
- **Responsive** - Auto-adjusts to window resize

---

## Demo

### Screenshots

*Add screenshots of your project here*

### What You'll See

- Earth rotating with realistic day/night transitions
- Clouds moving at different speed than surface
- Moon orbiting around Earth
- Stars slowly rotating in background
- Atmospheric glow around Earth's edge
- Interactive camera controls

---

## Installation

### Prerequisites

- Node.js 14.x or higher
- npm or yarn package manager

### Setup Instructions

**1. Clone the repository**
```bash
git clone https://github.com/Ghaithehasan/earth-moon-simulation.git
cd earth-moon-simulation
```

**2. Install dependencies**
```bash
npm install
```

**3. Start development server**
```bash
npm run dev
```

The project will open at `http://localhost:8080`

**4. Build for production**
```bash
npm run build
```

Production files will be generated in the `dist/` folder.

---

## Usage

### Development Mode

```bash
npm run dev
```
- Runs webpack dev server with hot reload
- Auto-opens browser
- Shows compilation errors in console

### Production Build

```bash
npm run build
```
- Optimizes and minifies code
- Generates production-ready files
- Output in `dist/` directory

### Camera Controls

| Action | Control |
|--------|---------|
| Rotate view | Left mouse drag |
| Zoom in/out | Mouse wheel |
| Pan camera | Right mouse drag |
| Reset view | Refresh page |

---

## Project Structure

```
earth-moon-simulation/
├── src/
│   ├── textures/
│   │   ├── stars/
│   │   │   ├── star.js              # Starfield generator
│   │   │   └── getFrensilMat.js     # Fresnel shader
│   │   ├── Earth4kTexture.png       # Earth surface map
│   │   ├── 01_earthbump1k.jpg       # Elevation/bump map
│   │   ├── 02_earthspec1k.jpg       # Specular/ocean map
│   │   ├── 8081_earthlights10k.jpg  # City lights map
│   │   ├── earth_clouds_8K.png      # Cloud layer
│   │   ├── 05_earthcloudmaptrans.jpg # Cloud transparency
│   │   ├── Moon.jpg                 # Moon surface map
│   │   └── moon_bum.jpg             # Moon bump map
│   ├── index.js                     # Main application
│   └── style.css                    # Styles
├── bundler/
│   ├── webpack.dev.js               # Dev config
│   └── webpack.prod.js              # Production config
├── index.html                       # HTML template
├── package.json                     # Dependencies
└── README.md
```

---

## Technologies

### Core Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| **Three.js** | 0.176.0 | 3D graphics library |
| **Webpack** | 5.99.7 | Module bundler |
| **Babel** | 7.26.10 | JavaScript transpiler |
| **GSAP** | 3.12.7 | Animation library |

### Three.js Features Used

- **IcosahedronGeometry** - Sphere generation with detail level
- **MeshPhongMaterial** - Realistic surface materials
- **MeshBasicMaterial** - Emissive city lights
- **MeshStandardMaterial** - PBR materials for moon/clouds
- **DirectionalLight** - Sun simulation
- **OrbitControls** - Camera interaction
- **TextureLoader** - Loading image textures
- **GLTFLoader** - 3D model loading (imported)
- **RGBELoader** - HDR environment maps (imported)

### Webpack Configuration

- **Dev Server** - Hot reload development
- **CSS Loader** - Style processing
- **Babel Loader** - ES6+ transpilation
- **HTML Plugin** - Template generation
- **Terser Plugin** - Code minification

---

## Technical Details

### Rendering Pipeline

1. **Scene Setup**
   - Creates WebGL renderer with anti-aliasing
   - Sets tone mapping for realistic colors
   - Configures color space (Linear SRGB)

2. **Earth Rendering**
   - Base layer: 4K surface texture
   - Bump map: Terrain elevation
   - Specular map: Ocean reflections
   - Emission layer: City lights (additive blending)
   - Cloud layer: Transparent with alpha map
   - Glow layer: Fresnel shader for atmosphere

3. **Moon Rendering**
   - Surface texture with bump mapping
   - PBR material (metalness + roughness)
   - Scaled to 0.27x Earth size
   - Orbits around Earth

4. **Lighting**
   - Single directional light simulating sun
   - Positioned at (-2, 0.5, 1.5) for realistic shadows

5. **Animation Loop**
   - Earth rotation: 0.002 rad/frame
   - Cloud rotation: 0.0023 rad/frame (slightly faster)
   - Moon orbit: 0.01 rad/frame
   - Stars rotation: -0.0002 rad/frame

### Performance Optimizations

- Uses IcosahedronGeometry with detail level 12 for smooth spheres
- Efficient texture loading with TextureLoader
- Hardware-accelerated WebGL rendering
- Responsive design with window resize handling
- Optimized production build with Terser

---

## Customization

### Adjust Earth Rotation Speed

```javascript
// In animate() function
earthMesh.rotation.y += 0.002; // Increase for faster rotation
```

### Change Moon Orbit Speed

```javascript
moonGroop.rotation.y += 0.01; // Adjust orbital speed
```

### Modify Atmosphere Glow

```javascript
glowMesh.scale.setScalar(1.01); // Increase for thicker atmosphere
```

### Add More Stars

```javascript
const stars = getStarfield({numStars: 5000}); // Increase count
```

### Adjust Camera Position

```javascript
camera.position.z = 5; // Change initial distance
```

---

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Requirements:**
- WebGL 2.0 support
- Modern JavaScript (ES6+)
- Hardware acceleration enabled

---

## Performance Tips

- **Lower texture resolution** if running slow on older hardware
- **Reduce starfield count** for better FPS
- **Decrease geometry detail** (change `detail` variable)
- **Disable anti-aliasing** on low-end devices
- **Use production build** for better performance

---

## Known Issues

- May not work on very old browsers without WebGL support
- Mobile performance may vary depending on device
- Requires decent GPU for smooth 60 FPS

---

## Future Enhancements

- [ ] Add other planets (Mars, Jupiter, etc.)
- [ ] Implement realistic orbital mechanics
- [ ] Add asteroid belt
- [ ] Time controls (speed up/slow down)
- [ ] Toggle layers (clouds, lights, atmosphere)
- [ ] VR/AR support
- [ ] Educational information tooltips
- [ ] Multiple camera presets
- [ ] Screenshot/video capture
- [ ] Mobile touch controls

---

## Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Resources

### Textures
- Earth textures from NASA Visible Earth
- Moon textures from NASA CGI Moon Kit
- Free to use for educational purposes

### Learning Resources
- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [WebGL Fundamentals](https://webglfundals.org/)

---

## Contact

**Ghaith Ehasan**

- GitHub: [@Ghaithehasan](https://github.com/Ghaithehasan)
- Email: abrahymtrkyhsn0@gmail.com

---

## Acknowledgments

- Three.js team for the amazing library
- NASA for texture resources
- WebGL community for tutorials and inspiration

---

<p align="center">
  <strong>⭐ If you like this project, give it a star! ⭐</strong>
</p>

<p align="center">
  Built with ❤️ using Three.js
</p>
