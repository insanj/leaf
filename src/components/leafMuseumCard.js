import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import PlusOneIcon from '@material-ui/icons/PlusOne';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import tile0 from '../img/sprites/tiles-0.png';
    

import tile348 from '../img/sprites/tiles-348.png';
import tile349 from '../img/sprites/tiles-349.png';
import tile350 from '../img/sprites/tiles-350.png';
import tile352 from '../img/sprites/tiles-352.png';
import tile353 from '../img/sprites/tiles-353.png';
import tile354 from '../img/sprites/tiles-354.png';
import tile355 from '../img/sprites/tiles-355.png';
import tile356 from '../img/sprites/tiles-356.png';
import tile357 from '../img/sprites/tiles-357.png';
import tile358 from '../img/sprites/tiles-358.png';
import tile359 from '../img/sprites/tiles-359.png';
import tile360 from '../img/sprites/tiles-360.png';
import tile361 from '../img/sprites/tiles-361.png';
import tile362 from '../img/sprites/tiles-362.png';
import tile363 from '../img/sprites/tiles-363.png';
import tile364 from '../img/sprites/tiles-364.png';
import tile365 from '../img/sprites/tiles-365.png';
import tile366 from '../img/sprites/tiles-366.png';
import tile367 from '../img/sprites/tiles-367.png';
import tile368 from '../img/sprites/tiles-368.png';
import tile369 from '../img/sprites/tiles-369.png';
import tile370 from '../img/sprites/tiles-370.png';
import tile371 from '../img/sprites/tiles-371.png';
import tile372 from '../img/sprites/tiles-372.png';
import tile374 from '../img/sprites/tiles-374.png';
import tile375 from '../img/sprites/tiles-375.png';
import tile376 from '../img/sprites/tiles-376.png';
import tile377 from '../img/sprites/tiles-377.png';
import tile378 from '../img/sprites/tiles-378.png';
import tile379 from '../img/sprites/tiles-379.png';
import tile380 from '../img/sprites/tiles-380.png';
import tile381 from '../img/sprites/tiles-381.png';
import tile382 from '../img/sprites/tiles-382.png';
import tile383 from '../img/sprites/tiles-383.png';
import tile384 from '../img/sprites/tiles-384.png';
import tile385 from '../img/sprites/tiles-385.png';
import tile386 from '../img/sprites/tiles-386.png';
import tile387 from '../img/sprites/tiles-387.png';
import tile388 from '../img/sprites/tiles-388.png';
import tile389 from '../img/sprites/tiles-389.png';
import tile390 from '../img/sprites/tiles-390.png';
import tile391 from '../img/sprites/tiles-391.png';
import tile392 from '../img/sprites/tiles-392.png';
import tile393 from '../img/sprites/tiles-393.png';
import tile394 from '../img/sprites/tiles-394.png';
import tile396 from '../img/sprites/tiles-396.png';
import tile397 from '../img/sprites/tiles-397.png';
import tile398 from '../img/sprites/tiles-398.png';
import tile399 from '../img/sprites/tiles-399.png';
import tile400 from '../img/sprites/tiles-400.png';
import tile401 from '../img/sprites/tiles-401.png';
import tile402 from '../img/sprites/tiles-402.png';
import tile403 from '../img/sprites/tiles-403.png';
import tile404 from '../img/sprites/tiles-404.png';
import tile405 from '../img/sprites/tiles-405.png';
import tile406 from '../img/sprites/tiles-406.png';
import tile407 from '../img/sprites/tiles-407.png';
import tile408 from '../img/sprites/tiles-408.png';
import tile409 from '../img/sprites/tiles-409.png';
import tile410 from '../img/sprites/tiles-410.png';
import tile411 from '../img/sprites/tiles-411.png';
import tile412 from '../img/sprites/tiles-412.png';
import tile413 from '../img/sprites/tiles-413.png';
import tile414 from '../img/sprites/tiles-414.png';
import tile415 from '../img/sprites/tiles-415.png';
import tile416 from '../img/sprites/tiles-416.png';
import tile418 from '../img/sprites/tiles-418.png';
import tile419 from '../img/sprites/tiles-419.png';
import tile420 from '../img/sprites/tiles-420.png';
import tile421 from '../img/sprites/tiles-421.png';
import tile422 from '../img/sprites/tiles-422.png';
import tile423 from '../img/sprites/tiles-423.png';
import tile424 from '../img/sprites/tiles-424.png';
import tile425 from '../img/sprites/tiles-425.png';
import tile426 from '../img/sprites/tiles-426.png';
import tile427 from '../img/sprites/tiles-427.png';
import tile428 from '../img/sprites/tiles-428.png';
import tile429 from '../img/sprites/tiles-429.png';
import tile430 from '../img/sprites/tiles-430.png';
import tile431 from '../img/sprites/tiles-431.png';
import tile432 from '../img/sprites/tiles-432.png';
import tile433 from '../img/sprites/tiles-433.png';
import tile434 from '../img/sprites/tiles-434.png';
import tile435 from '../img/sprites/tiles-435.png';
import tile436 from '../img/sprites/tiles-436.png';
import tile437 from '../img/sprites/tiles-437.png';
import tile438 from '../img/sprites/tiles-438.png';
import tile440 from '../img/sprites/tiles-440.png';
import tile441 from '../img/sprites/tiles-441.png';
import tile442 from '../img/sprites/tiles-442.png';
import tile443 from '../img/sprites/tiles-443.png';
import tile444 from '../img/sprites/tiles-444.png';
import tile445 from '../img/sprites/tiles-445.png';
import tile446 from '../img/sprites/tiles-446.png';
import tile447 from '../img/sprites/tiles-447.png';
import tile448 from '../img/sprites/tiles-448.png';
import tile449 from '../img/sprites/tiles-449.png';
import tile450 from '../img/sprites/tiles-450.png';
import tile451 from '../img/sprites/tiles-451.png';
import tile452 from '../img/sprites/tiles-452.png';
import tile453 from '../img/sprites/tiles-453.png';
import tile454 from '../img/sprites/tiles-454.png';
import tile455 from '../img/sprites/tiles-455.png';
import tile456 from '../img/sprites/tiles-456.png';
import tile457 from '../img/sprites/tiles-457.png';
import tile458 from '../img/sprites/tiles-458.png';
import tile459 from '../img/sprites/tiles-459.png';
import tile460 from '../img/sprites/tiles-460.png';
import tile462 from '../img/sprites/tiles-462.png';
import tile463 from '../img/sprites/tiles-463.png';
import tile464 from '../img/sprites/tiles-464.png';
import tile465 from '../img/sprites/tiles-465.png';
import tile466 from '../img/sprites/tiles-466.png';
import tile467 from '../img/sprites/tiles-467.png';
import tile468 from '../img/sprites/tiles-468.png';
import tile469 from '../img/sprites/tiles-469.png';
import tile470 from '../img/sprites/tiles-470.png';
import tile471 from '../img/sprites/tiles-471.png';
import tile472 from '../img/sprites/tiles-472.png';
import tile473 from '../img/sprites/tiles-473.png';
import tile474 from '../img/sprites/tiles-474.png';
import tile475 from '../img/sprites/tiles-475.png';
import tile476 from '../img/sprites/tiles-476.png';
import tile477 from '../img/sprites/tiles-477.png';
import tile478 from '../img/sprites/tiles-478.png';
import tile479 from '../img/sprites/tiles-479.png';
import tile480 from '../img/sprites/tiles-480.png';
import tile481 from '../img/sprites/tiles-481.png';
import tile482 from '../img/sprites/tiles-482.png';
import tile484 from '../img/sprites/tiles-484.png';
import tile485 from '../img/sprites/tiles-485.png';
import tile486 from '../img/sprites/tiles-486.png';
import tile487 from '../img/sprites/tiles-487.png';
import tile488 from '../img/sprites/tiles-488.png';
import tile489 from '../img/sprites/tiles-489.png';
import tile490 from '../img/sprites/tiles-490.png';
import tile491 from '../img/sprites/tiles-491.png';
import tile492 from '../img/sprites/tiles-492.png';
import tile493 from '../img/sprites/tiles-493.png';
import tile494 from '../img/sprites/tiles-494.png';
import tile495 from '../img/sprites/tiles-495.png';
import tile496 from '../img/sprites/tiles-496.png';
import tile497 from '../img/sprites/tiles-497.png';
import tile498 from '../img/sprites/tiles-498.png';
import tile499 from '../img/sprites/tiles-499.png';
import tile500 from '../img/sprites/tiles-500.png';
import tile501 from '../img/sprites/tiles-501.png';
import tile502 from '../img/sprites/tiles-502.png';
import tile503 from '../img/sprites/tiles-503.png';
import tile504 from '../img/sprites/tiles-504.png';
import tile506 from '../img/sprites/tiles-506.png';
import tile507 from '../img/sprites/tiles-507.png';
import tile508 from '../img/sprites/tiles-508.png';
import tile509 from '../img/sprites/tiles-509.png';
import tile510 from '../img/sprites/tiles-510.png';
import tile511 from '../img/sprites/tiles-511.png';
import tile512 from '../img/sprites/tiles-512.png';
import tile513 from '../img/sprites/tiles-513.png';
import tile514 from '../img/sprites/tiles-514.png';
import tile515 from '../img/sprites/tiles-515.png';
    

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '65px',
    padding: "10px",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5px',

    width: '65px',
    [theme.breakpoints.up('xs')]: {
      width: 'calc(30vw - 20px)',
    },
    [theme.breakpoints.up('sm')]: {
      width: '20vw !important',
    },
    [theme.breakpoints.up('md')]: {
      width: '14vw !important',
    },
    [theme.breakpoints.up('lg')]: {
      width: '10vw !important',
    }
  },
  
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  title: {
    textAlign: 'center', 
    fontWeight: 400,
    fontSize: '1.0em', 
    lineHeight: 1.0,
    hyphens: 'auto'


  }
}));

export default function LeafMuseumCard({ item, image=null, onItemIconClick, hasMuseumEntry=false, isArtwork }) {
  const classes = useStyles();
  const theme = useTheme();

  const getImageForItem = () => {
    if (image) {
      return image;
    }

    const searchableTitle = item.title.toLowerCase();

    // fish
    if (searchableTitle === "bitterling") {
      return tile348;
    } else if (searchableTitle === "pale chub") {
      return tile349;
    } else if (searchableTitle === "crucian carp") {
      return tile350;
    } else if (searchableTitle === "dace") {
      return tile352;
    } else if (searchableTitle === "carp") {
      return tile353;
    } else if (searchableTitle === "koi") {
      return tile354;
    } else if (searchableTitle === "goldfish") {
      return tile355;
    } else if (searchableTitle === "pop-eyed goldfish") {
      return tile356;
    } else if (searchableTitle === "killifish") {
      return tile357;
    } else if (searchableTitle === "crawfish") {
      return tile358;
    } else if (searchableTitle === "frog") {
      return tile359;
    } else if (searchableTitle === "freshwater goby") {
      return tile360;
    } else if (searchableTitle === "loach") {
      return tile361;
    } else if (searchableTitle === "catfish") {
      return tile362;
    } else if (searchableTitle === "giant snakehead") {
      return tile363;
    } else if (searchableTitle === "bluegill") {
      return tile364;
    } else if (searchableTitle === "yellow perch") {
      return tile365;
    } else if (searchableTitle === "black bass") {
      return tile366;
    } else if (searchableTitle === "pike") {
      return tile367;
    } else if (searchableTitle === "pond smelt") {
      return tile368;
    } else if (searchableTitle === "sweetfish") {
      return tile369;
    } else if (searchableTitle === "cherry salmon") {
      return tile370;
    } else if (searchableTitle === "char") {
      return tile371;
    } else if (searchableTitle === "stringfish") {
      return tile372;
    } else if (searchableTitle === "salmon") {
      return tile374;
    } else if (searchableTitle === "king salmon") {
      return tile375;
    } else if (searchableTitle === "guppy") {
      return tile376;
    } else if (searchableTitle === "angelfish") {
      return tile377;
    } else if (searchableTitle === "neon tetra") {
      return tile378;
    } else if (searchableTitle === "piranha") {
      return tile379;
    } else if (searchableTitle === "arowana") {
      return tile380;
    } else if (searchableTitle === "dorado") {
      return tile381;
    } else if (searchableTitle === "gar") {
      return tile382;
    } else if (searchableTitle === "arapaima") {
      return tile383;
    } else if (searchableTitle === "sea butterfly") {
      return tile384;
    } else if (searchableTitle === "sea horse") {
      return tile385;
    } else if (searchableTitle === "clown fish") {
      return tile386;
    } else if (searchableTitle === "surgeonfish") {
      return tile387;
    } else if (searchableTitle === "butterfly fish") {
      return tile388;
    } else if (searchableTitle === "napoleonfish") {
      return tile389;
    } else if (searchableTitle === "zebra turkeyfish") {
      return tile390;
    } else if (searchableTitle === "puffer fish") {
      return tile391;
    } else if (searchableTitle === "horse mackerel") {
      return tile392;
    } else if (searchableTitle === "barred knifejaw") {
      return tile393;
    } else if (searchableTitle === "sea bass") {
      return tile394;
    } else if (searchableTitle === "red snapper") {
      return tile396;
    } else if (searchableTitle === "dab") {
      return tile397;
    } else if (searchableTitle === "olive flounder") {
      return tile398;
    } else if (searchableTitle === "squid") {
      return tile399;
    } else if (searchableTitle === "moray eel") {
      return tile400;
    } else if (searchableTitle === "football fish") {
      return tile401;
    } else if (searchableTitle === "tuna") {
      return tile402;
    } else if (searchableTitle === "blue marlin") {
      return tile403;
    } else if (searchableTitle === "ray") {
      return tile404;
    } else if (searchableTitle === "ocean sunfish") {
      return tile405;
    } else if (searchableTitle === "hammerhead shark") {
      return tile406;
    } else if (searchableTitle === "great white shark") {
      return tile407;
    } else if (searchableTitle === "coelacanth") {
      return tile408;
    } else if (searchableTitle === "tadpole") {
      return tile409;
    } else if (searchableTitle === "soft-shelled turtle") {
      return tile410;
    } else if (searchableTitle === "mitten crab") {
      return tile411;
    } else if (searchableTitle === "nibble fish") {
      return tile412;
    } else if (searchableTitle === "saddled bichir") {
      return tile413;
    } else if (searchableTitle === "oarfish") {
      return tile414;
    } else if (searchableTitle === "giant trevally") {
      return tile415;
    } else if (searchableTitle === "ribbon eel") {
      return tile416;
    } else if (searchableTitle === "whale shark") {
      return tile418;
    } else if (searchableTitle === "blowfish") {
      return tile419;
    } else if (searchableTitle === "saw shark") {
      return tile420;
    } else if (searchableTitle === "sturgeon") {
      return tile421;
    } else if (searchableTitle === "tilapia") {
      return tile422;
    } else if (searchableTitle === "betta") {
      return tile423;
    } else if (searchableTitle === "snapping turtle") {
      return tile424;
    } else if (searchableTitle === "golden trout") {
      return tile425;
    } else if (searchableTitle === "rainbowfish") {
      return tile426;
    } else if (searchableTitle === "anchovy") {
      return tile427;
    } else if (searchableTitle === "mahi-mahi") {
      return tile428;
    } else if (searchableTitle === "suckerfish") {
      return tile429;
    } else if (searchableTitle === "barreleye") {
      return tile430;
    } else if (searchableTitle === "ranchu goldfish") {
      return tile431;
    }

    // insects
    else if (searchableTitle === "common butterfly") {
      return tile432;
    } else if (searchableTitle === "yellow butterfly") {
      return tile433;
    } else if (searchableTitle === "tiger butterfly") {
      return tile434;
    } else if (searchableTitle === "peacock butterfly") {
      return tile435;
    } else if (searchableTitle === "monarch butterfly") {
      return tile436;
    } else if (searchableTitle === "emperor butterfly") {
      return tile437;
    } else if (searchableTitle === "agrias butterfly") {
      return tile438;
    } else if (searchableTitle === "rajah brooke's birdwing") {
      return tile440;
    } else if (searchableTitle === "queen alexandra's birdwing") {
      return tile441;
    } else if (searchableTitle === "moth") {
      return tile442;
    } else if (searchableTitle === "atlas moth") {
      return tile443;
    } else if (searchableTitle === "honeybee") {
      return tile444;
    } else if (searchableTitle === "wasp") {
      return tile445;
    } else if (searchableTitle === "long locust") {
      return tile446;
    } else if (searchableTitle === "migratory locust") {
      return tile447;
    } else if (searchableTitle === "mantis") {
      return tile448;
    } else if (searchableTitle === "orchid mantis") {
      return tile449;
    } else if (searchableTitle === "brown cicada") {
      return tile450;
    } else if (searchableTitle === "robust cicada") {
      return tile451;
    }  else if (searchableTitle === "walker cicada") {
      return tile452;
    }  else if (searchableTitle === "evening cicada") {
      return tile453;
    }  else if (searchableTitle === "red dragonfly") {
      return tile454;
    }  else if (searchableTitle === "darner dragonfly") {
      return tile455;
    }  else if (searchableTitle === "banded dragonfly") {
      return tile456;
    }  else if (searchableTitle === "ant") {
      return tile457;
    }  else if (searchableTitle === "pondskater") {
      return tile458;
    }  else if (searchableTitle === "diving beetle") {
      return tile459;
    }  else if (searchableTitle === "snail") {
      return tile460;
    } else if (searchableTitle === "cricket") {
      return tile462;
    } else if (searchableTitle === "bell cricket") {
      return tile463;
    } else if (searchableTitle === "grasshopper") {
      return tile464;
    } else if (searchableTitle === "mole cricket") {
      return tile465;
    } else if (searchableTitle === "walking leaf") {
      return tile466;
    } else if (searchableTitle === "walking stick") {
      return tile467;
    } else if (searchableTitle === "bagworm") {
      return tile468;
    } else if (searchableTitle === "ladybug") {
      return tile469;
    } else if (searchableTitle === "violin beetle") {
      return tile470;
    } else if (searchableTitle === "citrus long-horned beetle") {
      return tile471;
    } else if (searchableTitle === "dung beetle") {
      return tile472;
    } else if (searchableTitle === "firefly") {
      return tile473;
    } else if (searchableTitle === "earth-boring dung beetle") {
      return tile474;
    } else if (searchableTitle === "scarab beetle") {
      return tile475;
    } else if (searchableTitle === "jewel beetle") {
      return tile476;
    } else if (searchableTitle === "abc") { /// <<<____
      return tile477;
    } else if (searchableTitle === "saw stag") {
      return tile478;
    } else if (searchableTitle === "miyama stag") {
      return tile478;
    } else if (searchableTitle === "giant stag") {
      return tile479;
    } else if (searchableTitle === "rainbow stag") {
      return tile480;
    } else if (searchableTitle === "cyclommatus stag") {
      return tile481;
    } else if (searchableTitle === "golden stag") {
      return tile482;
    } else if (searchableTitle === "horned dynastid") {
      return tile484;
    } else if (searchableTitle === "horned atlas") {
      return tile485;
    } else if (searchableTitle === "horned elephant") {
      return tile486;
    } else if (searchableTitle === "horned hercules") {
      return tile487;
    } else if (searchableTitle === "goliath beetle") {
      return tile488;
    } else if (searchableTitle === "flea") {
      return tile489;
    } else if (searchableTitle === "pill bug") {
      return tile490;
    } else if (searchableTitle === "mosquito") {
      return tile491;
    } else if (searchableTitle === "fly") {
      return tile492;
    } else if (searchableTitle === "centipede") {
      return tile493;
    } else if (searchableTitle === "spider") {
      return tile494;
    } else if (searchableTitle === "tarantula") {
      return tile495;
    } else if (searchableTitle === "scorpion") {
      return tile496;
    } else if (searchableTitle === "stinkbug") {
      return tile497;
    } else if (searchableTitle === "giant cicada") {
      return tile498;
    } else if (searchableTitle === "hermit crab") {
      return tile499;
    } else if (searchableTitle === "rice grasshopper") {
      return tile500;
    } else if (searchableTitle === "cicada shell") {
      return tile501;
    } else if (searchableTitle === "tiger beetle") {
      return tile502;
    } else if (searchableTitle === "wharf roach") {
      return tile503;
    } else if (searchableTitle === "common bluebottle") {
      return tile504;
    } else if (searchableTitle === "paper kite butterfly") {
      return tile506;
    } else if (searchableTitle === "great purple emperor") {
      return tile507;
    } else if (searchableTitle === "drone beetle") {
      return tile508;
    } else if (searchableTitle === "giant water bug") {
      return tile509;
    } else if (searchableTitle === "giraffe stag") {
      return tile510;
    } else if (searchableTitle === "man-faced stink bug") {
      return tile511;
    } else if (searchableTitle === "madagascan sunset moth") {
      return tile512;
    } else if (searchableTitle === "blue weevil beetle") {
      return tile513;
    } else if (searchableTitle === "damselfly") {
      return tile514;
    } else if (searchableTitle === "rosalia batesi beetle") {
      return tile515;
    } 

    return tile0;
  }

//         ${numberWithCommas(item.price)}

  const subtitle = (
    <table style={{
      tableLayout: 'fixed',
      width: '100%',
      textAlign: 'center',
      lineHeight: 1.0,
    }}>
      <tr className={classes.subtitleElement} style={{ fontWeight: 600, fontSize: '0.8em'}}>
        { item.price && item.price.length > 0 ? '$' : '' }{ item.price.replace(" Bells", "") }
      </tr>

      <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em' }}>
        {item.location}
      </tr>

      <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em', opacity: 0.7 }}>
        {item.time}
      </tr>

      { item.rarity && item.rarity !== "N/A" ? (
        <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em', opacity: 0.7 }}>
          {item.rarity}
        </tr>
      ) : ''}
    </table>
  );

  return (
    <Card className={classes.root} style={{opacity: hasMuseumEntry === true ? 0.2 : 1.0}}>
      <center>
        <img src={ item.image ? item.image : getImageForItem() } style={{
          background: 'none',
          borderRadius: '10px',
          objectFit: 'contain',
          cursor: 'pointer',
          width: !isArtwork ? '62px' : '100px',
          height: !isArtwork ? '62px' : '100px',
        }} onClick={() => onItemIconClick(item) } />
      </center>
      <Typography className={classes.title}>
        { item.title }
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        { subtitle }
      </Typography>
    </Card>
  );
}