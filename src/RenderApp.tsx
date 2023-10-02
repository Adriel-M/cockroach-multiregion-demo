import { createRoot } from 'react-dom/client';

import App from './App';

function RenderApp() {
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
}

export default RenderApp;
