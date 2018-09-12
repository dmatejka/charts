import { Component, Input, ElementRef, OnChanges, OnInit } from '@angular/core';
import { arc } from 'd3-shape';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'g[gs-charts-pie-arc]',
  templateUrl: './arc.component.html',
  styleUrls: ['./arc.component.css']
})
export class ArcComponent implements OnChanges, OnInit {

  @Input() startAngle = 0;
  @Input() endAngle: number = Math.PI * 2;
  @Input() innerRadius;
  @Input() outerRadius;
  @Input() cornerRadius = 0;
  @Input() value;
  @Input() data;
  @Input() color = "red";


  element: HTMLElement;
  path: any;
  initialized = false;
  private _timeout;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit(){
    this.initialized = true;
  }
  ngOnChanges(): void {
    console.log('ARC',  this.innerRadius, this.outerRadius, this.cornerRadius, this.startAngle, this.endAngle)
      this.update();
  }


  update(): void {
    const calc = this.calculateArc();
    // this.path = calc.startAngle(0).endAngle(Math.PI * 2)();
    this.path = calc.startAngle(this.startAngle).endAngle(this.endAngle)();
    console.log('path',  this.path)
  }

  calculateArc(): any {
    return arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .cornerRadius(this.cornerRadius);
  }

}
