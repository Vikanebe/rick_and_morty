import React, {ReactElement} from "react";
import {useQuery} from "react-query";

function MainPage(): ReactElement {
  const { isLoading, error, data } = useQuery('characters', () =>
    fetch('https://rickandmortyapi.com/api/character').then(res =>
      res.json()
    )
  )

  if (isLoading) {return <div>'Loading...'</div>}

  if (error) {return <div>An error has occurred: + {error}</div>}

  console.log(data)

  return (
    <div>
      Главная страница
      { data.results[0].name}
    </div>
  );
}

export {MainPage};