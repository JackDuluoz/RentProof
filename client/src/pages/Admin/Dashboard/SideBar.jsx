import React, { useState, useContext } from 'react';
import { DataBaseContext } from "../../../providers/DataBaseProvider";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import './Dashboard.scss'

export default function SideBar() {
  const [visible, setVisible] = useState(false);
  const { users, properties, prices } = useContext(DataBaseContext);
  let stats
  (users && properties && prices) && (stats =
          <div className="stats">
            Users: {users.length}<br /><br />
            Properties: {properties.length}<br /><br />
            Prices: {prices.length}
          </div>)  
    return (
      <div className="sidebar">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2 className="stats-title">Site Stats</h2>
          {stats}
        </Sidebar>
        <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
      </div>
    )
}