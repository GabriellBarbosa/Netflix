import React from 'react'
import Movie from '../Movie/Movie';
import { Result } from '../MovieList';

export interface Item {
  title: string;
  type: string;
  slug: string;
  items: {
    response: {
      results: Result[]
    }
  }
}

const Home = ({data}: { data: Item[] }) => {
  if(!data) return null;
  return (
    <main>
      {data.map((item) => (
        <Movie key={item.slug} item={item} />
      ))}
    </main>
  )
}

export default Home
