"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_toaster_1 = require("angular2-toaster");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var angular_l10n_1 = require("angular-l10n");
var core_1 = require("@angular/core");
var app_component_infrastructure_1 = require("../../../../../shared/infrastructure/app.component.infrastructure");
var moment = require("jalali-moment");
var _ = require("lodash");
var MonthViewComponent = (function (_super) {
    __extends(MonthViewComponent, _super);
    function MonthViewComponent(locale, translation, title, router, toaster) {
        var _this = _super.call(this, locale, translation, title, router) || this;
        _this.locale = locale;
        _this.translation = translation;
        _this.title = title;
        _this.router = router;
        _this.toaster = toaster;
        _this.selectedDates = [];
        _this.onSelectDate = new core_1.EventEmitter();
        _this.currentDate = moment();
        _this.todayJalali = moment();
        _this.dayNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
        _this.weeks = [];
        _this.weeksA = [];
        _this.sortedDates = [];
        return _this;
        //moment.locale('fa');
    }
    // displayDate: any = moment().format('jYYYY/jM/jD');
    MonthViewComponent.prototype.ngOnInit = function () {
        var diffYear = this.year - this.todayJalali.jYear();
        if (this.month)
            this.currentDate = moment(this.todayJalali.jYear() + "/" + this.month + "/1", "jYYYY/jM/jD");
        else
            this.currentDate = moment();
        if (diffYear != 0)
            this.currentDate = moment(this.currentDate).add(diffYear, 'jYear');
        this.generateCalendar();
    };
    MonthViewComponent.prototype.ngOnChanges = function (changes) {
        if (changes.selectedDates &&
            changes.selectedDates.currentValue &&
            changes.selectedDates.currentValue.length > 1) {
            // sort on date changes for better performance when range checking
            this.sortedDates = _.sortBy(changes.selectedDates.currentValue, function (m) { return m.mDate.valueOf(); });
            this.generateCalendar();
        }
    };
    // date checkers
    MonthViewComponent.prototype.isToday = function (date) {
        return moment().isSame(moment(date), 'jDay');
    };
    MonthViewComponent.prototype.isSelected = function (date) {
        return _.findIndex(this.selectedDates, function (selectedDate) {
            return moment(date).isSame(selectedDate.mDate, 'jDay');
        }) > -1;
    };
    MonthViewComponent.prototype.isHoliday = function (date) {
        return date.jDay() == 6;
    };
    MonthViewComponent.prototype.isSelectedMonth = function (date) {
        return moment(date).isSame(this.currentDate, 'jMonth');
    };
    MonthViewComponent.prototype.selectDate = function (date) {
        this.onSelectDate.emit(date);
    };
    // actions from calendar
    MonthViewComponent.prototype.prevMonth = function () {
        this.currentDate = moment(this.currentDate).subtract(1, 'months');
        this.generateCalendar();
    };
    MonthViewComponent.prototype.nextMonth = function () {
        this.currentDate = moment(this.currentDate).add(1, 'months');
        this.generateCalendar();
    };
    MonthViewComponent.prototype.firstMonth = function () {
        this.currentDate = moment(this.currentDate).startOf('year');
        this.generateCalendar();
    };
    MonthViewComponent.prototype.lastMonth = function () {
        this.currentDate = moment(this.currentDate).endOf('year');
        this.generateCalendar();
    };
    MonthViewComponent.prototype.prevYear = function () {
        this.currentDate = moment(this.currentDate).subtract(1, 'year');
        this.generateCalendar();
    };
    MonthViewComponent.prototype.nextYear = function () {
        this.currentDate = moment(this.currentDate).add(1, 'year');
        this.generateCalendar();
    };
    // generate the calendar grid
    MonthViewComponent.prototype.generateCalendar = function () {
        var dates = this.fillDates(this.currentDate);
        var weeks = [];
        while (dates.length > 0) {
            weeks.push(dates.splice(0, 7));
        }
        this.weeks = weeks;
    };
    MonthViewComponent.prototype.fillDates = function (currentMoment) {
        var _this = this;
        var firstOfMonthJ = moment(currentMoment).startOf('jMonth').jDay(); //دریافت اولین روز هفته در ماه که 0 = شنبه و 6=جمعه
        var firstDayOfGridJ = moment(currentMoment).startOf('jMonth').subtract(firstOfMonthJ, 'days'); //دریافت آخرین شنبه هفته شروع ماه قبل 
        var start = firstDayOfGridJ.jDate(); // دریافت تاریخ روز شروع ماه قبل 
        return _.range(start, start + 42) //شروع از تاریخ شروع ماه قبل تا 42 روز بعد برای نمایش 6 هفته  
            .map(function (date) {
            var d = moment(firstDayOfGridJ).jDate(date);
            return {
                today: _this.isToday(d),
                selected: _this.isSelected(d),
                mDate: d,
            };
        });
    };
    return MonthViewComponent;
}(app_component_infrastructure_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MonthViewComponent.prototype, "selectedDates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthViewComponent.prototype, "onSelectDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthViewComponent.prototype, "month", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MonthViewComponent.prototype, "year", void 0);
MonthViewComponent = __decorate([
    core_1.Component({
        selector: "month-view",
        providers: [],
        templateUrl: "./month-view.component.html",
        styleUrls: ["./month-view-component.min.css"]
    }),
    __metadata("design:paramtypes", [angular_l10n_1.LocaleService, angular_l10n_1.TranslationService,
        platform_browser_1.Title, router_1.Router, angular2_toaster_1.ToasterService])
], MonthViewComponent);
exports.MonthViewComponent = MonthViewComponent;
//# sourceMappingURL=monthView.component.js.map