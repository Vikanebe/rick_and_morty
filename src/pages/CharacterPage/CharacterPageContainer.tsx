import React, {ReactElement, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {CharacterPageLayout} from "./CharacterPageLayout";
import {getIdUrl} from '../../services/utils';
import {LoadingComponent} from "../../components/LoadingComponent";
import {ErrorComponent} from "../../components/Error";


function CharacterPageContainer(props: any): ReactElement {
  const {characterId} = useParams<{ characterId: string }>();
  const [episodes, setEpisodes] = useState<any>({});
  const history = useHistory();

  const getEpisodes = (characterData: any): void => {
    const episodesId: string = characterData.episode.map((e: string) => {
      return (getIdUrl(e))
    }).join(', ')

    fetch(`https://rickandmortyapi.com/api/episode/${episodesId}`).then(res =>
      res.json()
    ).then((data) => setEpisodes(data))
  }

  const {isLoading, error, data} = useQuery('character', () =>
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`).then(res => {
          return res.json()
        }
      ),
    {onSuccess: (data) => getEpisodes(data)}
  )

  const openEpisodePageHandler = (id: number): void => {
    history.push(`/episode/${id}`);
  }

  const openLocationPageHandler = (url: string): void => {
    console.log(url);
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