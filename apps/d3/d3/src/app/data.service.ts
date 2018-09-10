import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public data =
    {
      name: 'main goal',
      // value: 10,
      children: [
        {
          name: 'goal name 1',
          value: 5,
          children: [
            {
              name: 'goal name 1-1',
              value: 5
            },
            {
              name: 'goal name 1-2',
              value: 1,
              children: [
                {
                  name: 'goal name 1-2-1',
                  value: 1
                }
              ]
            },
            {
              name: 'goal name 1-3',
              value: 2
            }
          ]
        },
        {
          name: 'goal name 2',
          value: 3,
          children: [
            {
              name: 'goal name 2-1',
              value: 10
            }
          ]
        },
        {
          name: 'goal name 3',
          value: 2,
          children: [
            {
              name: 'goal name 3-1',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: 'goal name 3-2',
              value: 12
            }
          ]
        }
      ]
    }


}
