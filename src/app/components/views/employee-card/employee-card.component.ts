import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})

export class EmployeeCardComponent implements AfterViewInit {

  @ViewChild('employeeCard') employeeCard!: ElementRef;

  height!: number;
  width!: number;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const nativeElement = this.employeeCard.nativeElement;
    this.height = nativeElement.clientHeight;
    this.width = nativeElement.clientWidth;
    this.addMouseEvents();
  }

  addMouseEvents(): void {
    const card = this.employeeCard.nativeElement;

    this.renderer.listen(card, 'mousemove', (event) => {
      requestAnimationFrame(() => {
        const xVal = event.layerX;
        const yVal = event.layerY;
        const yRotation = 20 * ((xVal - this.width / 2) / this.width);
        const xRotation = -20 * ((yVal - this.height / 2) / this.height);
        const transformString = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        this.renderer.setStyle(card, 'transform', transformString);
      });
    });

    this.renderer.listen(card, 'mouseout', () => {
      const transformString = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
      this.renderer.setStyle(card, 'transform', transformString);
    });

    this.renderer.listen(card, 'mousedown', () => {
      const transformString = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
      this.renderer.setStyle(card, 'transform', transformString);
    });

    this.renderer.listen(card, 'mouseup', () => {
      const transformString = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
      this.renderer.setStyle(card, 'transform', transformString);
    });
  }
}