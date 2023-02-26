import { useContext, useState } from "react";
import MisdemeanerFilter from "./misdemeanour_filter";
import { MisdemeanoursContext } from "./MisdemeanoursContext";

export const MisdemeanoursTable: React.FC = () => {
  const misdemeanours = useContext(MisdemeanoursContext);
  const [filterSelected, setFilterSelected] = useState<string>(" ");

  let filteredMisdemeanours = misdemeanours;

  if (filterSelected !== " ") {
    filteredMisdemeanours = misdemeanours.filter(
      (misdemeanour) => misdemeanour.misdemeanour === filterSelected
    );
  }
  return (
    <>
      <div>
        <h2>Misdemeanours </h2>
        <div>
          <div className="form_controlgoup">
            <MisdemeanerFilter
              selection={filterSelected}
              onFilterChange={setFilterSelected}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Citizen Id</th>
                <th>Date</th>
                <th>Misdemeanour</th>
                <th>Punishment Idea</th>
              </tr>
            </thead>
            <tbody>
              {filteredMisdemeanours.map((misdemeanour, index) => (
                <tr key={misdemeanour.citizenId}>
                  <td>{misdemeanour.citizenId}</td>
                  <td>{misdemeanour.date}</td>
                  <td>{misdemeanour.misdemeanour}</td>
                  <td>
                    <img
                      src={`https://picsum.photos/50/50?${misdemeanour.citizenId}`}
                      alt="pic"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MisdemeanoursTable;
