import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LeafSongCard from '../components/leafSongCard';
import LeafDataManager from '../backend/leafDataManager';


const useStyles = makeStyles({
  root: {

  },
  table: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {

  },
  cell: {
    verticalAlign: 'top'
  }
});


export default function LeafSongsPage({ loadedSongs, searchText }) {
  const classes = useStyles();

  const songs = LeafDataManager.getSongs();

  const handleSongClick = (song) => {

  }

  const generateSongElement = (song) => {
    return (
      <LeafSongCard
        song={song}
        onSongClick={ handleSongClick }
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
      <table className={classes.table}>
        { generateSongRows() }
      </table>
    </div>
  );
}