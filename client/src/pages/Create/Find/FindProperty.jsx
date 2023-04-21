import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { DataBaseContext } from "../../../providers/DataBaseProvider";
import { PropertyIdContext } from "../../../providers/PropertyIdProvider";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./FindProperty.scss";

export default function FindProperty() {

  const { properties } = useContext(DataBaseContext);
  const { setUpdateId } = useContext(PropertyIdContext);

  const history = useHistory()

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const update = (id) => {
    setUpdateId(id);
    history.push("/create/update");
  };

  let tableProperties;
  properties &&
    (tableProperties = properties.map((property) => {
      return {
        id: property.id,
        address: property.street_address,
        city: property.city,
        province: property.province,
        update: (
          <Button
            label="New Price"
            className="p-button-primary"
            onClick={() => update(property.id)}
          />
        ),
      };
    }));
  
  const header = (
    <div className="find-header">
      <div className="title">
        Find Property
      </div>
      <InputText
      placeholder="Search"
      onInput={(e) =>
        setFilters({
          global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
      })}
      />
    </div>
  );

  return (
    <div className="find-table">
      <DataTable
        value={tableProperties}
        header={header}
        sortMode="multiple"
        filters={filters}
        scrollable scrollHeight="650px"
      >
        <Column sortable field="id" header="Id" />
        <Column sortable field="address" header="Address" />
        <Column sortable field="city" header="City" />
        <Column sortable field="province" header="Province" />
        <Column field="update" header="Update" />
      </DataTable>
    </div>
  );
}
