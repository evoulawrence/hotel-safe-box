import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeBoxKeypadButton } from '../SafeBoxKeypadButton/SafeBoxKeypadButton';
import { safeBoxKeypadData } from './safeBoxKeypadData';
import './safeBoxKeypad.scss';
import { enteringNumbers, lockingBox, unlockingBox, validationMaserCode } from '../../store/safeBox/action';
import { formatArrayToString } from '../../lib/utils';
import { clickButtonsCounter, followTheBoxActions, makeActivateScreen } from '../../store/common/action';

export const SafeBoxKeypad = () => {
  const dispatch = useDispatch();
  let [counter, setCounter] = useState(0);
  const state = useSelector((state) => state?.box);
  const processing = state?.processing;
  const numbers = formatArrayToString(state?.numbers);
  const isServiceMode = state?.isServiceMode;
  const isTimeSpace = useSelector((state) => state?.common?.isTimeSpace);
  const lsIsLocked = JSON.parse(localStorage.getItem('isLocked'));

  useEffect(() => {
    if (isTimeSpace) {
      return isTimeSpace;
    }
  }, [isTimeSpace]);

  const prevCounterRef = useRef();

  useEffect(() => {
    prevCounterRef.current = counter;
  });
  const prevCounter = prevCounterRef.current;
  const interval = useRef(null);

  const handleEnterNumbers = (num) => {
    dispatch(makeActivateScreen('pressed'));

    if (counter > 0 || counter !== prevCounter) {
      clearInterval(interval.current);
    }
    const newNumbers = formatArrayToString([...numbers, num]);
    if (num !== 'L') {
      setCounter((counter += 1));
      dispatch(clickButtonsCounter(counter));
      dispatch(enteringNumbers(num));
      dispatch(followTheBoxActions(true));
      // handling user's delay of typing
      interval.current = setInterval(() => {
        if (lsIsLocked) {
          dispatch(unlockingBox(newNumbers.replace(/L/g, '')));
        } else {
          dispatch(lockingBox(newNumbers.replace(/L/g, '')));
          localStorage.setItem('submited_code', newNumbers.replace(/L/g, ''));
        }
        clearInterval(interval.current);
      }, 1200);
    }

    if (num === 'L') {
      if (isServiceMode) {
        dispatch(validationMaserCode(newNumbers));
      } else if (lsIsLocked) {
        dispatch(unlockingBox(newNumbers));
      } else {
        dispatch(lockingBox(newNumbers));
        localStorage.setItem('submited_code', newNumbers);
      }
    }
  };

  return (
    <div className="safe__box__keypad">
      {safeBoxKeypadData.map((item) => {
        return (
          <SafeBoxKeypadButton
            key={item?.id}
            label={item?.label}
            disabled={processing}
            onClick={() => handleEnterNumbers(item?.label)}
          />
        );
      })}
    </div>
  );
};
