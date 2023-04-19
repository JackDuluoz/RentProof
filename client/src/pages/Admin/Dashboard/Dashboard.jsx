import PropertyPrices from './PropertyPrices';
import './Dashboard.scss'
import SideBar from './SideBar'

const Dashboard = () => {  
  
  return (
    <div className="admin-background">
      <div className="dashboard">
      <SideBar />
      <PropertyPrices />
      </div>
    </div>
  );
}
 
export default Dashboard;