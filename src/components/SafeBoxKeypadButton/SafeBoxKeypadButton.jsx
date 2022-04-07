import './safeBoxKeypadButton.scss';

export const SafeBoxKeypadButton = ({ label, onClick, disabled }) => {
  return (
    <div aria-disabled={disabled ? 'true' : 'false'} className="safe__box__keypad__button" onClick={onClick}>
      {label}
    </div>
  );
};
