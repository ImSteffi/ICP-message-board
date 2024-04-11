import { useState } from 'react';
import Navbar from '../components/Navbar';
import CreateContentForm from '../components/Content/CreateContent.jsx';
import Content from '../components/Content/Content.jsx';

function App() {

  return (
    <main>
      <Navbar />
      <CreateContentForm />
      <Content />
    </main>
  );
}

export default App;
