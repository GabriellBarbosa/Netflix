import React from 'react'
import Movie from '../Movie';
import { Result } from '../MovieList';
import { Media } from '../../utils/model/Media';

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

const Home = ({data}: { data: Media[] }) => {
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
