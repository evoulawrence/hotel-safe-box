import { useSelector } from 'react-redux';
import { SafeBoxKeypad } from '../SafeBoxKeypad/SafeBoxKeypad';
import { SafeBoxScreen } from '../SafeBoxScreen/SafeBoxScreen';
import sbSerialNumber from '../../env';
import './safeBox.scss';

export const SafeBox = () => {
  const state = useSelector((state) => state?.box);
  const message = state?.message;
  const lsIsLocked = localStorage.getItem('isLocked');
  const isLocked = state?.isLockedBox || JSON.parse(lsIsLocked);

  return (
    <div className="safe__box">
      <SafeBoxScreen isLocked={isLocked} message={message} />
      <SafeBoxKeypad />
      <p className="safe__box__serial__number">S/N: {sbSerialNumber.safeBoxSerialNumber}</p>
    </div>
  );
};
