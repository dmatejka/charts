import { Component } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styles: ['.demo-chart { height: 800px}']
})
export class AppComponent {
  data = [
    {
      name: 'main goal',
      children: [
        {
          name: 'goal name',
          value: 15,
          children: [
            {
              name: 'goal name',
              value: 5
            },
            {
              name: 'goal name',
              value: 7,
              children: [
                {
                  name: 'goal name',
                  value: 7
                }
              ]
            },
            {
              name: 'goal name',
              value: 3
            }
          ]
        },
        {
          name: 'goal name',
          children: [
            {
              name: 'goal name',
              value: 4
            }
          ]
        },
        {
          name: 'goal name',
          value: 10,
          children: [
            {
              name: 'goal name',
              value: 7,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: 'goal name',
              value: 3
            }
          ]
        }
      ]
    },

  ];

  // CHART options
  chartOption = {
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 10,
      inRange: {
        color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
      }
    },
    series: {
      type: 'sunburst',
      data: this.data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  };
}
