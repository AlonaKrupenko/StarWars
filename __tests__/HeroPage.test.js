import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroPage from '@/app/heroesList/[heroId]/page';
import { fetchHero, fetchGraphData } from '@/app/lib/data';
import * as prepareGraphData from '@/app/helpers/prepareGraphData';

// Mock the data fetching functions
jest.mock('@/app/lib/data', () => ({
  fetchHero: jest.fn(),
  fetchGraphData: jest.fn(),
}));

// Mock the HeroGraph component
jest.mock('@/app/ui/HeroGraph/HeroGraph', () => () => <div>Hero Graph</div>);

// Mock the NotFound component
jest.mock('@/app/ui/NotFound/NotFound', () => () => <div>Not Found</div>);

// Mock the createGraphData function from prepareGraphData
jest.mock('@/app/helpers/prepareGraphData', () => {
  const originalModule = jest.requireActual('@/app/helpers/prepareGraphData');
  return {
    ...originalModule,
    createGraphData: jest.fn(),
  };
});

describe('HeroPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero data and graph when fetch is successful', async () => {
    const hero = {
      id: '1',
      name: 'Hero 1',
      films: ['film1', 'film2'],
      starships: ['ship1', 'ship2'],
    };

    const films = [{ id: 'film1', title: 'Film 1' }, { id: 'film2', title: 'Film 2' }];
    const starships = [{ id: 'ship1', name: 'Ship 1' }, { id: 'ship2', name: 'Ship 2' }];

    fetchHero.mockResolvedValueOnce(hero);
    fetchGraphData.mockResolvedValueOnce({ films, starships });
    prepareGraphData.createGraphData.mockReturnValueOnce({
      nodes: [{ id: '1', data: { label: 'Hero 1' } }],
      edges: [{ id: 'e1', source: '1', target: '2' }],
    });

    // Render the component
    const ui = await HeroPage({ params: { heroId: '1' } });
    render(ui);

    // Check if hero name is rendered
    expect(screen.getByText('Hero name: Hero 1')).toBeInTheDocument();

    // Check if HeroGraph is rendered
    expect(screen.getByText('Hero Graph')).toBeInTheDocument();
  });

  it('renders NotFound component when fetch fails', async () => {
    fetchHero.mockRejectedValueOnce(new Error('Failed to fetch hero'));
    
    // Render the component
    const ui = await HeroPage({ params: { heroId: '1' } });
    render(ui);

    // Check if NotFound component is rendered
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
