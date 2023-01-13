import React from 'react';
import ReactDOM from 'react-dom/client';
import states from './config/states';
import config from './config/router';
import { UIRouter, UIView, useSrefActive, pushStateLocationPlugin } from '@uirouter/react';

import "./index.css";
import { ConfigProvider } from 'antd';

// Render de la app en el div con id root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Router Config */}
    <UIRouter
    config={config}
    plugins={[pushStateLocationPlugin]}
    states={states}>

      {/* Theme Config for Ant Design */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9E339F',
            borderRadius: '15px',
          },
        }}
      >
        <UIView/>
      </ConfigProvider>
    </UIRouter>
  </React.StrictMode>
);
