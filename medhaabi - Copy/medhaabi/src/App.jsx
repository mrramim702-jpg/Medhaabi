import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import ChaptersScreen from './components/ChaptersScreen';
import MCQScreen from './components/MCQScreen';
import PlannerScreen from './components/PlannerScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  function handleNavigate(target) {
    setScreen(target);
  }

  function renderScreen() {
    switch (screen) {
      case 'home':     return <HomeScreen onNavigate={handleNavigate} />;
      case 'chat':     return <ChatScreen />;
      case 'chapters': return <ChaptersScreen />;
      case 'mcq':      return <MCQScreen />;
      case 'planner':  return <PlannerScreen />;
      default:         return <HomeScreen onNavigate={handleNavigate} />;
    }
  }

  return (
    <div className="app">
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {renderScreen()}
      </main>
      <BottomNav screen={screen} onNavigate={handleNavigate} />
    </div>
  );
}
