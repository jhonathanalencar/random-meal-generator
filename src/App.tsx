import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Hamburger } from 'phosphor-react';

import { Meal } from './components/Meal';
import { Loader } from './components/Loader';

import styles from './app.module.scss';

export interface MealType{
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strTags: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strIngredients: string[];
  strMeasures: string[];
  strYoutube: string;
}

export function App() {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const strIngredients: string[] = [];
  const strMeasures: string[] = [];

  function compareString(string: string, value: string){
    const stringWithoutNumber = string.substring(0, string.length - 1);

    if(stringWithoutNumber === 'strIngredient'){
      strIngredients.push(value);
    }else if(stringWithoutNumber === 'strMeasure'){
      strMeasures.push(value);
    }
  }

  async function getRandomMeal(){
    try{
      const result = await axios.get(url);

      const meals = result.data.meals[0];

      Object.keys(meals).forEach((key) =>{
        if(meals[key]?.trim().length > 0){
          compareString(key, meals[key]);
        }
      });

      const randomMealFormatted: MealType = {...meals, strIngredients, strMeasures};

      return randomMealFormatted;
    }catch(error){
      console.log(error);
    }
  }

  const { data: meal, refetch, isFetching } = useQuery(['randomMeal'], getRandomMeal, {
    enabled: false,
  });

  return (
    <main className={styles.app}>
      <div className={styles.app__content}>
        <Hamburger className={styles.app__content_hamburger} />
        <h3 className={styles.app__content_subheading}>Are you hungry?</h3>
        <h2 className={styles.app__content_heading}>Find your next meal by clicking below</h2>
        <button type="button" className="button" onClick={() => refetch()}>find meal</button>
      </div>
      {isFetching && <Loader />}
      {meal && !isFetching && (
        <Meal meal={meal} />
      )}
    </main>
  )
}
