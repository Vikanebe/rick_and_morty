import React, {useState} from "react";
import {EpisodePageLayout} from "./EpisodePageLayout";
import {useQuery} from "react-query";
import {useHistory, useParams} from "react-router-dom";
import {getIdUrl} from '../../services/utils';
import {LoadingComponent} from "../../components/LoadingComponent";
import {ErrorComponent} from "../../components/Error";


function EpisodePageContainer() {
  const {episodeId} = useParams<{ episodeId: string }>();
  const [characters, setCharacters] = useState<Array<ICharacter> | ICharacter>([]);
  const history = useHistory();

  const getCharacters = (episodesData: any): void => {
    const characterId: string = episodesData.characters.map((e: string) => {
      return (getIdUrl(e))
    }).join(', ')

    if (characterId === '') return;

    fetch(`https://rickandmortyapi.com/api/character/${characterId}`).then(res =>
      res.json()
    ).then((data) => setCharacters(data))
  }

  const {isLoading, error, data} = useQuery('episode', () =>
      fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`).then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json()
        }
      ),
    {
      onSuccess: (data) => getCharacters(data)
    }
  )

  if (isLoading) return <LoadingComponent/>;

  if (error) return <ErrorComponent/>;

  const openCharacterPageHandler = (id: number): void => {
    history.push(`/character/${id}`);
  }

  return (
    <EpisodePageLayout
      data={data}
      characters={characters}
      openCharacter={openCharacterPageHandler}
    />
  );
}

export {EpisodePageContainer};