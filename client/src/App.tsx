import { ConfigProvider } from 'antd';
import AppRoutes from './routes';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Lexend, sans-serif',
          colorPrimary: "#2dca5c",
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
