import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Designations from "./designations/designationPage";
import Module from "./module/modulePage";
import ProfilePage from './profile/profilePage';
import RTIDesignationPage from './rtiDesignation/rtiDesignationPage';
import OfficePage from './officeDetails/officeDetails';
import Settings from "./Settings";
import BootstrapTables from "../components/BootstrapTables";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Lock from "./auth/Lock";
import NotFoundPage from "./auth/NotFound";
import ServerError from "./auth/ServerError";
import titlePage from './title/titlePage';
import districtPage from './district/districtPage';
// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import { Router } from 'react-router';
import statePage from './State/statePage';
import ddoTypePage from './ddoType/ddoTypePage';
import rolePage from './role/rolePage';
import officeUnitPage from './officeUnit/officeUnitPage';
import officeTypePage from './officeType/officeTypePage';
import officeLevelPage from './officeLevel/officeLevelPage';
import officeAccDeataiPage from './officeAccDetail/officeAccDeatailPage';
import otherOfficePage from './otherOffice/otherOfficePage';
import ChangePassword from './auth/ChangePassword';
import officePage from './office/officePage';
import officeDetails from './officeDetails/officeDetails';
import titleDetail from './title/titleDetail';
import districtDetail from './district/districtDetail';
import designationDetail from './designations/designationDetail';
import stateDetail from './State/stateDetail';
import rtidesignationdetail from './rtiDesignation/rtidesignationdetail';
import moduleDetail from './module/moduleDetail';
import roleDetail from './role/roleDetail';
import officeTypeDetail from './officeType/officeTypeDetail';
import officeLevelDetail from './officeLevel/officeLevelDetail';
import ddoTypeDetail from './ddoType/ddoTypeDetail';
import officeUnitDetail from './officeUnit/officeUnitDetail';
import mainOfficeDetail from './office/mainOfficeDetail';
import mainOfficeAccDetail from './officeAccDetail/mainOfficeAccDetail';
import userPage from './user/userPage';
import userDetail from './user/userDetail';
import editDistrict from './district/editDistrict';
import editTitle from './title/editTitle';
import editState from './State/editState';
import editDesignation from './designations/editDesignation';
import editRtiDesignation from './rtiDesignation/editRtiDesignation';
import editDdoType from './ddoType/editDdoType';
import editModule from './module/editModule';
import editOfficeType from './officeType/editOfficeType';
import editRole from './role/editRole';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};
const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }
  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }
  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};
export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.ChangePassword.path} component={ChangePassword} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Designations.path} component={Designations} />
    <RouteWithSidebar exact path={Routes.EditDesignations.path} component={editDesignation} />
    <RouteWithSidebar exact path={Routes.DesignationDetail.path} component={designationDetail} />
    <RouteWithSidebar exact path={Routes.RTIDesignations.path} component={RTIDesignationPage} />
    <RouteWithSidebar exact path={Routes.EditRtiDesignations.path} component={editRtiDesignation} />
    <RouteWithSidebar exact path={Routes.Module.path} component={Module} />
    <RouteWithSidebar exact path={Routes.MainOfficeAccDetail.path} component={mainOfficeAccDetail} />
    <RouteWithSidebar exact path={Routes.OfficeUnitDetail.path} component={officeUnitDetail} />
    <RouteWithSidebar exact path={Routes.MainOfficeDetail.path} component={mainOfficeDetail} />
    <RouteWithSidebar exact path={Routes.DdoTypeDetail.path} component={ddoTypeDetail} />
    <RouteWithSidebar exact path={Routes.ModuleDetail.path} component={moduleDetail} />
    <RouteWithSidebar exact path={Routes.EditModule.path} component={editModule} />
    <RouteWithSidebar exact path={Routes.TitleDetail.path} component={titleDetail} />
    <RouteWithSidebar exact path={Routes.RoleDetail.path} component={roleDetail} />
    <RouteWithSidebar exact path={Routes.UserDetail.path} component={userDetail} />
    <RouteWithSidebar exact path={Routes.RtiDesignationDetail.path} component={rtidesignationdetail} />
    <RouteWithSidebar exact path={Routes.DistrictDetail.path} component={districtDetail} />
    <RouteWithSidebar exact path={Routes.EditDistrict.path} component={editDistrict} />
    <RouteWithSidebar exact path={Routes.StateDetail.path} component={stateDetail} />
    <RouteWithSidebar exact path={Routes.EditState.path} component={editState} />
    <RouteWithSidebar exact path={Routes.Profile.path} component={ProfilePage} />
    <RouteWithSidebar exact path={Routes.OfficeDetail.path} component={officeDetails} />
    <RouteWithSidebar exact path={Routes.Title.path} component={titlePage} />
    <RouteWithSidebar exact path={Routes.EditRole.path} component={editRole} />
    <RouteWithSidebar exact path={Routes.EditTitle.path} component={editTitle} />
    <RouteWithSidebar exact path={Routes.DDOType.path} component={ddoTypePage} />
    <RouteWithSidebar exact path={Routes.EditDdoType.path} component={editDdoType} />
    <RouteWithSidebar exact path={Routes.District.path} component={districtPage} />
    <RouteWithSidebar exact path={Routes.OfficeLevelDetail.path} component={officeLevelDetail} />
    <RouteWithSidebar exact path={Routes.OfficeTypeDetail.path} component={officeTypeDetail} />
    <RouteWithSidebar exact path={Routes.EditOfficeType.path} component={editOfficeType} />
    <RouteWithSidebar exact path={Routes.State.path} component={statePage} />
    <RouteWithSidebar exact path={Routes.Office.path} component={officePage} />
    <RouteWithSidebar exact path={Routes.OfficeLevel.path} component={officeLevelPage} />
    <RouteWithSidebar exact path={Routes.OfficeType.path} component={officeTypePage} />
    <RouteWithSidebar exact path={Routes.OfficeUnit.path} component={officeUnitPage} />
    <RouteWithSidebar exact path={Routes.OfficeAccDetail.path} component={officeAccDeataiPage} />
    <RouteWithSidebar exact path={Routes.OtherOffice.path} component={otherOfficePage} />
    <RouteWithSidebar exact path={Routes.Role.path} component={rolePage} />
    <RouteWithSidebar exact path={Routes.User.path} component={userPage} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
