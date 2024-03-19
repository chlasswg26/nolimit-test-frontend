"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { FilterOverlayPropTypes } from "./common-type";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { OverlayPanel } from "primereact/overlaypanel";
import { Panel } from "primereact/panel";

export default function FilterOverlay(props: FilterOverlayPropTypes) {
    const { year, dataOnChange } = props
    const [startValue, setStartValue] = useState<string>(year[0]);
    const [endValue, setEndValue] = useState<string>(year[year.length - 1]);
    const op = useRef<OverlayPanel>(null);

    useEffect(() => {
        dataOnChange({
            start: startValue,
            end: endValue,
        })
    }, [
        startValue,
        endValue,
        dataOnChange
    ])

    return (
        <Fragment>
            <Button type="button" icon="pi pi-filter" label="Filter Date Range" onClick={(e) => op.current?.toggle(e)} />
            <OverlayPanel ref={op} showCloseIcon closeOnEscape>
                <Panel header="Start From:" toggleable collapsed={true} style={{ marginBottom: '0.5rem' }}>
                    <SelectButton value={startValue} onChange={(e: SelectButtonChangeEvent) => setStartValue(e.value)} options={year} />
                </Panel>
                <Panel header="End To:" toggleable collapsed={true}>
                    <SelectButton value={endValue} onChange={(e: SelectButtonChangeEvent) => setEndValue(e.value)} options={year} />
                </Panel>
            </OverlayPanel>
        </Fragment>
    )
}
