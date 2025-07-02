"use client"

import { useRef, useEffect } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from "ogl";

type GL = Renderer["gl"];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = "bold 30px monospace",
  color: string = "black"
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Could not get 2d context");

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = (textWidth + 20) * dpr;
  canvas.height = (textHeight + 20) * dpr;
  
  context.scale(dpr, dpr);
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  context.fillText(text, (canvas.width / dpr) / 2, (canvas.height / dpr) / 2);
  
  const texture = new Texture(gl, { 
    generateMipmaps: false,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR
  });
  texture.image = canvas;
  return { texture, width: canvas.width / dpr, height: canvas.height / dpr };
}

interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#545050",
    font = "30px sans-serif",
  }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );
    const geometry = new Plane(this.gl, { widthSegments: 1, heightSegments: 1 });
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
      cullFace: null,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y =
      -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  texture!: Texture;
  isLoaded: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }: MediaProps) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    this.texture = new Texture(this.gl, {
      generateMipmaps: false,
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR,
      wrapS: this.gl.CLAMP_TO_EDGE,
      wrapT: this.gl.CLAMP_TO_EDGE
    });
    
    this.program = new Program(this.gl, {
      vertex: `
        precision mediump float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision mediump float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uOpacity;
        varying vec2 vUv;
        
        float roundedRect(vec2 p, vec2 size, float radius) {
          vec2 q = abs(p) - size + radius;
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
        }
        
        void main() {
          float imageAspect = uImageSizes.x / uImageSizes.y;
          float planeAspect = uPlaneSizes.x / uPlaneSizes.y;
          
          vec2 uv = vUv;
          
          if (abs(imageAspect - planeAspect) > 0.01) {
            if (imageAspect > planeAspect) {
              float scale = planeAspect / imageAspect;
              uv.x = uv.x * scale + (1.0 - scale) * 0.5;
            } else {
              float scale = imageAspect / planeAspect;
              uv.y = uv.y * scale + (1.0 - scale) * 0.5;
            }
          }
          
          vec4 texColor = texture2D(tMap, uv);
          
          vec2 centered = vUv * 2.0 - 1.0;
          float distance = roundedRect(centered, vec2(1.0), uBorderRadius);
          float smoothedAlpha = 1.0 - smoothstep(-0.005, 0.005, distance);
          
          gl_FragColor = texColor * smoothedAlpha * uOpacity;
        }
      `,
      uniforms: {
        tMap: { value: this.texture },
        uBorderRadius: { value: this.borderRadius },
        uImageSizes: { value: [1, 1] },
        uPlaneSizes: { value: [1, 1] },
        uOpacity: { value: 0.0 },
      },
      transparent: true,
      cullFace: null,
      depthTest: false,
      depthWrite: false
    });

    this.loadImage();
  }

  loadImage() {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.loading = "eager";
    img.decoding = "async";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // High resolution settings with 3:4 aspect ratio (portrait)
      const targetAspectRatio = 3 / 4; // Width:Height = 3:4
      const maxSize = window.innerWidth < 768 ? 768 : 1536;
      
      // Calculate final dimensions maintaining exact 3:4 ratio
      const targetWidth = maxSize;
      const targetHeight = Math.round(maxSize / targetAspectRatio); // Height = Width * (4/3)
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      if (ctx) {
        // Enable high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Calculate source dimensions for center cropping to 3:4
        const imageAspect = img.width / img.height;
        let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;
        
        if (imageAspect > targetAspectRatio) {
          // Image is wider than 3:4, crop horizontally (center crop)
          sourceWidth = img.height * targetAspectRatio;
          sourceX = (img.width - sourceWidth) / 2;
        } else if (imageAspect < targetAspectRatio) {
          // Image is taller than 3:4, crop vertically (center crop)
          sourceHeight = img.width / targetAspectRatio;
          sourceY = (img.height - sourceHeight) / 2;
        }
        
        // Fill with neutral background first (in case of transparency)
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the cropped and scaled image
        ctx.drawImage(
          img,
          Math.round(sourceX), Math.round(sourceY), 
          Math.round(sourceWidth), Math.round(sourceHeight),
          0, 0, canvas.width, canvas.height
        );
      }
      
      this.texture.image = canvas;
      this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
      this.program.uniforms.uOpacity.value = 1.0;
      this.isLoaded = true;
    };
    
    img.onerror = () => {
      console.warn('Failed to load image:', this.image);
      this.loadPlaceholder();
    };
    
    img.src = this.image;
  }

  loadPlaceholder() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // High resolution placeholder with exact 3:4 aspect ratio
    const maxSize = window.innerWidth < 768 ? 768 : 1536;
    canvas.width = maxSize;
    canvas.height = Math.round(maxSize / (3/4)); // Height = Width * (4/3)
    
    if (ctx) {
      // Create attractive gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#2a2a2a');
      gradient.addColorStop(0.5, '#3a3a3a');
      gradient.addColorStop(1, '#4a4a4a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle pattern
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < canvas.width; i += 40) {
        for (let j = 0; j < canvas.height; j += 40) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
      ctx.globalAlpha = 1;
      
      // Add centered text
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(canvas.width / 20)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Image Loading...', canvas.width / 2, canvas.height / 2);
    }
    
    this.texture.image = canvas;
    this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
    this.program.uniforms.uOpacity.value = 1.0;
    this.isLoaded = true;
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arcSq = R * R - effectiveX * effectiveX;
      if (arcSq > 0) {
        const arc = R - Math.sqrt(arcSq);
        if (this.bend > 0) {
          this.plane.position.y = -arc;
          this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
        } else {
          this.plane.position.y = arc;
          this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
        }
      }
    }

    this.speed = scroll.current - scroll.last;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    
    this.scale = this.screen.height / 1500;
    
    const isMobile = this.screen.width < 768;
    const baseSize = isMobile ? 400 : 700;
    const aspectRatio = 3 / 4; // 3:4 aspect ratio (portrait)
    
    // Calculate plane dimensions maintaining 3:4 ratio
    this.plane.scale.y = (this.viewport.height * (baseSize * this.scale)) / this.screen.height;
    this.plane.scale.x = this.plane.scale.y * aspectRatio;
    
    // Update shader uniforms with exact plane dimensions
    if (this.plane?.program?.uniforms?.uPlaneSizes) {
      this.plane.program.uniforms.uPlaneSizes.value = [
        this.plane.scale.x,
        this.plane.scale.y,
      ];
    }
    
    this.padding = isMobile ? 1.2 : 1.8;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

interface AppConfig {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

class App {
  container: HTMLElement;
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: { image: string; text: string }[] = [];
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf: number = 0;
  isDestroyed: boolean = false;

  boundOnResize!: () => void;
  boundOnWheel!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;

  isDown: boolean = false;
  start: number = 0;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px Figtree",
    }: AppConfig
  ) {
    if (!container) {
      console.error('Container element is required');
      return;
    }

    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scroll = { ease: 0.08, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 100);
    
    try {
      this.createRenderer();
      this.createCamera();
      this.createScene();
      this.onResize();
      this.createGeometry();
      this.createMedias(items, bend, textColor, borderRadius, font);
      this.addEventListeners();
      this.update();
    } catch (error) {
      console.error('Failed to initialize gallery:', error);
    }
  }

  createRenderer() {
    this.renderer = new Renderer({ 
      alpha: true, 
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 2)
    });
    this.gl = this.renderer.gl;
    
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    
    const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
    canvas.style.position = 'absolute';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.touchAction = 'none';
    this.container.appendChild(canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    const isMobile = window.innerWidth < 768;
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: isMobile ? 10 : 20,
      widthSegments: isMobile ? 15 : 30,
    });
  }

  createMedias(
    items: { image: string; text: string }[] | undefined,
    bend: number = 1,
    textColor: string,
    borderRadius: number,
    font: string
  ) {
    if (!items || items.length === 0) {
      console.warn('No gallery items provided');
      return;
    }
    
    this.mediasImages = items;
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (window.innerWidth < 768 ? 0.03 : 0.05);
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }

  onTouchUp(e?: Event) {
    if (e) e.preventDefault();
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY * (window.innerWidth < 768 ? 0.005 : 0.008);
    this.scroll.target += delta;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    if (width <= 0) return;
    
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    if (!this.container) return;
    
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    
    if (this.screen.width <= 0 || this.screen.height <= 0) return;
    
    this.renderer?.setSize(this.screen.width, this.screen.height);
    
    this.camera?.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }

  update() {
    if (this.isDestroyed) return;
    
    const threshold = 0.001;
    const needsUpdate = this.isDown || 
      Math.abs(this.scroll.target - this.scroll.current) > threshold;
    
    if (needsUpdate) {
      this.scroll.current = lerp(
        this.scroll.current,
        this.scroll.target,
        this.scroll.ease
      );
      
      const direction = this.scroll.current > this.scroll.last ? "right" : "left";
      
      if (this.medias && this.viewport) {
        const viewportWidth = this.viewport.width;
        this.medias.forEach((media) => {
          const isNearViewport = Math.abs(media.plane.position.x) < viewportWidth * 2;
          if (isNearViewport || media.isLoaded) {
            media.update(this.scroll, direction);
          }
        });
      }
      
      this.renderer?.render({ scene: this.scene, camera: this.camera });
      this.scroll.last = this.scroll.current;
    }
    
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    window.addEventListener("resize", this.boundOnResize, { passive: true });
    this.container.addEventListener("wheel", this.boundOnWheel, { passive: false });
    this.container.addEventListener("mousedown", this.boundOnTouchDown, { passive: false });
    window.addEventListener("mousemove", this.boundOnTouchMove, { passive: false });
    window.addEventListener("mouseup", this.boundOnTouchUp, { passive: false });
    this.container.addEventListener("touchstart", this.boundOnTouchDown, { passive: false });
    this.container.addEventListener("touchmove", this.boundOnTouchMove, { passive: false });
    this.container.addEventListener("touchend", this.boundOnTouchUp, { passive: false });
  }

  destroy() {
    this.isDestroyed = true;
    
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
    
    window.removeEventListener("resize", this.boundOnResize);
    this.container?.removeEventListener("wheel", this.boundOnWheel);
    this.container?.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    this.container?.removeEventListener("touchstart", this.boundOnTouchDown);
    this.container?.removeEventListener("touchmove", this.boundOnTouchMove);
    this.container?.removeEventListener("touchend", this.boundOnTouchUp);
    
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

interface GalleryControls {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

interface CircularGalleryProps {
  items?: { image: string; text: string }[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  onInitialized?: (controls: GalleryControls) => void;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree",
  onInitialized = () => {},
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  
  useEffect(() => {
    if (!containerRef.current || !items || items.length === 0) return;
    
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
    });
    
    appRef.current = app;
    
    const controls: GalleryControls = {
      next: () => {
        if (!app.medias || !app.medias[0]) return;
        const width = app.medias[0].width;
        app.scroll.target += width;
        app.onCheck();
      },
      prev: () => {
        if (!app.medias || !app.medias[0]) return;
        const width = app.medias[0].width;
        app.scroll.target -= width;
        app.onCheck();
      },
      goTo: (index: number) => {
        if (!app.medias || !app.medias[0] || index < 0 || index >= app.medias.length) return;
        const width = app.medias[0].width;
        app.scroll.target = width * index;
        app.onCheck();
      }
    };
    
    onInitialized(controls);
    
    return () => {
      app.destroy();
      appRef.current = null;
    };
  }, [items, bend, textColor, borderRadius, font, onInitialized]);
  
  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative select-none"
      ref={containerRef}
      style={{
        background: 'transparent',
        position: 'relative',
        touchAction: 'none',
      }}
    />
  );
}

export type { GalleryControls };