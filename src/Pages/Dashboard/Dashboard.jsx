import React from "react";
import classes from "./Dashboard.module.css";
import StatComponent from "../../Components/StatComponent/StatComponent";
import PatientImg from "../../assets/paientImg.png";
import ClaenderImg from "../../assets/calenderImg.png";
import LineChart from "../../Components/LineChart/LineChart";
import AdminCard from "../../Components/AdminCard/AdminCard";
import NavMenu from "../../Components/NavMenu/NavMenu";
import Navbar from "../../Components/Navbar/Navbar";
import Monthly from "../../Components/MonthlyComponent/Monthly";
const Dashboard = () => {
  return (
    <div>
      <NavMenu />
      <div className="main">
        <Navbar />

        <section className={classes.dashboard}>
          <div className={classes.statLayout}>
            <div>
              <AdminCard />
              <Monthly />
            </div>
            <div>
              <aside className={classes.two}>
                <StatComponent
                  title="upcoming appointments"
                  count={300}
                  img={PatientImg}
                />
                <StatComponent
                  title="total appointments"
                  count={4023}
                  img={ClaenderImg}
                />
              </aside>
              <div className={classes.graph}>
                <LineChart />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
