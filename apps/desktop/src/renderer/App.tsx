import { useNavigation } from './hooks/useNavigation';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { DonorsPage } from './pages/DonorsPage';
import { ImportDonorsPage } from './pages/ImportDonorsPage';
import { BloodRequestsPage } from './pages/BloodRequestsPage';
import { DonorMatchingPage } from './pages/DonorMatchingPage';
import { CommunicationHistoryPage } from './pages/CommunicationHistoryPage';
import { DonationHistoryPage } from './pages/DonationHistoryPage';
import { ReportsPage } from './pages/ReportsPage';
import { StaffManagementPage } from './pages/StaffManagementPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  const { currentRoute, navigateTo } = useNavigation('dashboard');

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigateTo} />;
      case 'donors':
        return (
          <DonorsPage onNavigateImport={() => navigateTo('import-donors')} />
        );
      case 'import-donors':
        return <ImportDonorsPage />;
      case 'blood-requests':
        return <BloodRequestsPage />;
      case 'donor-matching':
        return <DonorMatchingPage />;
      case 'communication-history':
        return <CommunicationHistoryPage />;
      case 'donation-history':
        return <DonationHistoryPage />;
      case 'reports':
        return <ReportsPage />;
      case 'staff-management':
        return <StaffManagementPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={navigateTo} />;
    }
  };

  return (
    <MainLayout currentRoute={currentRoute} onNavigate={navigateTo}>
      {renderCurrentPage()}
    </MainLayout>
  );
}

export default App;

