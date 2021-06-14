import React, {ReactElement, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {CharacterPageLayout} from "./CharacterPageLayout";
import {getIdUrl} from '../../services/utils';
import {LoadingComponent} from "../../components/LoadingComponent";
import {ErrorComponent} from "../../components/Error";


function CharacterPageContainer(): ReactElement {
  const {characterId} = useParams<{ characterId: string }>();
  const [episodes, setEpisodes] = useState<Array<IEpisode> | IEpisode>([]);
  const history = useHistory();

  const getEpisodes = (characterData: ICharacter): void => {
    const episodesId: string = characterData.episode.map((e: string) => {
      return (getIdUrl(e))
    }).join(', ')

    fetch(`https://rickandmortyapi.com/api/episode/${episodesId}`).then(res =>
      res.json()
    ).then((data) => setEpisodes(data))
  }

  const {isLoading, error, data} = useQuery('character', () =>
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`).then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json()
        }
      ),
    {onSuccess: (data) => getEpisodes(data)}
  )

  const openEpisodePageHandler = (id: number): void => {
    history.push(`/episode/${id}`);
  }

  const openLocationPageHandler = (url: string): void => {
    history.push(`/location/${getIdUrl(url)}`)
  }

  if (isLoading) return <LoadingComponent/>;

  if (error) return <ErrorComponent/>;

  return (
    <CharacterPageLayout
      data={data}
      episodes={episodes}
      openEpisode={openEpisodePageHandler}
      openLocation={openLocationPageHandler}
    />
  );
}

export {CharacterPageContainer};