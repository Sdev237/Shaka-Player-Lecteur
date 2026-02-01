import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Bouchon VideoPlayer pour éviter Shaka Player / APIs média dans jsdom
jest.mock('./components/VideoPlayer', () => function MockVideoPlayer() {
  return <div data-testid="lecteur-video">Lecteur vidéo</div>;
});

test('affiche le titre et le contenu principal', () => {
  render(<App />);
  expect(screen.getByText(/Lecteur de flux vidéo/i)).toBeInTheDocument();
  expect(screen.getByText(/Lecteur vidéo moderne/i)).toBeInTheDocument();
  expect(screen.getByTestId('lecteur-video')).toBeInTheDocument();
});

test('affiche le pied de page avec Shaka et React', () => {
  render(<App />);
  expect(screen.getByText(/Propulsé par Shaka Player et React/i)).toBeInTheDocument();
});
