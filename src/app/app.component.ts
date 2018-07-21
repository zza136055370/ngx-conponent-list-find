import { Component } from '@angular/core';
import { dsf } from './share/component/list-find/json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [dsf]
})
export class AppComponent {
  title = 'app';
  name = 'angular';

  constructor(
    private _d: dsf,
  ) { }
  log(value: string[]): void {
    console.log(value);
  }
  options;
  ngOnInit() {
    let _options = [];
    for (var item in this._d.sd) {

      _options.push({
        chekced: false,
        name: this._d.sd[item],
        value: item,
        //disabled: true
      })
    }
    this.options = _options;
  }
}
