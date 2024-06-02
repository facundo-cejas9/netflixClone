import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../Categories/categorys.css'

function CategoryPage() {
  const [category, setCategory] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    const fetchDataCategorys = async() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGU5OTM0YjAwZWZlNTAxMTI5Yjg0ZWFmYTQ3NDRkZSIsInN1YiI6IjYzNWYwYTBmMzM5NmI5MDA5MWQ3ZjMwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T5F-sECLYUrfFckH_F8kyawSJw03RgCJLTycNl5VgVU'
            }
          };
          
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${id}`, options)
            const data = await response.json()
            console.log(data.results);
            setCategory(data.results)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    fetchDataCategorys()
  }, [])
  


  return (
    <div className='categorys'>
        {
            category.map(item => {
                return (
                    <div className='card-categorys' key={item.id}>
                        <Link className='link' to={`/player/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                        <h3>{item.title}</h3>
                        </Link>
                        
                    </div>
                )
            })
        }
    </div>
  )
}

export default CategoryPage