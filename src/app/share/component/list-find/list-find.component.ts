import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { dsf } from './json'
import { ChineseToPinyinService } from './service/chineseToPinyin.service';
@Component({
  selector: 'list-find',
  templateUrl: './list-find.component.html',
  styleUrls: ['./list-find.component.scss'],
  providers: [dsf, ChineseToPinyinService]
})
export class ListFindComponent implements OnInit {

  constructor(
    private _d: dsf,
    private ctp: ChineseToPinyinService
  ) { }
  _searchPlaceholder = '请输入关键字搜索';
  searchDate;

  @Input() selection: Object = [];

  ngOnInit() {
    // console.log(this.selection)
    // console.log(this._d.sd);
    // let _options = [];
    // for (var item in this._d.sd) {

    //   _options.push({
    //     chekced: false,
    //     name: this._d.sd[item],
    //     value: item
    //   })
    // }
    // this.selection = _options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selection) {
      let selecteOptions = changes.selection;
      // console.log(this.selection)
      if (selecteOptions.currentValue instanceof Array) {
        // 拼音搜索
        for (let i = 0; i < selecteOptions.currentValue.length; i++) {
          selecteOptions.currentValue[i].spell = this.ctp.ConvertPinyin({ chinas: selecteOptions.currentValue[i][this._antLabel] });
          selecteOptions.currentValue[i].first = this.ctp.ConvertPinyin({ chinas: selecteOptions.currentValue[i][this._antLabel], first: true });
        }
        this._selecteOptions = selecteOptions.currentValue;
        this.options = selecteOptions.currentValue;
        this.filterSpecificOption = selecteOptions.currentValue.slice(0, 10);
        this.total();
        this.resetTagsOptions();
      }
      // this._isload = false;
    }
  }
  _isload = true;
  _tagsOptions = [];
  _selecteOptions = [];
  _antValue: string;
  antSelectValue: any;
  filterSpecificOption: Object[];
  _NotFoundContent = '无法找到';
  resetTagsOptions() {
    this._tagsOptions = [];
    if (this._selecteOptions.length > 0) {
      if (this.antSelectValue) {
        if (this.antSelectValue instanceof Array && this.antSelectValue.length > 0) {
          this.antSelectValue.forEach(item => {
            this._selecteOptions.forEach(i => {
              if (item === i[this._antValue]) {
                this._tagsOptions.push(i);
              }
            });
          });
        } else {
          this._selecteOptions.forEach(i => {
            if (this.antSelectValue === i[this._antValue]) {
              this._tagsOptions.push(i);
            }
          });
        }
      }
    }
  }
  /**
   * 搜索
   */
  options;
  curNum: number;
  _total: Number;
  _searchData(text) {
    this.options = this._selecteOptions;
    let resultArr = this.screenData(text);
    this.curNum = 1;
    if (resultArr.length) {
      // this.options = resultArr;
      this.selection = resultArr;
      this.total();
      this.filterData();
      return;
    } else {
      this.selection = [];
    }
    this.options = [{ content: this._NotFoundContent, nzDisabled: true }];
    this._total = 0;
    this.filterData();
  }
  total() {
    this._total = Math.ceil(this.options.length / 10);
  }
  filterData() {
    if (this.curNum === this._total) {
      this.filterSpecificOption = this.options.slice((this.curNum - 1) * 10);
      return;
    }
    this.filterSpecificOption = this.options.slice((this.curNum - 1) * 10, this.curNum * 10);
  }
  _antLabel: string = 'name';
  screenData(text): any[] {
    let resultArr = [];
    this.options.forEach((item, index, arr) => {
      if (item[this._antLabel].indexOf(text) > -1 || item['spell'].indexOf(text) > -1 || item['first'].indexOf(text) > -1) {
        resultArr.push(item);
      }
    })
    // console.log(resultArr)
    return resultArr;
  }

  log(e: any, $event) {
    console.log(e, $event)
  }
}
