/////////////////////// mainData ///////////////////////////
interface IInfo {
  count: number,
  pages: number,
  next: string | null,
  prev: string | null,
}

interface IMainData {
  info: Object<IInfo>,
  results: Array<ICharacter>,
}


////////////////////// characters ///////////////////////////

interface ICharacterParam {
  name: string,
  url: string,
}

interface IArrayOfUrl {
  url: string,
}

interface ICharacter {
  id: string,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: Object<ICharacterParam>,
  location: Object<ICharacterParam>,
  image: string,
  episode: Array<IArrayOfUrl>,
  url: string,
  created: string,
}


//////////////////// episodes //////////////////////

interface IEpisode {
  id: string,
  name: string,
  air_date: string,
  episode: string,
  characters: Array<IArrayOfUrl>,
  url: string,
  created: string,
}

/////////////////// location ///////////////////////

interface ILocation {
  id: string,
  name: string,
  type: string,
  dimension : string,
  residents: Array<IArrayOfUrl>,
  url: string,
  created: string,
}