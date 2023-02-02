import { useState } from "react";
import DateRangeContainer from "./components/DateRangeContainer";
import GridContainer from "./components/GridContainer";

function App() {
  
  const [filterdates, setFilterDates] = useState([]);

  return (
    <div>
      <DateRangeContainer changeDate={(value)=>setFilterDates([...value])}/>
      <GridContainer filterdates = {filterdates}/>
    </div>
  );
}

export default App;
