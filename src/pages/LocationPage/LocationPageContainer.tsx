import React, {useState} from "react";
import {LocationPageLayout} from "./LocationPageLayout";
import {useQuery} from "react-query";
import {getIdUrl} from "../../services/utils";
import {useHistory, useParams} from "react-router-dom";
import {ErrorComponent} from "../../components/Error";

function LocationPageContainer(props:any ) {
  const {locationId} = useParams<{ locationId: string }>();
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

  if (isLoading) return <LocationPageContainer/>;

  if (error) return <ErrorComponent/>;


  return (
    <LocationPageLayout
      data={data}
      residents={residents}
      openResident={openResidentPageHandler}
    />
  );
}

export {LocationPageContainer};