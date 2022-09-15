import { MealType } from '../../App';
import styles from './styles.module.scss';

interface MealProps{
  meal: MealType;
}

export function Meal({ meal }: MealProps){
  const tags = meal.strTags?.split(',');
  const youtubeVideoCode = meal.strYoutube.slice(-11);

  return(
    <div className={styles.meal}>
      <div className={styles.meal__content}>
        <div className={styles.meal__content_info}>
          <div className={styles.meal__content_info__img}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
          <div className={styles.meal__content_info__items}>
            <strong className={styles.meal__content_info__title}>{meal.strMeal}</strong>
            <strong className={styles.meal__content_info__category}>
              Category: <span>{meal.strCategory}</span>
            </strong>
            <strong className={styles.meal__content_info__cuisine}>
              Cuisine: <span>{meal.strArea}</span>
            </strong>
            <div className={styles.meal__content_info__tags}>
              {tags && (
                <>
                  <strong>Tags: </strong>
                  <div>
                    {tags.map((tag, index) =>{
                      if(tag.trim().length > 0){
                        return(
                          <span key={tag + index}>{tag}</span>
                        )
                      }
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.meal__content_details}>
          <div className={styles.meal__content_details__item}>
            <strong className={styles.meal__content_details__item_title}>Ingredients</strong>
            <ul>
              {meal.strIngredients.map((ingredient, index) =>{
                return(
                  <li key={ingredient + index}>
                    <strong>{ingredient}</strong>
                    <span>{meal.strMeasures[index]}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.meal__content_details__item}>
            <strong className={styles.meal__content_details__item_title}>Instructions</strong>
            <p className={styles.meal__content_details__item_description}>{meal.strInstructions}</p>
          </div>
        </div>
        <div className={styles.meal__content_video}>
          <strong className={styles.meal__content_video__title}>How to make {meal.strMeal}</strong>
          <div className={styles.meal__content_video_container}>
            <iframe 
				      src={`https://www.youtube.com/embed/${youtubeVideoCode}`}>
				    </iframe>
          </div> 
        </div>
      </div>
    </div>
  )
}