import './App.css';
import { BlogPosts } from './BlogPosts';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Blog'em ipsum</h1>
      </header>
      <BlogPosts />
    </div>
  );
}

export default App;
