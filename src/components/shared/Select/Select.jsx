const Select = ({ id, name, selected, options }) => {
  return (
    <select
      id={id}
      name={name}
      className="block py-2.5 px-0 w-full text-center text-sm border-0 border-b-2 border-slate-500 appearance-none focus:outline-none focus:ring-0 peer">
      <option value="" selected>
        {selected}
      </option>
      {options.map(({ value, text, key }) => (
        <option key={key} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
