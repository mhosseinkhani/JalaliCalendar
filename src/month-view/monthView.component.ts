import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Output, Input } from "@angular/core";
import * as moment from 'jalali-moment';
import * as _ from 'lodash';
@Component({
  selector: "month-view",
  providers: [],
  templateUrl: "./month-view.component.html",
  styleUrls: ["./month-view-component.min.css"]
})
export class MonthViewComponent  implements OnInit, OnChanges {
  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();
  @Input() month: number;
  @Input() year: number;
  constructor( ) { 
  }

  currentDate = moment();
  todayJalali = moment();
  dayNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];


  _selected: any;
  ngOnInit(): void {
    var diffYear=this.year-this.todayJalali.jYear();
      if (this.month)
        this.currentDate = moment(this.todayJalali.jYear() + "/" + this.month + "/1", "jYYYY/jM/jD");
      else
        this.currentDate = moment();
        if(diffYear!=0)
        this.currentDate = moment(this.currentDate).add(diffYear, 'jYear');
 

    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'jDay');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'jDay');
    }) > -1;
  }
  isHoliday(date:moment.Moment):boolean{
    return date.jDay()==6;
  }
  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'jMonth');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];

    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonthJ = moment(currentMoment).startOf('jMonth').jDay();//دریافت اولین روز هفته در ماه که 0 = شنبه و 6=جمعه
    const firstDayOfGridJ = moment(currentMoment).startOf('jMonth').subtract(firstOfMonthJ, 'days');//دریافت آخرین شنبه هفته شروع ماه قبل 
    const start = firstDayOfGridJ.jDate()// دریافت تاریخ روز شروع ماه قبل 
    return _.range(start, start + 42)//شروع از تاریخ شروع ماه قبل تا 42 روز بعد برای نمایش 6 هفته  
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGridJ).jDate(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };
      });
  }
}

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}


