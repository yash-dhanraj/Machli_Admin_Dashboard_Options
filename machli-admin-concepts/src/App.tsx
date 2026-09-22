import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { NotificationHistoryProvider } from './context/NotificationHistoryContext';

export default function App() {
  return (
    <BrowserRouter>
      <NotificationHistoryProvider>
        <AppRoutes />
      </NotificationHistoryProvider>
    </BrowserRouter>
  );
}
