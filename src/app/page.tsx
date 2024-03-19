
import { Fieldset } from "primereact/fieldset";
import { getData } from "./sensus";
import { TabPanel, TabView } from "primereact/tabview";
import CustomLineChart from "./LineChart";
import CustomPieChart from "./PieChart";

export default async function Home() {
  const dataUSA = await getData()
  const ascendingOrderOfDataUSA = dataUSA.data.sort((a, b) => a.Population - b.Population)
  const yearOfDataUSA = ascendingOrderOfDataUSA.map(item => item.Year)
  const populationOfDataUSA = ascendingOrderOfDataUSA.map(item => item.Population)

  return (
    <Fieldset legend={`${dataUSA.source[0].annotations.source_name}`}>
      <p style={{ margin: 0 }}>
        {dataUSA.source[0].annotations.source_description}
      </p>

      <div className="card" style={{ margin: "2rem" }}>
          <Fieldset legend="View Chart Statistics" toggleable>
              <TabView>
                <TabPanel header="Line Chart">
                  <CustomLineChart year={yearOfDataUSA} population={populationOfDataUSA} />
                </TabPanel>
                <TabPanel header="Pie Chart">
                  <CustomPieChart year={yearOfDataUSA} population={populationOfDataUSA} />
                </TabPanel>
              </TabView>
          </Fieldset>
      </div>
    </Fieldset>
  );
}
