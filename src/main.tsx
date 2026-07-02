import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, ModalContext } from 'react-aria-components';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider
        values={[
          [
            ModalContext,
            { isDismissable: true, shouldCloseOnInteractOutside: () => true },
          ],
        ]}
      >
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
