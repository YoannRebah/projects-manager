import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from './location';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';
import Typed from 'typed.js';
import * as THREE from 'three';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})

export class LocationComponent implements AfterViewInit {
  countriesStringArray: string[] = ["????", "UNKNOWN_CITY", "NETWORK_FAILED", "ERROR_6005"]; 
  locationList: Location[] = [
    {
      iconClassNames: "fa-solid fa-check",
      key: "Pays",
      value: "France"
    },
    {
      iconClassNames: "fa-solid fa-check",
      key: "Région",
      value: "Île-de-France"
    },
    {
      iconClassNames: "fa-solid fa-check",
      key: "Département",
      value: "Essonne"
    }
  ];

  @ViewChild('earthGlobe', { static: true }) earthGlobeCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private windowRefService: WindowRefService) {}

  ngAfterViewInit(): void {
    this.initTypedCountries();
    this.initEarthGlobe();
  }

  initTypedCountries(): void {
    if(this.windowRefService.windowRef) {
      new Typed(`#typed-text-value`, {
        strings: this.countriesStringArray,
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 2000,
        cursorChar: '<i class="fa-solid fa-square"></i>',
        loop: true
      });
    }
  }

  initEarthGlobe(): void {
    if(this.windowRefService.windowRef) {
      const earthGlobe = new EarthGlobe(this.earthGlobeCanvas.nativeElement);
      earthGlobe.init();
    }
  }
}

class EarthGlobe {
  private canvas: HTMLCanvasElement;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  private renderer: THREE.WebGLRenderer;
  private sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
  private rotationSpeed = 0.003;
  private texturePath = 'assets/images/earth-texture.jpg';
  private textureLoader = new THREE.TextureLoader();
  private texture: THREE.Texture;
  private material: THREE.MeshBasicMaterial;
  private sphereMesh: THREE.Mesh;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.texture = this.textureLoader.load(this.texturePath);
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.material);
  }

  init() {
    this.setSceneBackground();
    this.setRendererSize();
    this.addSphereToScene();
    this.setCameraPosition();
    this.addEventWindowResize();
    this.animate();
  }

  private setSceneBackground() {
    this.scene.background = new THREE.Color('#050218');
  }

  private setRendererSize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private addSphereToScene() {
    this.scene.add(this.sphereMesh);
  }

  private setCameraPosition() {
    this.camera.position.z = 14;
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.sphereMesh.rotation.y += this.rotationSpeed;
    this.renderer.render(this.scene, this.camera);
  }

  private addEventWindowResize() {
    window.addEventListener('resize', () => {
      this.setRendererSize();
    });
  }
}