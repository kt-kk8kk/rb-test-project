import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { App } from '@components/app/app.tsx';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = createRoot(document.getElementById('root')!);

root.render(
	//<React.StrictMode>
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
	</Provider>
	//</React.StrictMode>
);
