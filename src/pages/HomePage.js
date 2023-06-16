import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Designations from "./designations/designationPage";
import Module from "./module/modulePage";

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
import editOffice from './office/editOffice';
import editOfficeLevel from './officeLevel/editOfficeLevel';
import userSignUp from './user/userSignUp';
import editOfficeAcc from './officeAccDetail/editOfficeAcc';
import titleView from './title/titleView';
import otherOfficeDetail from './otherOffice/otherOfficeDetail';
import editOtherOffice from './otherOffice/editOtherOffice';
import viewDdoType from './ddoType/viewDdoType';
import viewDesignation from './designations/viewDesignation';
import viewDistrict from './district/viewDistrict';
import viewState from './State/viewState';
import viewRtiDesignation from './rtiDesignation/viewRtiDesignation';
import viewModule from './module/viewModule';
import viewOffice from './office/viewOffice';
import viewRole from './role/viewRole';
import viewOfficeType from './officeType/viewOfficeType';
import viewOfficeLevel from './officeLevel/viewOfficeLevel';
import editOfficeUnit from './officeUnit/editOfficeUnit';
import viewOfficeUnit from './officeUnit/viewOfficeUnit';
import viewOfficeAcc from './officeAccDetail/viewOfficeAcc';
import viewUser from './user/viewUser';
import Chatbot from './chatBoat';

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
    {/* Designations */}
    <RouteWithSidebar exact path={Routes.ViewDesignations.path} component={viewDesignation} />
    <RouteWithSidebar exact path={Routes.Designations.path} component={Designations} />
    <RouteWithSidebar exact path={Routes.EditDesignations.path} component={editDesignation} />
    <RouteWithSidebar exact path={Routes.DesignationDetail.path} component={designationDetail} />
    {/* RTIDesignations */}
    <RouteWithSidebar exact path={Routes.ViewRTIDesignations.path} component={viewRtiDesignation} />
    <RouteWithSidebar exact path={Routes.RTIDesignations.path} component={RTIDesignationPage} />
    <RouteWithSidebar exact path={Routes.EditRtiDesignations.path} component={editRtiDesignation} />
    <RouteWithSidebar exact path={Routes.RtiDesignationDetail.path} component={rtidesignationdetail} />
    {/* Module */}
    <RouteWithSidebar exact path={Routes.Module.path} component={Module} />
    <RouteWithSidebar exact path={Routes.ViewModule.path} component={viewModule} />
    <RouteWithSidebar exact path={Routes.ModuleDetail.path} component={moduleDetail} />
    <RouteWithSidebar exact path={Routes.EditModule.path} component={editModule} />
    {/* OfficeAccDetail */}
    <RouteWithSidebar exact path={Routes.ViewOfficeAcc.path} component={viewOfficeAcc} />
    <RouteWithSidebar exact path={Routes.MainOfficeAccDetail.path} component={mainOfficeAccDetail} />
    <RouteWithSidebar exact path={Routes.OfficeAccDetail.path} component={officeAccDeataiPage} />
    <RouteWithSidebar exact path={Routes.editOfficeAcc.path} component={editOfficeAcc} />
    {/* OfficeUnitDetail */}
    <RouteWithSidebar exact path={Routes.EditOfficeUnit.path} component={editOfficeUnit} />
    <RouteWithSidebar exact path={Routes.ViewOfficeUnit.path} component={viewOfficeUnit} />
    <RouteWithSidebar exact path={Routes.OfficeUnitDetail.path} component={officeUnitDetail} />
    <RouteWithSidebar exact path={Routes.OfficeUnit.path} component={officeUnitPage} />
    {/* OfficeDetail */}
    <RouteWithSidebar exact path={Routes.ViewOffice.path} component={viewOffice} />
    <RouteWithSidebar exact path={Routes.MainOfficeDetail.path} component={mainOfficeDetail} />
    <RouteWithSidebar exact path={Routes.EditOffice.path} component={editOffice} />
    <RouteWithSidebar exact path={Routes.Office.path} component={officePage} />
    {/* OfficeLevel */}
    <RouteWithSidebar exact path={Routes.ViewOfficeLevel.path} component={viewOfficeLevel} />
    <RouteWithSidebar exact path={Routes.OfficeLevel.path} component={officeLevelPage} />
    <RouteWithSidebar exact path={Routes.EditOfficeLevel.path} component={editOfficeLevel} />
    <RouteWithSidebar exact path={Routes.OfficeLevelDetail.path} component={officeLevelDetail} />
    {/* OfficeTypeDetail */}
    <RouteWithSidebar exact path={Routes.OfficeTypeDetail.path} component={officeTypeDetail} />
    <RouteWithSidebar exact path={Routes.EditOfficeType.path} component={editOfficeType} />
    <RouteWithSidebar exact path={Routes.OfficeType.path} component={officeTypePage} />
    <RouteWithSidebar exact path={Routes.ViewOfficeType.path} component={viewOfficeType} />
    {/* DdoTypeDetail */}
    <RouteWithSidebar exact path={Routes.DdoTypeDetail.path} component={ddoTypeDetail} />
    <RouteWithSidebar exact path={Routes.DDOType.path} component={ddoTypePage} />
    <RouteWithSidebar exact path={Routes.ViewDdoType.path} component={viewDdoType} />
    <RouteWithSidebar exact path={Routes.EditDdoType.path} component={editDdoType} />
    {/* TitleDetail */}
    <RouteWithSidebar exact path={Routes.TitleDetail.path} component={titleDetail} />
    <RouteWithSidebar exact path={Routes.TitleView.path} component={titleView} />
    <RouteWithSidebar exact path={Routes.EditTitle.path} component={editTitle} />
    <RouteWithSidebar exact path={Routes.Title.path} component={titlePage} />
    {/* RoleDetail */}
    <RouteWithSidebar exact path={Routes.ViewRole.path} component={viewRole} />
    <RouteWithSidebar exact path={Routes.RoleDetail.path} component={roleDetail} />
    <RouteWithSidebar exact path={Routes.EditRole.path} component={editRole} />
    <RouteWithSidebar exact path={Routes.Role.path} component={rolePage} />
    {/* UserDetail */}
    <RouteWithSidebar exact path={Routes.ViewUser.path} component={viewUser} />
    <RouteWithSidebar exact path={Routes.UserDetail.path} component={userDetail} />
    <RouteWithSidebar exact path={Routes.UserSignUp.path} component={userSignUp} />
    <RouteWithSidebar exact path={Routes.User.path} component={userPage} />
    {/* District Detail */}
    <RouteWithSidebar exact path={Routes.DistrictDetail.path} component={districtDetail} />
    <RouteWithSidebar exact path={Routes.ViewDistrict.path} component={viewDistrict} />
    <RouteWithSidebar exact path={Routes.EditDistrict.path} component={editDistrict} />
    <RouteWithSidebar exact path={Routes.District.path} component={districtPage} />
    {/* State Detail */}
    <RouteWithSidebar exact path={Routes.ViewState.path} component={viewState} />
    <RouteWithSidebar exact path={Routes.StateDetail.path} component={stateDetail} />
    <RouteWithSidebar exact path={Routes.EditState.path} component={editState} />
    <RouteWithSidebar exact path={Routes.State.path} component={statePage} />
    {/* OtherOffice */}
    <RouteWithSidebar exact path={Routes.OtherOffice.path} component={otherOfficePage} />
    <RouteWithSidebar exact path={Routes.EditOtherOffice.path} component={editOtherOffice} />
    <RouteWithSidebar exact path={Routes.OtherOfficeDetail.path} component={otherOfficeDetail} />
    {/* other components */}
    
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
    <RouteWithSidebar exact path={Routes.OfficeDetail.path} component={officeDetails} />
    {/* chatboat */}
    
    <RouteWithSidebar exact path={Routes.ChatBoat.path} component={Chatbot} />
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
