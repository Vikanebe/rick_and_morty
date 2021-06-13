import React, {ReactElement, ReactNode} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import blue from '@material-ui/core/colors/blue';


const primary = blue[100];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 40,
      marginBottom: 20,
      backgroundColor: primary,
      borderRadius: '0.5rem',
      padding: 20,
    },
    box: {
      padding: 10,
      fontWeight: 400,
      fontSize: 24,
      fontFamily: 'Roboto Helvetica Arial, sans-serif',
    },
    charactersList: {
      maxHeight: 600,
      width: '100%',
      overflowY: 'scroll',
      backgroundColor: primary,
    },
    marginBtm: {
      marginBottom: 20,
    }

  }),
);

interface EpisodePageLayoutProps {
  data: any,
  characters: any,
  openCharacter(id: number): void,
}

function EpisodePageLayout(props: EpisodePageLayoutProps): ReactElement {
  const classes = useStyles();
  const {data} = props;

  const getCharacters = (): ReactNode => {
    const {characters, openCharacter} = props;

    if (!Object.keys(characters).length) return <ListItemText>Отсутствуют</ListItemText>

    if (!Array.isArray(characters)) {
      const character = characters;
      return (
        <ListItem button key={character.id} onClick={() => openCharacter(character.id)}>
          <ListItemText primary={character.name}/>
        </ListItem>
      )
    } else {
      return characters?.map((character: any) => {
        return (
          <ListItem button key={character.id} onClick={() => openCharacter(character.id)}>
            <ListItemText primary={character.name}/>
          </ListItem>
        )
      })
    }
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.marginBtm}
      >
        <Typography gutterBottom variant="h4" component="h2">
          {data.name}
        </Typography>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Air data:
          </Box>

          <Box className={classes.box}>
            {data.air_date}
          </Box>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Episode:
          </Box>

          <Box className={classes.box}>
            {data.episode}
          </Box>
        </Grid>
      </Grid>

      <Grid container sm={12}>
        <Grid container direction="column" item>
          <Typography gutterBottom variant="h4" component="h2">
            Characters
          </Typography>

          <List component="nav" aria-label="secondary mailbox " className={classes.charactersList}>
            {getCharacters()}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export {EpisodePageLayout};