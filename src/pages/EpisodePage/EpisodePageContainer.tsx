import React, {useState} from "react";
import {EpisodePageLayout} from "./EpisodePageLayout";
import {useQuery} from "react-query";
import {useHistory} from "react-router-dom";
import {getIdUrl} from '../../services/utils';


function EpisodePageContainer(props: any) {
  const {episodeId} = props.match.params;
  const [characters, setCharacters] = useState<any>({});
  const history = useHistory();

  const getCharacters = (episodesData: any ): void => {
    const episodesId:string = episodesData.characters.map((e:string) => {
      return (getIdUrl(e))
    }).join(', ')

    fetch(`https://rickandmortyapi.com/api/character/${episodesId}`).then(res =>
      res.json()
    ).then((data) => setCharacters(data))
  }

  const {isLoading, error, data} = useQuery('episode', () =>
      fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`).then(res =>
        res.json()
      ),
    {onSuccess: (data) => getCharacters(data)}
  )

  if (isLoading) {
    return <div>'Loading...'</div>
  }

  if (error) {
    return <div>An error has occurred: + {error}</div>
  }

  const openCharacterPageHandler = (id:number):void => {
    history.push(`/character/${id}`);
  }


  // console.log('EpisodeData', data)
  // console.log('EpisodeCharacters', characters)

  return (
    <EpisodePageLayout
      data={data}
      characters={characters}
      openCharacter={openCharacterPageHandler}
    />
  );
}

export {EpisodePageContainer};