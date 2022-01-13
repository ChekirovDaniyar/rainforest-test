import * as React from 'react';
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";

import AngleDoubleLeft from '../../assets/ic_angle_double_left.svg';
import AngleDoubleRight from '../../assets/ic_angle_double_right.svg';
import { AngleLeft, AngleRight } from "../angles";
import { subtractDate } from "../../utils/datepicker";
import 'react-day-picker/lib/style.css';
import './picker.scss';


const RangePicker = (
  {
    date,
    setDate,
    rangeRef,
    nextMonth,
    previousMonth,
    isNavigatePossible,
    closePicker,
  }) => {
  const selectedDays = [date.from, { from: date.from, to: date.enteredTo }];
  const modifiers = { start: date.from, end: date.enteredTo };
  const lifeTime = moment('04.04.2017').toDate();
  const daysStr = 'days';
  const monthStr = 'month';
  const yearsStr = 'years';
  const selectRangeClassnames = 'text-left pointer select-none py-[10px]';

  const dayClick = (day, modifiers = {}) => {
    const { from, to } = date;
    if (modifiers.disabled) {
      return
    }
    if ((from && to) || (!from && !to)) {
      setDate({
        from: day,
        to: null,
        enteredTo: null,
      });
      return
    }
    if (from && DateUtils.isDayBefore(day, from)) {
      setDate({
        from: day,
        to: from,
        enteredTo: from,
      });
      closePicker();
      return
    }
    setDate({
      from,
      to: day,
      enteredTo: day,
    });
    closePicker();
  };

  const setToday = () => {
    setDate({
      from: moment().toDate(),
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    })
  };

  const setYesterday = () => {
    setDate({
      from: subtractDate(1, daysStr, Date.now()).toDate(),
      to: null,
      enteredTo: null,
    })
  };

  const setRange = (days) => () => {
    setDate({
      from: subtractDate(days, daysStr, Date.now()).toDate(),
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    });
    closePicker();
  };

  const setLastRange = (type = monthStr) => () => {
    const start = moment().startOf(type).toDate();
    const end = moment().toDate();
    setDate({
      from: start,
      to: end,
      enteredTo: end,
    });
    closePicker();
  };

  const setLifetime = () => {
    setDate({
      from: lifeTime,
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    });
    closePicker();
  };

  const nextYear = () => {
    if (rangeRef && isNavigatePossible(yearsStr, false)) {
      rangeRef.current?.showNextYear();
    }
  };

  const previousYear = () => {
    if (rangeRef && isNavigatePossible(yearsStr, true)) {
      rangeRef.current?.showPreviousYear();
    }
  };

  return (
    <div className="bg-white absolute shadow-md right-0 min-w-[750px] top-[110%]">
      <div className="flex content-center relative max-w-[700px] relative w-full">
        <div className="relative">

          <div className="w-11/12 absolute top-6 left-5 flex justify-between z-10">
            <div className="flex">
              <AngleLeft onClick={previousMonth} />
              <img onClick={previousYear} src={AngleDoubleLeft} alt="angle" />
            </div>
            <div className="flex">
              <AngleRight onClick={nextMonth} />
              <img onClick={nextYear} src={AngleDoubleRight} alt="angle" />
            </div>
          </div>

          <DayPicker
            ref={rangeRef}
            enableOutsideDaysClick={true}
            className="range p-0.8"
            selectedDays={selectedDays}
            onDayClick={(day, modifiers) => dayClick(day, modifiers)}
            modifiers={modifiers}
            numberOfMonths={2}
            initialMonth={date?.from}
            disabledDays={{
              after: moment().toDate(),
              before: lifeTime,
            }}
          />

        </div>

        <div className="h-full border-l-1 border-#b6bbcd">
          <ul>
            <li className={selectRangeClassnames} onClick={setToday}>Today</li>
            <li className={selectRangeClassnames} onClick={setYesterday}>Yesterday</li>
            <li className={selectRangeClassnames} onClick={setRange(6)}>Last 7 days</li>
            <li className={selectRangeClassnames} onClick={setRange(29)}>Last 30 days</li>
            <li className={selectRangeClassnames} onClick={setLastRange(monthStr)}>Last Month</li>
            <li className={selectRangeClassnames} onClick={setLastRange('year')}>This Year</li>
            <li className={selectRangeClassnames} onClick={setLifetime}>Lifetime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RangePicker;
