import React from 'react';

var SHARED_LEAF_IMAGE_MANAGER;

class LeafImageManager {
  static getMuseumImages() {
    return SHARED_LEAF_IMAGE_MANAGER.getMuseumImages();
  }

  getMuseumImages() {
    if (this.museumImages) {
      return this.museumImages;
    }

    const images = {
      "bitterling": require('../img/sprites/tiles-348.png'),
      "pale chub": require('../img/sprites/tiles-349.png'),
      "crucian carp": require('../img/sprites/tiles-350.png'),
      "dace": require('../img/sprites/tiles-352.png'),
      "carp": require('../img/sprites/tiles-353.png'),
      "koi": require('../img/sprites/tiles-354.png'),
      "goldfish": require('../img/sprites/tiles-355.png'),
      "pop-eyed goldfish": require('../img/sprites/tiles-356.png'),
      "killifish": require('../img/sprites/tiles-357.png'),
      "crawfish": require('../img/sprites/tiles-358.png'),
      "frog": require('../img/sprites/tiles-359.png'),
      "freshwater goby": require('../img/sprites/tiles-360.png'),
      "loach": require('../img/sprites/tiles-361.png'),
      "catfish": require('../img/sprites/tiles-362.png'),
      "giant snakehead": require('../img/sprites/tiles-363.png'),
      "bluegill": require('../img/sprites/tiles-364.png'),
      "yellow perch": require('../img/sprites/tiles-365.png'),
      "black bass": require('../img/sprites/tiles-366.png'),
      "pike": require('../img/sprites/tiles-367.png'),
      "pond smelt": require('../img/sprites/tiles-368.png'),
      "sweetfish": require('../img/sprites/tiles-369.png'),
      "cherry salmon": require('../img/sprites/tiles-370.png'),
      "char": require('../img/sprites/tiles-371.png'),
      "stringfish": require('../img/sprites/tiles-372.png'),
      "salmon": require('../img/sprites/tiles-374.png'),
      "king salmon": require('../img/sprites/tiles-375.png'),
      "guppy": require('../img/sprites/tiles-376.png'),
      "angelfish": require('../img/sprites/tiles-377.png'),
      "neon tetra": require('../img/sprites/tiles-378.png'),
      "piranha": require('../img/sprites/tiles-379.png'),
      "arowana": require('../img/sprites/tiles-380.png'),
      "dorado": require('../img/sprites/tiles-381.png'),
      "gar": require('../img/sprites/tiles-382.png'),
      "arapaima": require('../img/sprites/tiles-383.png'),
      "sea butterfly": require('../img/sprites/tiles-384.png'),
      "sea horse": require('../img/sprites/tiles-385.png'),
      "clown fish": require('../img/sprites/tiles-386.png'),
      "surgeonfish": require('../img/sprites/tiles-387.png'),
      "butterfly fish": require('../img/sprites/tiles-388.png'),
      "napoleonfish": require('../img/sprites/tiles-389.png'),
      "zebra turkeyfish": require('../img/sprites/tiles-390.png'),
      "puffer fish": require('../img/sprites/tiles-391.png'),
      "horse mackerel": require('../img/sprites/tiles-392.png'),
      "barred knifejaw": require('../img/sprites/tiles-393.png'),
      "sea bass": require('../img/sprites/tiles-394.png'),
      "red snapper": require('../img/sprites/tiles-396.png'),
      "dab": require('../img/sprites/tiles-397.png'),
      "olive flounder": require('../img/sprites/tiles-398.png'),
      "squid": require('../img/sprites/tiles-399.png'),
      "moray eel": require('../img/sprites/tiles-400.png'),
      "football fish": require('../img/sprites/tiles-401.png'),
      "tuna": require('../img/sprites/tiles-402.png'),
      "blue marlin": require('../img/sprites/tiles-403.png'),
      "ray": require('../img/sprites/tiles-404.png'),
      "ocean sunfish": require('../img/sprites/tiles-405.png'),
      "hammerhead shark": require('../img/sprites/tiles-406.png'),
      "great white shark": require('../img/sprites/tiles-407.png'),
      "coelacanth": require('../img/sprites/tiles-408.png'),
      "tadpole": require('../img/sprites/tiles-409.png'),
      "soft-shelled turtle": require('../img/sprites/tiles-410.png'),
      "mitten crab": require('../img/sprites/tiles-411.png'),
      "nibble fish": require('../img/sprites/tiles-412.png'),
      "saddled bichir": require('../img/sprites/tiles-413.png'),
      "oarfish": require('../img/sprites/tiles-414.png'),
      "giant trevally": require('../img/sprites/tiles-415.png'),
      "ribbon eel": require('../img/sprites/tiles-416.png'),
      "whale shark": require('../img/sprites/tiles-418.png'),
      "blowfish": require('../img/sprites/tiles-419.png'),
      "saw shark": require('../img/sprites/tiles-420.png'),
      "sturgeon": require('../img/sprites/tiles-421.png'),
      "tilapia": require('../img/sprites/tiles-422.png'),
      "betta": require('../img/sprites/tiles-423.png'),
      "snapping turtle": require('../img/sprites/tiles-424.png'),
      "golden trout": require('../img/sprites/tiles-425.png'),
      "rainbowfish": require('../img/sprites/tiles-426.png'),
      "anchovy": require('../img/sprites/tiles-427.png'),
      "mahi-mahi": require('../img/sprites/tiles-428.png'),
      "suckerfish": require('../img/sprites/tiles-429.png'),
      "barreleye": require('../img/sprites/tiles-430.png'),
      "ranchu goldfish": require('../img/sprites/tiles-431.png'),
      "common butterfly": require('../img/sprites/tiles-432.png'),
      "yellow butterfly": require('../img/sprites/tiles-433.png'),
      "tiger butterfly": require('../img/sprites/tiles-434.png'),
      "peacock butterfly": require('../img/sprites/tiles-435.png'),
      "monarch butterfly": require('../img/sprites/tiles-436.png'),
      "emperor butterfly": require('../img/sprites/tiles-437.png'),
      "agrias butterfly": require('../img/sprites/tiles-438.png'),
      "rajah brooke's birdwing": require('../img/sprites/tiles-440.png'),
      "queen alexandra's birdwing": require('../img/sprites/tiles-441.png'),
      "moth": require('../img/sprites/tiles-442.png'),
      "atlas moth": require('../img/sprites/tiles-443.png'),
      "honeybee": require('../img/sprites/tiles-444.png'),
      "wasp": require('../img/sprites/tiles-445.png'),
      "long locust": require('../img/sprites/tiles-446.png'),
      "migratory locust": require('../img/sprites/tiles-447.png'),
      "mantis": require('../img/sprites/tiles-448.png'),
      "orchid mantis": require('../img/sprites/tiles-449.png'),
      "brown cicada": require('../img/sprites/tiles-450.png'),
      "robust cicada": require('../img/sprites/tiles-451.png'),
      "walker cicada": require('../img/sprites/tiles-452.png'),
      "evening cicada": require('../img/sprites/tiles-453.png'),
      "red dragonfly": require('../img/sprites/tiles-454.png'),
      "darner dragonfly": require('../img/sprites/tiles-455.png'),
      "banded dragonfly": require('../img/sprites/tiles-456.png'),
      "ant": require('../img/sprites/tiles-457.png'),
      "pondskater": require('../img/sprites/tiles-458.png'),
      "diving beetle": require('../img/sprites/tiles-459.png'),
      "snail": require('../img/sprites/tiles-460.png'),
      "cricket": require('../img/sprites/tiles-462.png'),
      "bell cricket": require('../img/sprites/tiles-463.png'),
      "grasshopper": require('../img/sprites/tiles-464.png'),
      "mole cricket": require('../img/sprites/tiles-465.png'),
      "walking leaf": require('../img/sprites/tiles-466.png'),
      "walking stick": require('../img/sprites/tiles-467.png'),
      "bagworm": require('../img/sprites/tiles-468.png'),
      "ladybug": require('../img/sprites/tiles-469.png'),
      "violin beetle": require('../img/sprites/tiles-470.png'),
      "citrus long-horned beetle": require('../img/sprites/tiles-471.png'),
      "dung beetle": require('../img/sprites/tiles-472.png'),
      "firefly": require('../img/sprites/tiles-473.png'),
      "earth-boring dung beetle": require('../img/sprites/tiles-474.png'),
      "scarab beetle": require('../img/sprites/tiles-475.png'),
      "jewel beetle": require('../img/sprites/tiles-476.png'),
      "saw stag": require('../img/sprites/tiles-478.png'),
      "miyama stag": require('../img/sprites/tiles-478.png'),
      "giant stag": require('../img/sprites/tiles-479.png'),
      "rainbow stag": require('../img/sprites/tiles-480.png'),
      "cyclommatus stag": require('../img/sprites/tiles-481.png'),
      "golden stag": require('../img/sprites/tiles-482.png'),
      "horned dynastid": require('../img/sprites/tiles-484.png'),
      "horned atlas": require('../img/sprites/tiles-485.png'),
      "horned elephant": require('../img/sprites/tiles-486.png'),
      "horned hercules": require('../img/sprites/tiles-487.png'),
      "goliath beetle": require('../img/sprites/tiles-488.png'),
      "flea": require('../img/sprites/tiles-489.png'),
      "pill bug": require('../img/sprites/tiles-490.png'),
      "mosquito": require('../img/sprites/tiles-491.png'),
      "fly": require('../img/sprites/tiles-492.png'),
      "centipede": require('../img/sprites/tiles-493.png'),
      "spider": require('../img/sprites/tiles-494.png'),
      "tarantula": require('../img/sprites/tiles-495.png'),
      "scorpion": require('../img/sprites/tiles-496.png'),
      "stinkbug": require('../img/sprites/tiles-497.png'),
      "giant cicada": require('../img/sprites/tiles-498.png'),
      "hermit crab": require('../img/sprites/tiles-499.png'),
      "rice grasshopper": require('../img/sprites/tiles-500.png'),
      "cicada shell": require('../img/sprites/tiles-501.png'),
      "tiger beetle": require('../img/sprites/tiles-502.png'),
      "wharf roach": require('../img/sprites/tiles-503.png'),
      "common bluebottle": require('../img/sprites/tiles-504.png'),
      "paper kite butterfly": require('../img/sprites/tiles-506.png'),
      "great purple emperor": require('../img/sprites/tiles-507.png'),
      "drone beetle": require('../img/sprites/tiles-508.png'),
      "giant water bug": require('../img/sprites/tiles-509.png'),
      "giraffe stag": require('../img/sprites/tiles-510.png'),
      "man-faced stink bug": require('../img/sprites/tiles-511.png'),
      "madagascan sunset moth": require('../img/sprites/tiles-512.png'),
      "blue weevil beetle": require('../img/sprites/tiles-513.png'),
      "damselfly": require('../img/sprites/tiles-514.png'),
      "rosalia batesi beetle": require('../img/sprites/tiles-515.png'),

      "acanthostega": require('../img/fossils/fossil_alphabetical_0.jpg'),
      "amber": require('../img/fossils/fossil_alphabetical_1.jpg'),
      "ammonite": require('../img/fossils/fossil_alphabetical_2.jpg'),

      "ankylo skull": require('../img/fossils/fossil_alphabetical_3.jpg'),
      "ankylo torso": require('../img/fossils/fossil_alphabetical_3.jpg'),
      "ankylo tail": require('../img/fossils/fossil_alphabetical_3.jpg'),

      "anomalocaris": require('../img/fossils/fossil_alphabetical_4.jpg'),
      "archaeopteryx": require('../img/fossils/fossil_alphabetical_5.jpg'),
      
      "archelon skull": require('../img/fossils/fossil_alphabetical_6.jpg'),
      "archelon tail": require('../img/fossils/fossil_alphabetical_6.jpg'),

      "australopith": require('../img/fossils/fossil_alphabetical_7.jpg'),

      "brachio pelvis": require('../img/fossils/fossil_alphabetical_8.jpg'),
      "brachio chest": require('../img/fossils/fossil_alphabetical_8.jpg'),
      "brachio skull": require('../img/fossils/fossil_alphabetical_8.jpg'),
      "brachio tail": require('../img/fossils/fossil_alphabetical_8.jpg'),

      "coprolite": require('../img/fossils/fossil_alphabetical_9.jpg'),

      "ophthalmo skull": require('../img/fossils/fossil_alphabetical_10.jpg'),
      "ophthalmo torso": require('../img/fossils/fossil_alphabetical_10.jpg'),

      "deinony skull": require('../img/fossils/fossil_alphabetical_11.jpg'),
      "deinony tail": require('../img/fossils/fossil_alphabetical_11.jpg'),
      "deinony torso": require('../img/fossils/fossil_alphabetical_11.jpg'),

      "dimetrodon skull": require('../img/fossils/fossil_alphabetical_12.jpg'),
      "dimetrodon torso": require('../img/fossils/fossil_alphabetical_12.jpg'),
      "dimetrodon tail": require('../img/fossils/fossil_alphabetical_12.jpg'),

      "dinosaur track": require('../img/fossils/fossil_alphabetical_13.jpg'),
      
      "diplo skull": require('../img/fossils/fossil_alphabetical_14.jpg'),
      "diplo neck": require('../img/fossils/fossil_alphabetical_14.jpg'),
      "diplo pelvis": require('../img/fossils/fossil_alphabetical_14.jpg'),
      "diplo tail": require('../img/fossils/fossil_alphabetical_14.jpg'),
      "diplo chest": require('../img/fossils/fossil_alphabetical_14.jpg'),
      "diplo tail tip": require('../img/fossils/fossil_alphabetical_14.jpg'),

      "dunkleosteus": require('../img/fossils/fossil_alphabetical_15.jpg'),
      "eusthenopteron": require('../img/fossils/fossil_alphabetical_16.jpg'),
     
      "iguanadon skull": require('../img/fossils/fossil_alphabetical_17.jpg'),
      "iguanadon tail": require('../img/fossils/fossil_alphabetical_17.jpg'),
      "iguanadon torso": require('../img/fossils/fossil_alphabetical_17.jpg'),

      "juramaia": require('../img/fossils/fossil_alphabetical_18.jpg'),
     
      "mammoth skull": require('../img/fossils/fossil_alphabetical_19.jpg'),
      "mammoth torso": require('../img/fossils/fossil_alphabetical_19.jpg'),

      "megacero skull": require('../img/fossils/fossil_alphabetical_20.jpg'),
      "megacero torso": require('../img/fossils/fossil_alphabetical_20.jpg'),
      "megacero tail": require('../img/fossils/fossil_alphabetical_20.jpg'),

      "left megalo side": require('../img/fossils/fossil_alphabetical_21.jpg'),
      "right megalo side": require('../img/fossils/fossil_alphabetical_21.jpg'),

      "myllokunmingia": require('../img/fossils/fossil_alphabetical_22.jpg'),

      "pachy skull": require('../img/fossils/fossil_alphabetical_23.jpg'),
      "pachy tail": require('../img/fossils/fossil_alphabetical_23.jpg'),

      "parasaur skull": require('../img/fossils/fossil_alphabetical_24.jpg'),
      "parasaur torso": require('../img/fossils/fossil_alphabetical_24.jpg'),
      "parasaur tail": require('../img/fossils/fossil_alphabetical_24.jpg'),

      "plesio skull": require('../img/fossils/fossil_alphabetical_25.jpg'),
      "plesio torso": require('../img/fossils/fossil_alphabetical_25.jpg'),
      "plesio tail": require('../img/fossils/fossil_alphabetical_25.jpg'),

      "ptera body": require('../img/fossils/fossil_alphabetical_26.jpg'),
      "right ptera wing": require('../img/fossils/fossil_alphabetical_26.jpg'),
      "left ptera wing": require('../img/fossils/fossil_alphabetical_26.jpg'),

      "quetzal torso": require('../img/fossils/fossil_alphabetical_27.jpg'),
      "right quetzal wing": require('../img/fossils/fossil_alphabetical_27.jpg'),
      "left quetzal wing": require('../img/fossils/fossil_alphabetical_27.jpg'),

      "sabertooth skull": require('../img/fossils/fossil_alphabetical_28.jpg'),
      "sabertooth tail": require('../img/fossils/fossil_alphabetical_28.jpg'),

      "shark tooth": require('../img/fossils/fossil_alphabetical_29.jpg'),

      "spino skull": require('../img/fossils/fossil_alphabetical_30.jpg'),
      "spino torso": require('../img/fossils/fossil_alphabetical_30.jpg'),
      "spino tail": require('../img/fossils/fossil_alphabetical_30.jpg'),

      "stego torso": require('../img/fossils/fossil_alphabetical_31.jpg'),
      "stego tail": require('../img/fossils/fossil_alphabetical_31.jpg'),
      "stego skull": require('../img/fossils/fossil_alphabetical_31.jpg'),

      "t. rex skull": require('../img/fossils/fossil_alphabetical_32.jpg'),
      "t. rex torso": require('../img/fossils/fossil_alphabetical_32.jpg'),
      "t. rex tail": require('../img/fossils/fossil_alphabetical_32.jpg'),

      "tricera skull": require('../img/fossils/fossil_alphabetical_33.jpg'),
      "tricera torso": require('../img/fossils/fossil_alphabetical_33.jpg'),
      "tricera tail": require('../img/fossils/fossil_alphabetical_33.jpg'),

      "trilobite": require('../img/fossils/fossil_alphabetical_34.jpg'),
    };

    this.museumImages = images;
    return this.museumImages;
  }

  static getMuseumImageForName(name) {
    return SHARED_LEAF_IMAGE_MANAGER.getMuseumImageForName(name);
  }

  getMuseumImageForName(name) {
    if (!name || name.length < 1) {
      return null;
    }

    const validated = name.toLowerCase();
    const images = this.getMuseumImages();
    const matched = images[validated];
    return matched;
  }
} 

SHARED_LEAF_IMAGE_MANAGER = new LeafImageManager();

export default LeafImageManager;

