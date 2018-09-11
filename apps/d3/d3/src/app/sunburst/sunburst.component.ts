import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as ds from '../data.service';
// import { tap } from 'rxjs/operators';

@Component({
  selector: 'charts-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.css']
})
export class SunburstComponent implements OnInit {
  private arc: any;
  private color: any;
  private created: boolean;
  private height: number;
  private margin: number;
  private partition: any;
  private radius: number;
  private root: any;
  private svg: any;
  private tooltip: any;
  private width: number;
  private xScale: any;
  private yScale: any;

  constructor(public data: ds.DataService) {}
  @ViewChild('chart') private chartContainer: ElementRef;

  /**
   * mouseoverArc: shows tooltip dive when mouse moves over arc.
   * sets tooltip's html with helper function.
   * @param d: the current arc.
   * @returns {*}
   */
  mouseoverArc(d: any): any {
    this.tooltip.html(this.tooltipHTML(d));
    return this.tooltip
      .transition()
      .duration(50)
      .style('opacity', 0.9);
  }

  /**
   * mouseoutArc: hides tooltip div when mouse moves out of arcs.
   * @returns {*}
   */
  mouseoutArc(): any {
    return this.tooltip.style('opacity', 0);
  }

  /**
   * mousemoveArc: moves tooltip div as mouse moves over arcs.
   * @returns {*}
   */
  mousemoveArc(): any {
    return this.tooltip
      .style('top', d3.event.pageY - 10 + 'px')
      .style('left', d3.event.pageX + 10 + 'px');
  }

  /**
   * computeTextRotation: Modify the orientation of category labels.
   * @returns Number
   */
  //
  computeTextRotation(d): Number {
    const angle = (d.x0 + d.x1) * 180;

    // Avoid upside-down labels; labels as rims
    return angle < 120 || angle > 270 ? angle : angle + 180;
    // return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
  }

  ngOnInit() {
    this.created = false;

    this.margin = 10;
    this.createChart();
    this.updateChart(this.data.data);
  }

  // Creating base for chart
  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin * 2;
    this.height = element.offsetHeight - this.margin * 2;
    this.radius = Math.min(this.width, this.height) / 2 - this.margin * 2;

    /* create svg */
    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );

    /* create tooltip div */
    this.tooltip = d3
      .select(element)
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('opacity', 0)
      .style('background-color', 'rgba(255, 255, 255, 0.6)')
      .style('padding', '5px 10px');

    /* set up scales */
    this.xScale = d3.scaleLinear().range([0, 2 * Math.PI]);
    this.yScale = d3.scaleLinear().range([0, this.radius]);
    this.color = d3.scaleOrdinal(d3.schemeBlues[9]);

    /* layout */
    this.partition = d3.partition();

    /* arc function for calculating slices of sunburst */
    this.arc = d3
      .arc()
      .startAngle((d: any) =>
        Math.max(0, Math.min(2 * Math.PI, this.xScale(d['x0'])))
      )
      .endAngle((d: any) =>
        Math.max(0, Math.min(2 * Math.PI, this.xScale(d['x1'])))
      )
      .innerRadius((d: any) => Math.max(0, this.yScale(d['y0'])))
      .outerRadius((d: any) => Math.max(0, this.yScale(d['y1'])));

    this.created = true;
  }

  private updateChart(tree: any): void {
    this.root = d3.hierarchy(tree);
    this.root.count(d => d.value); // sunburst portions based on number of elements
    // this.root.sum(d => d.value); // sunburst portions based on sum of element's value

    /* JOIN new data with old elements */
    const path = this.svg
      .selectAll('g')
      .data(this.partition(this.root).descendants())
      .enter()
      .append('g');

    /* ENTER new elements present in new data */
    /* UPDATE old elements present in new data */
    path
      .append('path')
      .on('mouseover', d => this.mouseoverArc(d))
      .on('mousemove', d => this.mousemoveArc())
      .on('mouseout', d => this.mouseoutArc())
      // .on('click',     (d) => this.clickArc(d))
      .merge(path) // ENTER + UPDATE
      .transition()
      .duration(500)
      .attr('d', this.arc)
      .style('stroke', '#ffffff')
      .style('fill', (d: any) => d.data.color ? d.data.color : this.color(d.depth))
      .attr('class', 'node');

    path
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', d => {
        return d.depth === 0
          ? ''
          : 'translate(' +
              this.arc.centroid(d) +
              ') rotate(' +
              this.computeTextRotation(d) +
              ')';
      })
      .text(d =>  d.data.name );

    /* EXIT old elements not present in new data */
    path
      .exit()
      .transition()
      .duration(500)
      .remove();
  }

  private tooltipHTML(d: any): string {
    return `${d.data.name}`;
  }
}
