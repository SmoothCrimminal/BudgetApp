import Plot from 'react-plotly.js';
import React from 'react';
import Forms from '../Components/Form'
import { useCallback, useState} from "react";

export default function App() {

  const [incomeValues, setIncomeValues] = useState([1000, 15000, 2000]);
  const [incomeLabels, setIncomeLabels] = useState(["Nagroda za walki uliczne", "Wypłata", "Inwestycje"]);
  const [expenseValues, setExpenseValues] = useState([100]);
  const [expenseLabels, setExpenseLabels] = useState(["Wyrównanie rachunków u Don Kajgola"]);

  const callback = useCallback((text, amount) => {
    if (amount > 0) {
      setIncomeValues(incomeValues.concat(amount))
      setIncomeLabels(incomeLabels.concat(text))
    } else {
      setExpenseValues(expenseValues.concat(-amount))
      setExpenseLabels(expenseLabels.concat(text))
    }
  }, [expenseLabels, expenseValues, incomeLabels, incomeValues]);

  return (
    <div>
      <div className="Title">
        <h1>BUDGET APP</h1>
      </div>
      <div className="IncomePie">
        <Plot
          data={[{
            values: incomeValues,
            labels: incomeLabels,
            type: 'pie',
            textinfo: 'label+value'
          }]}
          layout={{ width: 400, height: 400, title: 'Income' }}
        />
      </div>
      <div className="Form">
        <Forms parentCallback={callback}></Forms>
      </div>
      <div className="ExpensePie">
        <Plot
          data={[{
            values: expenseValues,
            labels: expenseLabels,
            type: 'pie',
            textinfo: 'label+value'
          }]}
          layout={{ width: 400, height: 400, title: 'Expenses' }}
        />
      </div>
    </div>
  );
}

