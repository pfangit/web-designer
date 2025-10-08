import './App.css';
import WidgetContainer from './container/widget-container.tsx';

function App() {
  return (
    <div className="flex gap-1 h-full">
      <WidgetContainer />
      <div className="border">sketch</div>
      <div className="border">properties</div>
    </div>
  );
}

export default App;
