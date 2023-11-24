import EmptyNotes from "./components/EmptyNotes";
import Header from "./components/Header";
import StickyNotesGrid from "./components/StickyNotesGrid";
import StickyNotesProvider from "./context/StickyNotesContext";
import "./index.css";
function App() {
  return (
    <StickyNotesProvider>
      <div className="app-container">
        <Header />
        <StickyNotesGrid />
        <EmptyNotes />
      </div>
    </StickyNotesProvider>
  );
}

export default App;
