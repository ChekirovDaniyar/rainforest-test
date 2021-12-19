import * as React from 'react';
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import AngleSingleLeft from '../../assets/ic_angle-left.svg'
import AngleDoubleLeft from '../../assets/ic_angle_double_left.svg';
import AngleSingleRight from '../../assets/ic_angle-right.svg'
import AngleDoubleRight from '../../assets/ic_angle_double_right.svg';
import 'react-day-picker/lib/style.css';
import styles from './styles.module.scss';
import './picker.scss';


const RangePicker = ( { date, setDate, rangeRef, nextMonth, previousMonth }) => {
  const selectedDays = [date.from, { from: date.from, to: date.enteredTo }];
  const modifiers = { start: date.from, end: date.enteredTo };

  const isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  const dayClick = (day, modifiers = {}) => {
    const { from, to } = date;
    if (modifiers.disabled) {
      return
    }
    if (from && to && day >= from && day <= to) {
      setDate({
        from: null,
        to: null,
        enteredTo: null,
      });
      return
    }
    if (isSelectingFirstDay(from, to, day)) {
      setDate({
        from: day,
        to: null,
        enteredTo: null,
      });
      return
    }
    setDate({
      from,
      to: day,
      enteredTo: day,
    });
  };

  const dayMouseEnter = (day) => {
    const { from, to } = date;
    if (!isSelectingFirstDay(from, to, day)) {
      setDate({
        ...date,
        enteredTo: day,
      });
    }
  };

  const setToday = () => {
    dayClick(moment().toDate(), modifiers);
  };

  const setRange = (days) => () => {
    setDate({
      from: moment().subtract(days, 'days').toDate(),
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    });
  };

  const setLastRange = (type = 'month') => () => {
    const start = moment().startOf(type).toDate();
    const end = moment().toDate();
    setDate({
      from: start,
      to: end,
      enteredTo: end,
    });
  };

  const setLifetime = () => {
    setDate({
      from: moment('04.04.2017').toDate(),
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    });
  };

  const nextYear = () => {
    rangeRef.current && rangeRef.current.showNextYear();
  };

  const previousYear = () => {
    rangeRef.current && rangeRef.current.showPreviousYear();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.picker}>
          <div className={styles.angles}>
            <div>
              <img onClick={previousMonth} src={AngleSingleLeft} alt="angle" />
              <img onClick={previousYear} src={AngleDoubleLeft} alt="angle" />
            </div>
            <div>
              <img onClick={nextYear} src={AngleDoubleRight} alt="angle" />
              <img onClick={nextMonth} src={AngleSingleRight} alt="angle" />
            </div>
          </div>
          <DayPicker
            ref={rangeRef}
            className="range"
            selectedDays={selectedDays}
            onDayClick={(day, modifiers) => dayClick(day, modifiers)}
            modifiers={modifiers}
            onDayMouseEnter={dayMouseEnter}
            numberOfMonths={2}
            disabledDays={{
              after: moment().toDate(),
              before: moment('04.04.2017').toDate()
            }}
          />
        </div>
        <div className={styles.fastSelect}>
          <ul>
            <li onClick={setToday}>Today</li>
            <li onClick={setRange(1)}>Yesterday</li>
            <li onClick={setRange(7)}>Last 7 days</li>
            <li onClick={setRange(30)}>Last 30 days</li>
            <li onClick={setLastRange('month')}>Last Month</li>
            <li onClick={setLastRange('year')}>This Year</li>
            <li onClick={setLifetime}>Lifetime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RangePicker;
