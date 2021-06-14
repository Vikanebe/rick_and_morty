import React, {useState} from "react";
import {LocationPageLayout} from "./LocationPageLayout";
import {useQuery} from "react-query";
import {getIdUrl} from "../../services/utils";
import {useHistory, useParams} from "react-router-dom";
import {ErrorComponent} from "../../components/Error";
import {LoadingComponent} from "../../components/LoadingComponent";

function LocationPageContainer() {
  const {locationId} = useParams<{ locationId: string }>();
  const history = useHistory();
  const [characters, setCharacters] = useState<Array<ICharacter> | ICharacter>([])

  const getCharacters = (locationData: ILocation ): void => {
    const characterId:string = locationData.residents.map((e:string) => {
      return (getIdUrl(e))
    }).join(', ')

    fetch(`https://rickandmortyapi.com/api/character/${characterId}`).then(res =>
      res.json()
    ).then((data) => setCharacters(data))
  }

  const {isLoading, error, data} = useQuery('location', () =>
      fetch(`https://rickandmortyapi.com/api/location/${locationId}`).then(res => {
          return res.json()
        }
      ),
    {onSuccess: (data) => getCharacters(data)}
  )

  const openCharacterPageHandler = (id:number):void => {
    history.push(`/character/${id}`);
  }

  if (isLoading) return <LoadingComponent/>;

  if (error) return <ErrorComponent/>;


  return (
    <LocationPageLayout
      data={data}
      characters={characters}
      openCharacter={openCharacterPageHandler}
    />
  );
}

export {LocationPageContainer};