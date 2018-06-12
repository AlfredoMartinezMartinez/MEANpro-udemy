import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // @Input() leyenda: any = '';
  @Input() doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: number[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input() doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
