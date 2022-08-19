import './App.css';
import CardFn from './components/CardFn/CardFn'
import CardClass from './components/CardClass/CardClass'
function App() {

  const CHECKBOXES = [
    {
      id: '0',
      name: 'kosher',
      value: 'Kosher',
    },
    {
      id: '1',
      name: 'no-celery',
      value: 'No Celery (inc celeriac)',
    },
    {
      id: '2',
      name: 'no-egg',
      value: 'No Egg',
    }
  ]

  return (
    <div className="App">
      <CardFn CHECKBOXES={CHECKBOXES} />
      <CardClass CHECKBOXES={CHECKBOXES} />
    </div>
  );
}

export default App;
