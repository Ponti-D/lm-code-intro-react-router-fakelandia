export interface misdemeanourFilterProps {
  selection: string;
  onFilterChange: (selection: string) => void;
}

const MisdemeanerFilter: React.FC<misdemeanourFilterProps> = ({
  selection,
  onFilterChange,
}) => {
  return (
    <>
      <label>Filter options: </label>
      <select
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}
      >
        <option value=" ">See all 😱🤪</option>
        <option value="rudeness">Mild Public Rudeness 🤪</option>
        <option value="vegetables">Not Eating Your Vegetables 🥗</option>
        <option value="lift">Speaking in a Lift 🗣</option>
        <option value="united">Supporting Manchester United 😈</option>
      </select>
    </>
  );
};
export default MisdemeanerFilter;
