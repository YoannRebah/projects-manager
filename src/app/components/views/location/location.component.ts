import { Component, ElementRef, OnInit, AfterViewInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../../shared/models/location';
import Typed from 'typed.js';
import * as THREE from 'three';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit, AfterViewInit {
  iconCheckClassNames = "fa-solid fa-check";
  iconUncheckClassNames = "fa-solid fa-xmark";
  typedStringArray: string[] = ["????", "UNKNOWN_CITY", "NETWORK_FAILED", "ERROR_6005"]; 
  locationList: Location[] = [
    {
      iconClassNames: this.iconCheckClassNames,
      key: "Pays",
      value: "France"
    },
    {
      iconClassNames: this.iconCheckClassNames,
      key: "Région",
      value: "Île-de-France"
    },
    {
      iconClassNames: this.iconCheckClassNames,
      key: "Département",
      value: "Essonne"
    },
    {
      iconClassNames: this.iconUncheckClassNames,
      key: "Ville",
      tempRefVar: "typedElement"
    }
  ];

  @ViewChildren('typedElement') typedElements!: QueryList<ElementRef>;
  @ViewChild('earthGlobe', { static: true }) earthGlobeCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.typedElements.forEach((element) => {
        new Typed(
          element.nativeElement,
          {
            strings: this.typedStringArray,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            cursorChar: '<i class="fa-solid fa-square"></i>',
            loop: true
          }
        );
      });
    };
    if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
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
    this.scene.background = new THREE.Color('#03010f');
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