import React, {ReactNode} from 'react';
import blue from "@material-ui/core/colors/blue";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";

const primary = blue[100];

const useStyles = makeStyles(() =>
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
    residentsList: {
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

interface LocationPageLayoutProps {
  data: ILocation,
  characters: Array<ICharacter> | ICharacter,
  openCharacter(id: number): void,
}

function LocationPageLayout(props: LocationPageLayoutProps) {
  const classes = useStyles();
  const {data} = props;

  const getResidents = (): ReactNode => {
    const {characters, openCharacter} = props;

    if (!Object.keys(characters).length) return <ListItemText>Отсутствуют</ListItemText>

    if (!Array.isArray(characters)) {
      let character = characters;
      return (
        <ListItem button key={character.id} onClick={() => openCharacter(character.id)}>
          <ListItemText primary={character.name}/>
        </ListItem>
      )
    } else {
      return characters?.map((character) => {
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
            Type:
          </Box>

          <Box className={classes.box}>
            {data.type}
          </Box>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Dimension:
          </Box>

          <Box className={classes.box}>
            {data.dimension}
          </Box>
        </Grid>
      </Grid>

      <Grid container item sm={12}>
        <Grid container item direction="column">
          <Typography gutterBottom variant="h4" component="h2">
            Residents
          </Typography>

          <List
            component="nav"
            aria-label="secondary mailbox"
            className={classes.residentsList}
          >
            {getResidents()}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export {LocationPageLayout};