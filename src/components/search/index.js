import * as React from 'react';
import RangePicker from "../RangePicker";
import moment from "moment";

import USAIcon from '../../assets/usa.svg';
import CalendarIcon from '../../assets/calendar.svg';
import styles from './styles.module.scss';
import AngleSingleLeft from "../../assets/ic_angle-left.svg";
import AngleSingleRight from "../../assets/ic_angle-right.svg";


const Search = () => {
  const [date, setDate] = React.useState({
    from: moment().toDate(),
    to: null,
    enteredTo: null,
  });
  const [showPicker, setShowPicker] = React.useState(false);
  const rangeRef = React.useRef(null);

  const nextMonth = () => {
    rangeRef.current && rangeRef.current.showNextMonth();
  };

  const previousMonth = () => {
    rangeRef.current && rangeRef.current.showPreviousMonth();
  };

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
            <img src={CalendarIcon} alt="calendar"/>
            <span onClick={() => setShowPicker(!showPicker)}>
            {date.from ? moment(date.from).format('MMM DD, YYYY') : 'Today'}
              {date.to && ' - ' + moment(date.to).format('MMM DD, YYYY')}
          </span>
            <img onClick={previousMonth} src={AngleSingleLeft} alt="angle" />
            <img onClick={nextMonth} src={AngleSingleRight} alt="angle" />
            {showPicker && (
              <RangePicker
                date={date}
                setDate={setDate}
                rangeRef={rangeRef}
                nextMonth={nextMonth}
                previousMonth={previousMonth}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
