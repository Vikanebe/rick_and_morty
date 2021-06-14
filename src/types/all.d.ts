/////////////////////// mainData ///////////////////////////
interface IInfo {
  count: number,
  pages: number,
  next: string | null,
  prev: string | null,
}

interface IMainData {
  info: IInfo,
  results: Array<ICharacter>,
}


////////////////////// characters ///////////////////////////

interface ICharacterParam {
  name: string,
  url: string,
}


interface ICharacter {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: ICharacterParam,
  location: ICharacterParam,
  image: string,
  episode: Array<string>,
  url: string,
  created: string,
}


//////////////////// episodes //////////////////////

interface IEpisode {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: Array<string>,
  url: string,
  created: string,
}

/////////////////// location ///////////////////////

interface ILocation {
  id: number,
  name: string,
  type: string,
  dimension : string,
  residents: Array<string>,
  url: string,
  created: string,
}