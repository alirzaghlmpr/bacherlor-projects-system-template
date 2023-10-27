const Number = ({ label, min, max, name, id }) => {
  return (
    <>
      <label className="text-sm mx-2" htmlFor="capacity">
        {label}
      </label>
      <input
        min={min}
        max={max}
        type="number"
        name={name}
        id={id}
        className="w-[35px] focus:border-0 focus:outline-0 text-center border-b-2 border-slate-500"
      />
    </>
  );
};

export default Number;
