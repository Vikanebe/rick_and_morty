import React, {ReactElement} from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "react-query";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      height: 280,
    },
    media: {
      height: 200,
    },
  }),
);

function MainPage(): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const {isLoading, error, data} = useQuery('characters', () =>
    fetch('https://rickandmortyapi.com/api/character').then(res =>
      res.json()
    )
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

  console.log('mainData',data)

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {data.results.map((character: any, index: number) => {
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {character.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  );
}

export {MainPage};