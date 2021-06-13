import React, {ReactElement, ReactNode} from "react";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import blue from '@material-ui/core/colors/blue';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';


const primary = blue[100];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 40,
      marginBottom: 20,
      backgroundColor: primary,
      borderRadius: '0.5rem',
      padding: 20,
      minHeight: 550,
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    box: {
      padding: 10,
      fontWeight: 400,
      fontSize: 24,
      fontFamily: 'Roboto Helvetica Arial, sans-serif',
    },
    episodesList: {
      maxHeight: 400,
      overflowY: 'scroll',
      backgroundColor: primary,
    },
    marginBtm: {
      marginBottom: 20,
    },
    link: {
      fontSize: 20,
    }
  }),
);


interface CharacterPageLayoutProps {
  data: any,
  episodes: any,
  openEpisode(id: number): void,
  openLocation(url: string): void,
}

function CharacterPageLayout(props: CharacterPageLayoutProps): ReactElement {
  const classes = useStyles();
  const {data, openLocation} = props;

  const getEpisodes = (): ReactNode => {
    const {openEpisode, episodes} = props;

    if (!Object.keys(episodes).length) return <ListItemText>Отсутствуют</ListItemText>

    if (!Array.isArray(episodes)) {
      const episode = episodes;
      return (
        <ListItem button key={episode.id} onClick={() => openEpisode(episode.id)}>
          <ListItemText primary={episode.name}/>
        </ListItem>
      )
    } else {
       return episodes.map((episode: any) => {
        return (
          <ListItem button key={episode.id} onClick={() => openEpisode(episode.id)}>
            <ListItemText primary={episode.name}/>
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
        className={classes.marginBtm}
      >
        <Avatar alt={data.name} src={data.image} className={classes.avatar}/>
        <Typography gutterBottom variant="h5" component="h2">
          {data.name}
        </Typography>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Status:
          </Box>

          <Box className={classes.box}>
            {data.status}
          </Box>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Species:
          </Box>

          <Box className={classes.box}>
            {data.species}
          </Box>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Gender:
          </Box>

          <Box className={classes.box}>
            {data.gender}
          </Box>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Origin:
          </Box>

          <Link
            component="button"
            color="primary"
            onClick={() => openLocation(data.origin.url)}
            className={classes.link}
          >
            {data.origin.name}
          </Link>
        </Grid>

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Box className={classes.box}>
            Location:
          </Box>

          <Link
            component="button"
            color="primary"
            onClick={() => openLocation(data.location.url)}
            className={classes.link}
          >
            {data.location.name}
          </Link>
        </Grid>
      </Grid>

      <Grid container item sm={12}>
        <Grid container item direction="column">
          <Typography gutterBottom variant="h4" component="h2">
            Episodes
          </Typography>

          <List component="nav" aria-label="secondary mailbox folders" className={classes.episodesList}>
            {getEpisodes()}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export {CharacterPageLayout};