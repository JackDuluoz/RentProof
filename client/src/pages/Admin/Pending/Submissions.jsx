import React, { useContext, useState } from "react";
import { DataBaseContext } from "../../../providers/DataBaseProvider";
import axios from "axios"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import './Submissions.scss'

export default function Submissions() {
  const { users, properties, prices, setPrices } = useContext(DataBaseContext);

  const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS}
  })

  const getPropertyByPriceId = (price) => {
    for (let property of properties) {
      if (property.id === price.property_id) {
        return property
      }
    }
  }

  const getUserByPriceId = (price) => {
    for (let user of users) {
      if (user.id === price.user_id) {
        return user
      }
    }
  }

  const handleApprove = (id) => {
    axios.put(`http://localhost:8001/prices/approve/${id}`)
      .then((response) => {
 	      const index = prices.findIndex((p) => p.id === response.data.id);
        const newPrices = [...prices]
        newPrices.splice(index, 1, response.data)
        setPrices(newPrices)
      })
      .catch((error) => {
        console.log(error);
      });
 }
  
  const handleReject = (id) => {
    axios.put(`http://localhost:8001/prices/reject/${id}`)
      .then((response) => {
        const index = prices.findIndex((p) => p.id === response.data.id);
        const newPrices = [...prices]
        newPrices.splice(index, 1, response.data)
        setPrices(newPrices)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  let pending
  prices && (pending = prices.filter(price => price.admin_status === 'pending'));

  let pendingList
  pending && (pendingList = pending.map((submission) => {
    const photoURL = submission.photo
    const documentURL = submission.documentation 
    return {
      id: submission.id,
      photo: <a target="_blank" rel="noreferrer" href={photoURL} ><img src={photoURL} alt="submission" id="pending-img" width='120px' height='90px' /></a>,
      address: getPropertyByPriceId(submission).street_address,
      city: getPropertyByPriceId(submission).city,
      province: getPropertyByPriceId(submission).province,
      price: submission.price,
      documentation: <form method="GET" target="_blank" action={documentURL}>
                        <button type="submit" className="btn" id="document-btn"><i className="fa fa-folder"></i>Document</button>
                      </form>,
      user: getUserByPriceId(submission).name,
      status: submission.admin_status,
      approve: <Button label="Approve" className="p-button-success" onClick={() => handleApprove(submission.id)} />,
      reject: <Button label="Reject" className="p-button-danger" onClick={() => handleReject(submission.id)} />
    }  
  })
    .reverse()  
  )
  return (
    <div className="submission-table">
      <InputText
        placeholder="Search"
        onInput={(e) =>
          setFilters({
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
        })}
      />
      <DataTable value={pendingList} header="Pending Prices" sortMode="multiple" filters={filters}
        paginator
        rows={3}
        rowsPerPageOptions={[1,2,3]}
      >
        <Column field="photo" header="Photo" />
        <Column sortable field="id" header="Id" />
        <Column sortable field="address" header="Address" />
        <Column sortable field="city" header="City" />
        <Column sortable field="province" header="Province" />
        <Column sortable field="price" header="Price" />
        <Column field="documentation" header="Documentation" />
        <Column sortable field="user" header="User" />
        <Column className="status" field="status" header="Status" />
        <Column field="approve" header="Approve" />
        <Column field="reject" header="Reject" />
      </DataTable>
    </div>
  );
}



