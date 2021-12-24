import * as React from 'react';
import RangePicker from "../RangePicker";
import moment from "moment";

import USAIcon from '../../assets/usa.svg';
import {ReactComponent as CalendarIcon} from '../../assets/calendar.svg';
import {ReactComponent as AngleSingleLeft} from "../../assets/ic_angle-left.svg";
import {ReactComponent as AngleSingleRight} from "../../assets/ic_angle-right.svg";
import styles from './styles.module.scss';


const Search = () => {
  const [date, setDate] = React.useState({
    from: null,
    to: null,
    enteredTo: null,
  });
  const [showPicker, setShowPicker] = React.useState(false);
  const [rangeRef, setRef] = React.useState(null);
  const intervalLength = moment(date.to).diff(date.from);
  const pickerWrapperRef = React.useRef(null);

  const isNavigatePossible = (type, prev = true) => {
    const amount = prev ? 1 : -1;
    const subtracted = moment(rangeRef?.state.currentMonth)
      .subtract(amount, type);

    return prev ?
      subtracted.isAfter(moment('04.01.2017'))
      : subtracted.isBefore(Date.now());
  };

  const nextMonth = () => {
    if (rangeRef && isNavigatePossible('months', false)) {
      rangeRef.showNextMonth();
    }
  };

  const previousMonth = () => {
    if (rangeRef && isNavigatePossible('months', true)) {
      rangeRef.showPreviousMonth();
    }
  };

  const backForward = (decrement = true) => {
    if (date.from) {
      const msInDay = 86400000;
      const newFrom = moment(date.from)
        .subtract(decrement ? intervalLength || msInDay : -intervalLength || -msInDay, 'milliseconds')
        .toDate();
      const newTo = moment(date.to)
        .subtract(decrement ? intervalLength || msInDay : -intervalLength || -msInDay, 'milliseconds')
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

  const showDate = () => {
    if (!date.from && !date.to) return 'Today';
    if (date.from && date.to && moment(date.from).isSame(date.to)) {
      if (moment(date.from).isSame(Date.now(), 'day')) {
        return 'Today';
      } else {
        return moment(date.from).format('MMM DD, YYYY');
      }
    }
    return `${moment(date.from).format('MMM DD, YYYY')} 
    ${date.to ? ' - ' + moment(date.to).format('MMM DD, YYYY') : ''}`;
  };

  const outsideClicker = ({ target }) => {
    if (pickerWrapperRef?.current
      && !pickerWrapperRef.current.contains(target)
      && !rangeRef?.dayPicker?.contains(target)) {
      setShowPicker(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', outsideClicker);
    return () => {
      document.removeEventListener('click', outsideClicker);
    };
  }, []);

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
          <div className={styles.date} ref={pickerWrapperRef}>
            <CalendarIcon/>
            <span onClick={() => setShowPicker(!showPicker)}>
              {showDate()}
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
