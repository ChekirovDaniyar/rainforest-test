import * as React from 'react';
import RangePicker from "../RangePicker";
import moment from "moment";

import USAIcon from '../../assets/usa.svg';
import {ReactComponent as CalendarIcon} from '../../assets/calendar.svg';
import styles from './styles.module.scss';
import {ReactComponent as AngleSingleLeft} from "../../assets/ic_angle-left.svg";
import {ReactComponent as AngleSingleRight} from "../../assets/ic_angle-right.svg";


const Search = () => {
  const [date, setDate] = React.useState({
    from: null,
    to: null,
    enteredTo: null,
  });
  const [showPicker, setShowPicker] = React.useState(false);
  const [rangeRef, setRef] = React.useState(null);
  const intervalLength = moment(date.to).diff(date.from)

  const nextMonth = () => {
    rangeRef && rangeRef.showNextMonth();
  };

  const previousMonth = () => {
    rangeRef && rangeRef.showPreviousMonth();
  };

  const backForward = (decrement = true) => {
    if (date.from && date.to) {
      const millisecondsInDay = 86400000;
      const newFrom = moment(date.from)
        .subtract(decrement ? intervalLength || millisecondsInDay : -intervalLength || -millisecondsInDay, 'milliseconds')
        .toDate();
      const newTo = moment(date.to)
        .subtract(decrement ? intervalLength || millisecondsInDay : -intervalLength || -millisecondsInDay, 'milliseconds')
        .toDate()
      if (moment(newTo).isBefore(Date.now()) && moment(newFrom).isAfter(moment('04.04.2017').toDate())) {
        setDate({
          from: newFrom,
          to: newTo,
          enteredTo: moment(date.to).subtract(decrement ? intervalLength : -intervalLength, 'milliseconds').toDate(),
        });
      }
    }
  };
  console.log(moment(date.to)
    .subtract(intervalLength, 'milliseconds')
    .isBefore(Date.now()))
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.inputWrapper}>
            <img src={USAIcon} alt="usa"/>
            <input
              type="text"
              placeholder="Search by Brand, Product, SKU, ASIN"
            />
          </div>
          <div className={styles.date}>
            {/*<img src={CalendarIcon} alt="calendar"/>*/}
            <CalendarIcon/>
            <span onClick={() => setShowPicker(!showPicker)}>
              {date.from ? moment(date.from).format('MMM DD, YYYY') : 'Today'}
              {date.to && ' - ' + moment(date.to).format('MMM DD, YYYY')}
            </span>
            <div>
              <AngleSingleLeft
                className={
                  !date.from ||
                  !moment(date.from)
                    .subtract(intervalLength, 'milliseconds')
                    .isAfter(moment('04.04.2017').toDate()) ? styles.disabledAngle : ''
                }
                onClick={() => backForward(true)}
              />
              <AngleSingleRight
                className={!date.to ||
                !moment(date.to)
                  .subtract(-intervalLength, 'milliseconds')
                  .isBefore(Date.now()) ? styles.disabledAngle : ''}
                onClick={() => backForward(false)}
              />
            </div>
            {showPicker && (
              <RangePicker
                date={date}
                setDate={setDate}
                rangeRef={rangeRef}
                nextMonth={nextMonth}
                previousMonth={previousMonth}
                setRef={setRef}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
