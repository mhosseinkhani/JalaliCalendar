# JalaliCalendar
jalali calendar and month view -تقویم فارسی برای استفاده در حالت های سالانه و ماهانه

## معرفی
تقویمی برای  نمایش مناسبت ها و قرارها و اضافه کردن مناسبت و یا قرار  که نمایش تقویم جلالی داشته باشد و بتوان استفاده نمود.

## قابلیت ها
1-قابلیت  تعیین سال
2-قابلیت تعیین ماه
3-قابلیت اضافه کردن تغییر ماه و سال در حالت نمایش ماهانه
4-اضافه کردن مناسبت ها 
5-نمایش مناسبت ها در تقویم

## تنظیمات
برای استفاده کافی است که تگ زیر را در قسمت view کد کپی کرده و مقادیر زیر را مقدار دهی نمایین:
#### Angular 2 or 4
```HTML
      // بصورت نمایش سالانه
        <month-view  [month]="1" [year]="1396"></month-view>
        <month-view  [month]="2" [year]="1396"></month-view>
        <month-view  [month]="3" [year]="1396"></month-view>
        <month-view  [month]="4" [year]="1396"></month-view>
        <month-view  [month]="5" [year]="1396"></month-view>
        <month-view  [month]="6" [year]="1396"></month-view>
        <month-view  [month]="7" [year]="1396"></month-view>
        <month-view  [month]="8" [year]="1396"></month-view>
        <month-view  [month]="9" [year]="1396"></month-view>
        <month-view  [month]="10" [year]="1396"></month-view>
        <month-view  [month]="11" [year]="1396"></month-view>
        <month-view  [month]="12" [year]="1396"></month-view>
```

```HTML
      // بصورت نمایش ماهانه
        <month-view  [month]="10" [year]="1396"></month-view>
```

## خروجی 

#### نمایش ماه
![fa2](https://user-images.githubusercontent.com/7759074/34333657-53f7a948-e954-11e7-8779-2b50f35ae64a.PNG)

#### نمایش سال

![fa1](https://user-images.githubusercontent.com/7759074/34333655-48fca714-e954-11e7-9a3a-813e3a0460a5.PNG)
