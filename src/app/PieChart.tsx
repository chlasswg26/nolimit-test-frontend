"use client";

import { Chart } from "primereact/chart";
import { Fragment, useEffect, useState } from "react";
import { ChartTypes } from "./common-type";
import FilterOverlay from "./FilterOverlay";

export default function CustomPieChart(props: ChartTypes) {
    const { year, population } = props
    const [filterRangeOfDate, setFilterRangeOfDate] = useState({
        start: year[0],
        end: year[year.length - 1],
    });
    const [filteredData, setFilteredData] = useState<ChartTypes>({ year, population });
    const chartData = {
        labels: filteredData.year,
        datasets: [
            {
                data: filteredData.population,
            }
        ]
    }
    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true
                }
            }
        }
    };

    useEffect(() => {
        const startIndex = year.indexOf(String(filterRangeOfDate.start));
        const endIndex = year.indexOf(String(filterRangeOfDate.end));

        const filteredYear = year.slice(startIndex, endIndex + 1);
        const filteredPopulation = population.slice(startIndex, endIndex + 1);

        setFilteredData({
            year: filteredYear,
            population: filteredPopulation,
        });
    }, [
        filterRangeOfDate.start,
        filterRangeOfDate.end,
        year,
        population
    ]);

    return (
        <Fragment>
            <div className="card" style={{ marginBottom: "1.5rem" }}>
                <FilterOverlay year={year} dataOnChange={setFilterRangeOfDate} />
            </div>

            <Chart type="pie" data={chartData} options={chartOptions} />
        </Fragment>
    )
}