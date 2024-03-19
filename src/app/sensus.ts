import { DataUSATypes } from "./common-type"

export async function getData(): Promise<DataUSATypes> {
  const res = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
  const dataUSA: Promise<DataUSATypes> = res.json()
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return dataUSA
}
