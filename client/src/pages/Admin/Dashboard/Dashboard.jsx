import Database from './Database';
import SideBar from './SideBar'
import './Dashboard.scss'

const Dashboard = () => {  
  
  return (
      <div className="dashboard">
      <SideBar />
      <Database />
      </div>
  );
}
 
export default Dashboard;