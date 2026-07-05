function InputField({ label, name, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`field-input${error ? ' field-input-error' : ''}`}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default InputField
