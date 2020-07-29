import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LeafSongCard from '../components/leafSongCard';
import LeafDataManager from '../backend/leafDataManager';

const useStyles = makeStyles({
  root: {
  },
  header: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 0,
    padding: 0,
    lineHeight: 0,
  },
  headerText: {
    fontSize: '19px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)'
  },
  table: {
    marginTop: -5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {

  },
  cell: {
    verticalAlign: 'top'
  },
});


export default function LeafSongsPage({ loadedMuseumEntries, searchText, onSongClick }) {
  const classes = useStyles();

  const songs = LeafDataManager.getSongs().filter(s => {
    if (!searchText || searchText.length < 1) {
      return true;
    }

    const name = s.name.toLowerCase();
    const search = searchText.toLowerCase();
    return name.includes(search);
  });

  const collected = songs.filter(song => {
    if (!loadedMuseumEntries || loadedMuseumEntries.length < 1) {
      return false;
    }

    const filtered = loadedMuseumEntries.filter(e => e.metadata.name === song.name);
    return filtered && filtered.length > 0;
  });

  const generateSongElement = (song) => {
    if (loadedMuseumEntries && loadedMuseumEntries.length > 0) {
      const filtered = loadedMuseumEntries.filter(e => e.metadata.name === song.name);
      if (filtered && filtered.length > 0) {
        return (
          <div style={{opacity: 0.2}}>
            <LeafSongCard
              song={song}
              onSongClick={ onSongClick }
            />
          </div>
        );
      }
    }

    return (
      <LeafSongCard
        song={song}
        onSongClick={ onSongClick }
      />
    );
  }

  const songElements = songs.map(s => generateSongElement(s));

  const generateSongRows = () => {
    let generated = [];
    let progress = [];
    for (let el of songElements) {
      if (progress.length >= 4) {
        generated.push(progress);
        progress = [el];
      } else {
        progress.push(el);
      }
    }

    if (progress.length > 0) {
      generated.push(progress);
    }

    return generated.map(row => {
      return (
        <tr className={classes.row}>
          { row.map(r => {
            return (
              <td className={classes.cell}>
                { r }
              </td>
            );
          }) }
        </tr>
      );
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="overline" display="block" className={classes.headerText}>
        { songs.length } songs <span style={{opacity: 0.2}}>| { collected.length } collected</span>
        </Typography>
      </div>

      <table className={classes.table}>
        { generateSongRows() }
      </table>
    </div>
  );
}