import { useState } from 'react';
import { message_board_backend } from 'declarations/message-board-backend';
import Navbar from '../components/Navbar';
import Content from '../components/Content/Content.jsx';

function App() {

  return (
    <main>
      <Navbar />
      <Content />
    </main>
  );
}

export default App;
