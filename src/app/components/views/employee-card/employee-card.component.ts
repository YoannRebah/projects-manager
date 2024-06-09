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

    this.addEventMouseMove();
    this.addEventMouseOut();
    this.addEventMouseDown();
    this.addEventMouseUp();
  }

  addEventMouseMove(): void {
    this.renderer.listen(this.employeeCard.nativeElement, 'mousemove', (event) => this.handleMove(event));
  }

  handleMove(event: MouseEvent): void {
    const xVal = event.layerX;
    const yVal = event.layerY;
    const yRotation = 20 * ((xVal - this.width / 2) / this.width);
    const xRotation = -20 * ((yVal - this.height / 2) / this.height);
    const transformString = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    this.renderer.setStyle(this.employeeCard.nativeElement, 'transform', transformString);
  }

  addEventMouseOut(): void {
    this.renderer.listen(this.employeeCard.nativeElement, 'mouseout', () => this.handleMouseOut());
  }

  handleMouseOut(): void {
    const transformString = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
    this.renderer.setStyle(this.employeeCard.nativeElement, 'transform', transformString);
  }

  addEventMouseDown(): void {
    this.renderer.listen(this.employeeCard.nativeElement, 'mousedown', () => this.handleMouseDown());
  }

  handleMouseDown(): void {
    const transformString = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
    this.renderer.setStyle(this.employeeCard.nativeElement, 'transform', transformString);
  }

  addEventMouseUp(): void {
    this.renderer.listen(this.employeeCard.nativeElement, 'mouseup', () => this.handleMouseUp());
  }

  handleMouseUp(): void {
    const transformString = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
    this.renderer.setStyle(this.employeeCard.nativeElement, 'transform', transformString);
  }
}