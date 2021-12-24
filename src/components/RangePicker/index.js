import * as React from 'react';
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import { ReactComponent as AngleSingleLeft } from '../../assets/ic_angle-left.svg'
import AngleDoubleLeft from '../../assets/ic_angle_double_left.svg';
import AngleSingleRight from '../../assets/ic_angle-right.svg'
import AngleDoubleRight from '../../assets/ic_angle_double_right.svg';
import 'react-day-picker/lib/style.css';
import styles from './styles.module.scss';
import './picker.scss';


const RangePicker = (
  {
    date,
    setDate,
    rangeRef,
    setRef,
    nextMonth,
    previousMonth,
    isNavigatePossible,
    closePicker,
  }) => {
  const selectedDays = [date.from, { from: date.from, to: date.enteredTo }];
  const modifiers = { start: date.from, end: date.enteredTo };
  const lifeTime = moment('04.04.2017').toDate();

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
      from: moment().subtract(1, 'days').toDate(),
      to: null,
      enteredTo: null,
    })
  };

  const setRange = (days) => () => {
    setDate({
      from: moment().subtract(days, 'days').toDate(),
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    });
    closePicker();
  };

  const setLastRange = (type = 'month') => () => {
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
      from: moment('04.04.2017').toDate(),
      to: moment().toDate(),
      enteredTo: moment().toDate(),
    });
    closePicker();
  };

  const nextYear = () => {
    if (rangeRef && isNavigatePossible('years', false)) {
      rangeRef.showNextYear();
    }
  };

  const previousYear = () => {
    if (rangeRef && isNavigatePossible('years', true)) {
      rangeRef.showPreviousYear();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.picker}>
          <div className={styles.angles}>
            <div>
              <AngleSingleLeft onClick={previousMonth} />
              <img onClick={previousYear} src={AngleDoubleLeft} alt="angle" />
            </div>
            <div>
              <img className={moment(rangeRef?.state.currentMonth).subtract(-1, "years").isBefore(Date.now()) ? 'disabledAngle' : ''} onClick={nextYear} src={AngleDoubleRight} alt="angle" />
              <img onClick={nextMonth} src={AngleSingleRight} alt="angle" />
            </div>
          </div>
          <DayPicker
            ref={ref => setRef(ref)}
            enableOutsideDaysClick={true}
            className="range"
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
        <div className={styles.fastSelect}>
          <ul>
            <li onClick={setToday}>Today</li>
            <li onClick={setYesterday}>Yesterday</li>
            <li onClick={setRange(6)}>Last 7 days</li>
            <li onClick={setRange(29)}>Last 30 days</li>
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
