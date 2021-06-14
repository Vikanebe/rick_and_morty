import React, {ReactElement, ReactNode, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {useFormik} from "formik";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Button} from '@material-ui/core';
import {Input} from '@material-ui/core';
import {ErrorComponent} from '../../components/Error';
import {LoadingComponent} from "../../components/LoadingComponent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      marginBottom: 20,
    },
    flex: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      height: 340,
    },
    media: {
      height: 250,
    },
    input: {
      width: 600,
    },
    select: {
      width: 100,
    },
    typography: {
      textAlign: 'center',
    },
    error: {
      position: 'absolute',
      margin: 0,
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',


      border: '1px solid',
      borderColor: theme.palette.error.main,
      borderRadius: '10px',
      padding: '20px'
    }
  }),
);

function MainPage(): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const {page} = useParams<{ page: string }>();
  const [name, setName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      _name: "",
      _status: "",
    },
    onSubmit: (values) => {
      history.push('/1');
      setName(values._name);
      setFilterStatus(values._status);
    },
  });

  const fetchCharacters = (page: string = '1', name: string = '', filterStatus: string = '') => {
    const nameParam = name ? `&name=${name}` : '';
    const statusParam = filterStatus ? `&status=${filterStatus}` : '';
    return fetch(`https://rickandmortyapi.com/api/character?page=${page}${nameParam}${statusParam}`).then(res => {
        if (!res.ok) {
          console.log(res)
          throw new Error('Network response was not ok')
        }
        return res.json();
      }
    )
  }

  const {
    isLoading,
    error,
    data,
    isPreviousData,
  } = useQuery(['characters', page, name, filterStatus], () => fetchCharacters(page, name, filterStatus), {keepPreviousData: false})


  const openCharacterPageHandler = (id: number): void => {
    history.push(`/character/${id}`);
  }


  const getBody = (): ReactNode => {
    if (isLoading) return <LoadingComponent/>;

    if (error) return <ErrorComponent/>;

    return <Container maxWidth="lg">
      <Grid container spacing={4}>
        {data?.results?.map((character: any, index: number) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={`${character.id}-${index}`}>
              <Card
                className={classes.card}
                onClick={() => openCharacterPageHandler(character.id)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={character.image}
                    title={character.name}
                  />

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.typography}
                    >
                      {character.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Grid container spacing={4}>
        <Grid item container sm={6} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/${Math.max(Number(page) - 1, 1)}`);
              window.scroll(0, 0);
            }}
            disabled={page === '1'}
          >
            Previous page
          </Button>
        </Grid>

        <Grid container item sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!isPreviousData && data?.info?.next) {
                history.push(`/${Number(page) + 1}`);
                window.scroll(0, 0);
              }
            }}
            disabled={isPreviousData || !data?.info?.next}
          >
            Next page
          </Button>
        </Grid>
      </Grid>
    </Container>
  }

  return (
    <>
      <Container className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction="row" spacing={2} className={classes.flex}>
            <Grid container item sm={6}>
              <Input
                id="_name"
                name="_name"
                type="text"
                placeholder="Введите имя персонажа"
                className={classes.input}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid container item justify="center" sm={3}>
                <select
                  id="_status"
                  name="_status"
                  onChange={formik.handleChange}
                  className={classes.select}
                >
                  <option value="">All</option>
                  <option value="alive">Alive</option>
                  <option value="dead">Dead</option>
                  <option value="unknown">Unknown</option>
                </select>
            </Grid>
            <Grid container justify="flex-end" item sm={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Применить
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      {getBody()}
    </>
  );
}

export {MainPage};