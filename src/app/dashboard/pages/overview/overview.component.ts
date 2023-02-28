import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {

  basicData: any;
  multiAxisData: any;
  horizontalOptions: any;
  basicOptions: any;
  multiAxisOptions: any;

  ngOnInit(): void {

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: [
          '#EC407A',
          '#AB47BC',
          '#42A5F5',
          '#7E57C2',
          '#66BB6A',
          '#FFCA28',
          '#26A69A'
        ],
        yAxisID: 'y',
        data: [65, 59, 80, 81, 56, 55, 10]
      }, {
        label: 'Dataset 2',
        backgroundColor: '#78909C',
        yAxisID: 'y1',
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    this.multiAxisOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        },
        tooltips: {
          mode: 'index',
          intersect: true
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: '#ebedef'
          },
          ticks: {
            min: 0,
            max: 100,
            color: '#495057'
          }
        }
      }
    };
  }

}
