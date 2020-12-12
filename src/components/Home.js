import React from 'react'
import Movie from './Movie';

const Home = ({data}) => {
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
