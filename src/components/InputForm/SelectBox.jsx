import './styles.css';

export const SelectBox = ({
  className,
  label,
  disabled = false,
  options,
  value,
  onChange,
  units,
}) => {
  return (
    <div className={`select-box ${disabled ? className : ''}`}>
      <label>{label}</label>
      <div className="value-and-units-wrapper">
        <div className="select-wrapper">
          <select
            className="select-value"
            onChange={onChange}
            value={value}
            disabled={disabled}
          >
            <option value="" disabled>
              {'[ . . . ]'}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>{units}</div>
      </div>
    </div>
  );
};
