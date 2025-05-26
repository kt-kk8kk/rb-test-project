import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { App } from '@components/app/app.tsx';

const root = createRoot(document.getElementById('root')!);

root.render(
	//<React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	//</React.StrictMode>
);
