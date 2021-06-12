import React, {useState} from "react";
import {LocationPageLayout} from "./LocationPageLayout";
import {useQuery} from "react-query";
import {getIdUrl} from "../../services/utils";
import {useHistory} from "react-router-dom";


function LocationPageContainer(props:any ) {
  const {locationId} = props.match.params;
  const history = useHistory();
  const [residents, setResidents] = useState<any>({})

  const getResidents = (residentData: any ): void => {
    const residentsId:string = residentData.residents.map((e:string) => {
      return (getIdUrl(e))
    }).join(', ')

    fetch(`https://rickandmortyapi.com/api/character/${residentsId}`).then(res =>
      res.json()
    ).then((data) => setResidents(data))
  }

  const {isLoading, error, data} = useQuery('location', () =>
      fetch(`https://rickandmortyapi.com/api/location/${locationId}`).then(res => {
          return res.json()
        }
      ),
    {onSuccess: (data) => getResidents(data)}
  )

  const openResidentPageHandler = (id:number):void => {
    history.push(`/character/${id}`);
  }

  if (isLoading) {
    return <div>'Loading...'</div>
  }

  if (error) {
    return <div>An error has occurred: + {error}</div>
  }

  console.log('locationData', data)

  return (
    <LocationPageLayout
      data={data}
      residents={residents}
      openResident={openResidentPageHandler}
    />
  );
}

export {LocationPageContainer};