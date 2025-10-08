import './App.css';
import WidgetContainer from './container/widget-container.tsx';
import PropsContainer from './container/props-container.tsx';
import SketchContainer from './container/sketch-container.tsx';

function App() {
  return (
    <div className="flex gap-1 h-full">
      <WidgetContainer />
      <SketchContainer />
      <PropsContainer />
    </div>
  );
}

export default App;
