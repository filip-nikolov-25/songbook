interface Props {
  selected: string;
  setSelected: (filterTerm: string) => void;
  options: string[];
}
const CustomSelect = ({ selected, setSelected, options }: Props) => {
  return (
    <div className="relative inline-block w-48 mt-5 group">
      <div className="w-full bg-gradient-to-r from-red-950 via-red-400 to-red-950 text-white font-semibold py-2 px-4 rounded-xl shadow-md group-hover:shadow-lg transition duration-300">
        {selected}
      </div>

      <ul className="absolute w-full bg-white rounded-xl shadow-lg mt-2 z-10 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => setSelected(option)}
            className="px-4 py-2 cursor-pointer hover:bg-red-100 text-black transition"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
