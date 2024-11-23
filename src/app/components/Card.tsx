import React from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Card({id} : any) {

  const data = useSelector((state: RootState) => state.data);
  const singleData = data.items[id];
  return (
    <div className='card__component'>
        <div>
          <div className='card__id__component'>
            <h2>{id + 1}</h2>
            <button><ArrowRight /></button>
          </div>
          <h3>{singleData.firstName} {singleData.lastName}</h3>
          <p>{singleData.email}</p>
        </div>
    </div>
  )
}

export default Card