import { Dispatch, SetStateAction } from "react"

export type DataTypes = {
    "ID Nation": string,
    "Nation": string,
    "ID Year": number,
    "Year": string,
    "Population": number,
    "Slug Nation": string,
}

type SourceTypes = {
    "measures": string[],
    "annotations": {
        "source_name": string,
        "source_description": string,
        "dataset_name": string,
        "dataset_link": string,
        "table_id": string,
        "topic": string,
        "subtopic": string,
    },
    "name": string,
    "substitutions": string[],
}

export interface DataUSATypes {
    data: DataTypes[],
    source: SourceTypes[],
}

export type ChartTypes = {
    year: string[],
    population: number[]
}

type DatasetTypes = {
    data: number[],
    fill: boolean,
    tension: number,
    borderColor: string,
}

export interface LineChartDataTypes {
    labels: string[],
    datasets: DatasetTypes[],
}

export interface LineChartOptionTypes {
    maintainAspectRatio: boolean,
    aspectRatio: number,
    plugins: {
        legend: {
            display: boolean,
        }
    },
    scales: {
        x: {
            ticks: {
                color: string,
            },
            grid: {
                color: string,
            }
        },
        y: {
            ticks: {
                color: string,
            },
            grid: {
                color: string,
            }
        }
    }
}

export type FilterOverlayPropTypes = {
    year: string[],
    dataOnChange: Dispatch<SetStateAction<{
        start: string;
        end: string;
    }>>
}
