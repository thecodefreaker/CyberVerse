// Module declarations for component imports

// UI Components
declare module '@/components/ui/GlitchText' {
  import { GlitchTextProps } from '@/types/components';
  const GlitchText: React.FC<GlitchTextProps>;
  export default GlitchText;
}

declare module '@/components/ui/CyberButton' {
  import { CyberButtonProps } from '@/types/components';
  const CyberButton: React.FC<CyberButtonProps>;
  export default CyberButton;
}

declare module '@/components/ui/CyberCard' {
  import { CyberCardProps } from '@/types/components';
  const CyberCard: React.FC<CyberCardProps>;
  export default CyberCard;
}

declare module '@/components/ui/ExpandableCard' {
  import { ExpandableCardProps } from '@/types/components';
  const ExpandableCard: React.FC<ExpandableCardProps>;
  export default ExpandableCard;
}

declare module '@/components/ui/SectionHeading' {
  import { SectionHeadingProps } from '@/types/components';
  const SectionHeading: React.FC<SectionHeadingProps>;
  export default SectionHeading;
}

// Effects Components
declare module '@/components/effects/ParticleBackground' {
  import { ParticleBackgroundProps } from '@/types/components';
  const ParticleBackground: React.FC<ParticleBackgroundProps>;
  export default ParticleBackground;
}

declare module '@/components/effects/ScanLine' {
  import { ScanLineProps } from '@/types/components';
  const ScanLine: React.FC<ScanLineProps>;
  export default ScanLine;
}

declare module '@/components/effects/MatrixRainBackground' {
  import { MatrixRainBackgroundProps } from '@/types/components';
  const MatrixRainBackground: React.FC<MatrixRainBackgroundProps>;
  export default MatrixRainBackground;
}

// Interactive Components
declare module '@/components/interactive/CyberGlobe' {
  import { CyberGlobeProps } from '@/types/components';
  const CyberGlobe: React.FC<CyberGlobeProps>;
  export default CyberGlobe;
}

declare module '@/components/interactive/NetworkGraph' {
  import { NetworkGraphProps } from '@/types/components';
  const NetworkGraph: React.FC<NetworkGraphProps>;
  export default NetworkGraph;
}

declare module '@/components/interactive/CyberTerminal' {
  import { CyberTerminalProps } from '@/types/components';
  const CyberTerminal: React.FC<CyberTerminalProps>;
  export default CyberTerminal;
}

// External Libraries
declare module 'd3-force';

declare module 'react-force-graph-2d' {
  import { Component } from 'react';

  export interface NodeObject {
    id?: string | number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number;
    fy?: number;
    [key: string]: any;
  }

  export interface LinkObject {
    source: string | number | NodeObject;
    target: string | number | NodeObject;
    [key: string]: any;
  }

  export interface GraphData {
    nodes: NodeObject[];
    links: LinkObject[];
  }

  export type NodeCanvasObjectCallback = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => void;

  export interface ForceGraph2DProps {
    graphData: GraphData;
    width?: number;
    height?: number;
    backgroundColor?: string;
    nodeRelSize?: number;
    nodeId?: string;
    nodeLabel?: string | ((node: NodeObject) => string);
    nodeVal?: string | number | ((node: NodeObject) => number);
    nodeColor?: string | ((node: NodeObject) => string);
    nodeAutoColorBy?: string | ((node: NodeObject) => string);
    nodeCanvasObject?: NodeCanvasObjectCallback;
    linkLabel?: string | ((link: LinkObject) => string);
    linkWidth?: string | number | ((link: LinkObject) => number);
    linkColor?: string | ((link: LinkObject) => string);
    linkAutoColorBy?: string | ((link: LinkObject) => string);
    linkDirectionalArrowLength?: number | ((link: LinkObject) => number);
    linkDirectionalArrowColor?: string | ((link: LinkObject) => string);
    linkDirectionalParticles?: number | ((link: LinkObject) => number);
    linkDirectionalParticleWidth?: number | ((link: LinkObject) => number);
    d3Force?: (key: string, force: any) => void;
    cooldownTicks?: number;
    onNodeClick?: (node: NodeObject, event: MouseEvent) => void;
    onNodeHover?: (node: NodeObject | null, prevNode: NodeObject | null) => void;
    onNodeDrag?: (node: NodeObject, translate: { x: number, y: number }) => void;
    onNodeDragEnd?: (node: NodeObject, translate: { x: number, y: number }) => void;
    onLinkClick?: (link: LinkObject, event: MouseEvent) => void;
    onLinkHover?: (link: LinkObject | null, prevLink: LinkObject | null) => void;
    onEngineStop?: () => void;
    nodeCanvasObjectMode?: string | ((node: NodeObject) => string);
    ref?: any;
  }

  export default class ForceGraph2D extends Component<ForceGraph2DProps> {
    // Add commonly used methods
    d3Force(forceName: string, forceFn?: any): any;
    d3ReheatSimulation(): void;
    centerAt(x?: number, y?: number, ms?: number): void;
    zoom(k?: number, ms?: number): void;
    zoomToFit(ms?: number, padding?: number): void;
    pauseAnimation(): void;
    resumeAnimation(): void;
    refresh(): void;
  }
}

declare module 'd3' {
  // Basic selections
  export function select(selector: string | Element): Selection;
  export function selectAll(selector: string): Selection;
  
  // Scales
  export function scaleOrdinal(): ScaleOrdinal;
  export function scaleLinear(): ScaleLinear;
  
  // Forces
  export function forceSimulation<NodeDatum = any>(nodes?: NodeDatum[]): Simulation<NodeDatum>;
  export function forceLink<NodeDatum = any, LinkDatum = any>(links?: LinkDatum[]): ForceLink<NodeDatum, LinkDatum>;
  export function forceManyBody(): ForceManyBody;
  export function forceCenter(x?: number, y?: number): ForceCenter;
  export function forceCollide(radius?: number): ForceCollide;
  
  // Drag behavior
  export function drag<DragDatum = any, ReferenceDatum = any>(): Drag<DragDatum, ReferenceDatum>;
  
  // Zoom behavior
  export function zoom<ElementDatum = any, ReferenceDatum = any>(): Zoom<ElementDatum, ReferenceDatum>;
  
  // Data join
  export interface Selection {
    data<Datum>(data: Datum[]): Selection;
    data<Datum>(): Datum[];
    join(elementName: string): Selection;
    attr(name: string, value: string | number | ((d: any, i: number) => string | number)): Selection;
    style(name: string, value: string | number | ((d: any, i: number) => string | number)): Selection;
    text(value: string | ((d: any, i: number) => string)): Selection;
    append(elementName: string): Selection;
    on(eventName: string, callback: (event: any, d: any) => void): Selection;
    call(behavior: any, ...args: any[]): Selection;
    select(selector: string): Selection;
    selectAll(selector: string): Selection;
    classed(className: string, add: boolean | ((d: any, i: number) => boolean)): Selection;
    transition(): Selection;
    duration(milliseconds: number): Selection;
    delay(milliseconds: number | ((d: any, i: number) => number)): Selection;
    remove(): Selection;
    html(value: string | ((d: any, i: number) => string)): Selection;
    raise(): Selection;
    lower(): Selection;
    node(): Element;
  }
  
  // Interfaces for forces
  export interface Simulation<NodeDatum> {
    nodes(nodes: NodeDatum[]): Simulation<NodeDatum>;
    force(name: string, force: any): Simulation<NodeDatum>;
    on(eventName: string, callback: (e: any) => void): Simulation<NodeDatum>;
    alpha(value: number): Simulation<NodeDatum>;
    alphaTarget(value: number): Simulation<NodeDatum>;
    restart(): Simulation<NodeDatum>;
    stop(): Simulation<NodeDatum>;
    tick(): Simulation<NodeDatum>;
  }
  
  export interface ForceLink<NodeDatum, LinkDatum> {
    id(callback: (d: NodeDatum, i: number) => string): ForceLink<NodeDatum, LinkDatum>;
    links(links: LinkDatum[]): ForceLink<NodeDatum, LinkDatum>;
    distance(distance: number | ((d: LinkDatum, i: number) => number)): ForceLink<NodeDatum, LinkDatum>;
    strength(strength: number | ((d: LinkDatum, i: number) => number)): ForceLink<NodeDatum, LinkDatum>;
  }
  
  export interface ForceManyBody {
    strength(strength: number | ((d: any, i: number) => number)): ForceManyBody;
  }
  
  export interface ForceCenter {
    x(x: number): ForceCenter;
    y(y: number): ForceCenter;
  }
  
  export interface ForceCollide {
    radius(radius: number | ((d: any, i: number) => number)): ForceCollide;
  }
  
  // Drag behavior
  export interface Drag<DragDatum, ReferenceDatum> {
    on(typenames: string, listener: (event: any, d: any) => void): Drag<DragDatum, ReferenceDatum>;
    subject(subject: (this: any, event: any) => DragDatum): Drag<DragDatum, ReferenceDatum>;
  }
  
  // Zoom behavior
  export interface Zoom<ElementDatum, ReferenceDatum> {
    on(typenames: string, listener: (event: any) => void): Zoom<ElementDatum, ReferenceDatum>;
    scaleExtent(extent: [number, number]): Zoom<ElementDatum, ReferenceDatum>;
    translateExtent(extent: [[number, number], [number, number]]): Zoom<ElementDatum, ReferenceDatum>;
  }
  
  // Scales
  export interface ScaleOrdinal {
    domain(domain: string[]): ScaleOrdinal;
    range(range: any[]): ScaleOrdinal;
    (key: string): any;
  }
  
  export interface ScaleLinear {
    domain(domain: [number, number]): ScaleLinear;
    range(range: [number, number]): ScaleLinear;
    (value: number): number;
  }
}

declare module 'three' {
  export class WebGLRenderer {
    constructor(params: { antialias?: boolean; alpha?: boolean });
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: Scene, camera: Camera): void;
    domElement: HTMLCanvasElement;
    setClearColor(color: number | string | Color, alpha?: number): void;
    dispose(): void;
  }

  export class Scene {
    add(object: Object3D): this;
    background: Color | null;
    children: Object3D[];
  }

  export class PerspectiveCamera extends Camera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class Camera extends Object3D {
    matrixWorldInverse: Matrix4;
    projectionMatrix: Matrix4;
    projectionMatrixInverse: Matrix4;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    add(v: Vector3): this;
    multiplyScalar(scalar: number): this;
    normalize(): this;
    set(x: number, y: number, z: number): this;
    copy(v: Vector3): this;
    clone(): Vector3;
    addVectors(a: Vector3, b: Vector3): this;
  }

  export class Color {
    constructor(color: string | number);
    r: number;
    g: number;
    b: number;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    children: Object3D[];
    parent: Object3D | null;
    visible: boolean;
    userData: any;
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    rotateX(angle: number): this;
    rotateY(angle: number): this;
    rotateZ(angle: number): this;
  }

  export class Group extends Object3D {
    constructor();
  }

  export class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
    geometry: BufferGeometry;
    material: Material | Material[];
    userData: any;
  }

  export class Line extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    geometry: BufferGeometry;
    material: Material;
  }

  export class BoxGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number);
  }

  export class SphereGeometry extends BufferGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): this;
    setFromPoints(points: Vector3[]): this;
  }

  export class BufferAttribute {
    constructor(array: Float32Array | Uint16Array | Uint32Array, itemSize: number, normalized?: boolean);
  }

  export class Material {
    transparent: boolean;
    opacity: number;
    side: Side;
    visible: boolean;
  }

  export class MeshBasicMaterial extends Material {
    constructor(parameters?: { color?: number | string | Color; wireframe?: boolean; map?: Texture; transparent?: boolean; opacity?: number });
    color: Color;
  }

  export class LineBasicMaterial extends Material {
    constructor(parameters?: { color?: number | string | Color; linewidth?: number; transparent?: boolean; opacity?: number });
    color: Color;
  }

  export class MeshStandardMaterial extends Material {
    constructor(parameters?: { color?: number | string | Color; emissive?: number | string | Color; roughness?: number; metalness?: number });
  }

  export class ShaderMaterial extends Material {
    constructor(parameters?: { 
      uniforms?: { [uniform: string]: { value: any } }; 
      vertexShader?: string; 
      fragmentShader?: string; 
      transparent?: boolean; 
      blending?: number;
    });
    uniforms: { [uniform: string]: { value: any } };
  }

  export class AmbientLight extends Light {
    constructor(color?: Color | string | number, intensity?: number);
  }

  export class DirectionalLight extends Light {
    constructor(color?: Color | string | number, intensity?: number);
    position: Vector3;
  }

  export class Light extends Object3D {
    color: Color;
    intensity: number;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
  }

  export class Matrix4 {
    elements: number[];
  }

  export class Texture {
    constructor();
  }

  export enum Side { FrontSide, BackSide, DoubleSide }
  export const AdditiveBlending: number;
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, Vector3 } from 'three';

  export class OrbitControls {
    constructor(camera: Camera, domElement: HTMLElement);
    update(): boolean;
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
    enabled: boolean;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    autoRotate: boolean;
    autoRotateSpeed: number;
    target: Vector3;
    dispose(): void;
  }
}

declare module 'qrcode.react';

// Additional global type declarations
interface Window {
  // Add any window extensions here if needed
}
