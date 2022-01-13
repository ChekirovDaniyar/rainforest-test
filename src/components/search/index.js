import * as React from 'react';
import RangePicker from "../RangePicker";
import moment from "moment";

import USAIcon from '../../assets/usa.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { formatDate, subtractDate, checkAfter, checkBefore } from "../../utils/datepicker";
import { AngleLeft, AngleRight } from "../angles";


const Search = () => {
  const [date, setDate] = React.useState({
    from: null,
    to: null,
    enteredTo: null,
  });
  const [showPicker, setShowPicker] = React.useState(false);
  const rangeRef = React.useRef(null);
  const timeDiff = moment(date.to).diff(date.from);
  const pickerWrapperRef = React.useRef(null);
  const lifeTime =moment('04.04.2017').toDate();
  const msInDay = 86400000;
  const todayStr = 'Today';
  const msStr = 'milliseconds';
  const dayStr = 'day';
  const monthsStr = 'months';

  const isNavigatePossible = (type, prev = true) => {
    const amount = prev ? 1 : -1;
    const subtracted = subtractDate(amount, type, rangeRef.current?.state.currentMonth);

    return prev ?
      checkAfter(subtracted, lifeTime)
      : checkBefore(subtracted, Date.now());
  };

  const nextMonth = () => {
    if (rangeRef && isNavigatePossible(monthsStr, false)) {
      rangeRef.current?.showNextMonth();
    }
  };

  const previousMonth = () => {
    if (rangeRef && isNavigatePossible(monthsStr, true)) {
      rangeRef.current?.showPreviousMonth();
    }
  };

  const shiftDate = (decrement = true) => {
    if (date.from) {
      const time = (timeDiff || msInDay) * (decrement ? 1 : -1);
      const newFrom = subtractDate(time, msStr, date.from).toDate();
      const newTo = subtractDate(time, msStr, date.to).toDate();

      if (checkBefore(newTo, Date.now()) && checkAfter(newFrom, lifeTime)) {
        setDate({
          from: newFrom,
          to: newTo,
          enteredTo: newTo,
        });
      }
    }
  };

  const showDate = () => {
    if (!date.from && !date.to) return todayStr;
    if (date.from && date.to && moment(date.from).isSame(date.to)) {
      if (moment(date.from).isSame(Date.now(), dayStr)) {
        return todayStr;
      } else {
        return formatDate(date.from);
      }
    }
    return `${formatDate(date.from)}${date.to ? ' - ' + formatDate(date.to) : ''}`;
  };

  const outsideClicker = ({ target }) => {
    if (pickerWrapperRef?.current
      && !pickerWrapperRef.current.contains(target)
      && !rangeRef.current?.dayPicker.contains(target)) {
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
    <div className="px-10 bg-white">
      <div className="container">
        <div className="flex content-between w-full">
          <div className="flex flex-1">
            <img className="w-7 mr-10" src={USAIcon} alt="usa"/>
            <input
              className="w-full h-full border-none outline-none"
              type="text"
              placeholder="Search by Brand, Product, SKU, ASIN"
            />
          </div>
          <div className="flex items-center cursor-pointer relative" ref={pickerWrapperRef}>
            <CalendarIcon className="w-5 mr-3"/>
            <span className="block mr-15" onClick={() => setShowPicker(!showPicker)}>
              {showDate()}
            </span>
            <div className="flex">
              <AngleLeft
                disabled={!date.from || !checkAfter(subtractDate(timeDiff, msStr, date.from), lifeTime)}
                onClick={() => shiftDate(true)}
              />
              <AngleRight
                disabled={!checkBefore(subtractDate(-timeDiff, msStr, date.to), Date.now())}
                onClick={() => shiftDate(false)}
              />
            </div>
            {showPicker && (
              <RangePicker
                date={date}
                setDate={setDate}
                rangeRef={rangeRef}
                nextMonth={nextMonth}
                previousMonth={previousMonth}
                isNavigatePossible={isNavigatePossible}
                closePicker={() => setShowPicker(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
