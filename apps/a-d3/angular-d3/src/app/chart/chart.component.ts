import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { arc, pie } from 'd3-shape';

@Component({
  selector: 'charts-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  @Input() colors;
  @Input() series: any = [];
  @Input() view = [500,500];
  @Input() innerRadius = 60;
  @Input() outerRadius = 120;

  arcData: any;
  max: number;

  ngOnInit(): void {
    console.log('arcData', this.arcData)
    this.update();
  }

  update(): void {
    const pieGenerator = pie<any, any>()
      .value(d => d.value)
      .sort(null);

    this.data = pieGenerator(this.data);
    console.log('data', this.data)

    // this.max = max(arcData, d => {
    //   return d.value;
    // });
  }

  midAngle(d): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  outerArc(): any {
    const factor = 1.5;

    return arc()
      .innerRadius(this.innerRadius * factor)
      .outerRadius(this.outerRadius * factor);
  }


  color(myArc): any {
    // return this.colors.getColor(this.label(myArc));
    return "blue";
  }

  trackBy(index, item): string {
    console.log(item)
    return item.name;
  }

}
