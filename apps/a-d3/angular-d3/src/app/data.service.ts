import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public data =
 [
        {
          name: 'goal 1',
          value: 5,
          color: '#4dd0e1'
          },
        {
          name: 'goal 2',
          value: 3,
          color: '#26c6da'
        },
        {
          name: 'goal 3',
          value: 2,
          color: '#00bcd4'
        },
        {
          name: 'goal 4',
          value: 2,
          color: '#00acc1'
        },
        {
          name: 'goal 5',
          value: 2,
          color: '#0097a7'
        }
      ]

}
