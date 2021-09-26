import './App.css';
import { BlogPosts } from './BlogPosts';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app__header">
          <h1>Blog'em ipsum</h1>
        </header>
        <BlogPosts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
