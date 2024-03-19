"use client";

import { Chart } from "primereact/chart";
import { Fragment, useEffect, useState } from "react";
import { ChartTypes, LineChartDataTypes, LineChartOptionTypes } from "./common-type";
import FilterOverlay from "./FilterOverlay";

export default function CustomLineChart(props: ChartTypes) {
    const { year, population } = props;
    const [filterRangeOfDate, setFilterRangeOfDate] = useState({
        start: year[0],
        end: year[year.length - 1],
    });
    const [filteredData, setFilteredData] = useState<ChartTypes>({ year, population });
    const [renderedChartData, setRenderedChartData] = useState<LineChartDataTypes>();
    const [renderedChartOption, setRenderedChartOption] = useState<LineChartOptionTypes>();

    useEffect(() => {
        const documentStyle = window.getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const chartData = {
            labels: filteredData.year,
            datasets: [
                {
                    data: filteredData.population,
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--indigo-500'),
                },
            ]
        };
        const chartOption = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setRenderedChartData(chartData);
        setRenderedChartOption(chartOption);
    }, [
        filteredData.year,
        filteredData.population
    ]);

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

            <Chart type="line" data={renderedChartData} options={renderedChartOption} />
        </Fragment>
    )
}