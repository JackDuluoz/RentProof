import React, { useContext, useState } from "react";
import { DataBaseContext } from "../../../providers/DataBaseProvider";
import { PropertyIdContext } from "../../../providers/PropertyIdProvider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import "./CreatePropertyList.scss";

export default function PropertyList() {

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
            label="Update"
            className="p-button-primary"
            onClick={() => update(property.id)}
          />
        ),
      };
    }));

  return (
    <div>
      <InputText
        placeholder="Search"
        onInput={(e) =>
          setFilters({
            global: {
              value: e.target.value,
              matchMode: FilterMatchMode.CONTAINS,
            },
          })
        }
      />
      <DataTable
        value={tableProperties}
        header="Find Your Property"
        sortMode="multiple"
        filters={filters}
        paginator
        rows={5}
        rowsPerPageOptions={[1,2,3,4,5]}
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
