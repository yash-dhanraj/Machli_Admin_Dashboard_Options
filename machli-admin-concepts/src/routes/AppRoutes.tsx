import { Route, Routes } from 'react-router-dom';
import DesignSelector from '../pages/DesignSelector';
import AdminLayout from '../layouts/AdminLayout';
import OptionDashboardRouter from '../pages/OptionDashboardRouter';
import ManualNotifications from '../pages/shared/ManualNotifications';
import IncoisVerification from '../pages/shared/IncoisVerification';
import IncoisVerificationDetail from '../pages/shared/IncoisVerificationDetail';
import NotificationHistory from '../pages/shared/NotificationHistory';
import UserManagement from '../pages/shared/UserManagement';
import UserDetail from '../pages/shared/UserDetail';
import AlertsWarnings from '../pages/shared/AlertsWarnings';
import MarineInformation from '../pages/shared/MarineInformation';
import EmergencyHelplines from '../pages/shared/EmergencyHelplines';
import GovernmentSchemes from '../pages/shared/GovernmentSchemes';
import LandingCentres from '../pages/shared/LandingCentres';
import ReferenceData from '../pages/shared/ReferenceData';
import Settings from '../pages/shared/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DesignSelector />} />

      <Route path="/:option" element={<AdminLayout />}>
        <Route index element={<OptionDashboardRouter />} />
        <Route path="manual-notifications" element={<ManualNotifications />} />
        <Route path="incois-verification" element={<IncoisVerification />} />
        <Route path="incois-verification/:id" element={<IncoisVerificationDetail />} />
        <Route path="notification-history" element={<NotificationHistory />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="alerts-warnings" element={<AlertsWarnings />} />
        <Route path="marine-information" element={<MarineInformation />} />
        <Route path="emergency-helplines" element={<EmergencyHelplines />} />
        <Route path="government-schemes" element={<GovernmentSchemes />} />
        <Route path="landing-centres" element={<LandingCentres />} />
        <Route path="reference-data/states-districts" element={<ReferenceData section="states-districts" />} />
        <Route path="reference-data/sub-districts-villages" element={<ReferenceData section="sub-districts-villages" />} />
        <Route path="reference-data/occupations" element={<ReferenceData section="occupations" />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-surface text-center">
            <div>
              <p className="text-lg font-semibold text-navy-900">Page not found</p>
              <a href="/" className="mt-2 inline-block text-sm text-ocean-600 hover:text-ocean-500">
                Return to Design Options
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
