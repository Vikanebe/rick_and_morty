import React, {ReactElement, useState} from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "react-query";
import {CharacterPageLayout} from "./CharacterPageLayout";
import {getIdUrl} from '../../services/utils';


function CharacterPageContainer(props: any): ReactElement {
  const {characterId} = props.match.params;
  const [episodes, setEpisodes] = useState<any>({});
  const history = useHistory();

  const getEpisodes = (characterData: any ): void => {
    const episodesId:string = characterData.episode.map((e:string) => {
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

  const openEpisodePageHandler = (id:number):void => {
    history.push(`/episode/${id}`);
  }

  const openLocationPageHandler = (url: string): void => {
    history.push(`/location/${getIdUrl(url)}`)
  }

  if (isLoading) {
    return <div>'Loading...'</div>
  }

  if (error) {
    return <div>An error has occurred: + {error}</div>
  }


  // console.log('episodes', episodes)
  // console.log('dataEpisodes:', episodes);
  // console.log('characterData:', data)

  return (
    <>
      <CharacterPageLayout
        data={data}
        episodes={episodes}
        openEpisode={openEpisodePageHandler}
        openLocation={openLocationPageHandler}
      />
    </>
  );
}

export {CharacterPageContainer};