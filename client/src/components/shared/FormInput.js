const FormInput = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  ...rest
}) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      className="form-control"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);

export default FormInput;
