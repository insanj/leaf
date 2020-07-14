import React from 'react';

import fandom_villagers_scraped from '../data/fandom_villagers_scraped';
import nintendolife_villager_gift_guide from '../data/nintendolife_villager_gift_guide';
import game8_sea_creatures from '../data/game8_sea_creatures';
import game8_scraped_art from '../data/game8_scraped_art';

var SHARED_LEAF_DATA_MANAGER;

class LeafDataManager {
  constructor(){
    this.villagers = null;
  }

  static getVillagers() {
    return SHARED_LEAF_DATA_MANAGER.getVillagers();
  }

  getVillagers() {
    if (this.villagers) {
      return this.villagers;
    }

    let giftGuide = nintendolife_villager_gift_guide;
    let merged = fandom_villagers_scraped.map(v => {
      const giftGuideEntry = giftGuide.filter(g => g.name === v.name)[0];
      v.colors = giftGuideEntry.colors;
      v.styles = giftGuideEntry.styles;
      return v;
    });
    const localed = merged.map(v => {
      v.originalImage = v.image;

      const name = v.name.replace(" ", "_").replace(".", "");
      v.image = require(`../img/villagers/NH-${name}_poster.png`);
      return v;
    });
    this.villagers = merged;
    return this.villagers;
  }

  static getSeacreatures() {
    return SHARED_LEAF_DATA_MANAGER.getSeacreatures();
  }

  getSeacreatures() {
    const creatures = game8_sea_creatures;
    const localed = creatures.map((c, i) => {
      const bounded = Math.min(Math.max(i+1, 1), 40);
      c.icon = require(`../img/seacreatures/sc_${bounded}_i.png`);
      return c;
    })
    return localed;
  }

  static getArt() {
    return SHARED_LEAF_DATA_MANAGER.getArt();
  }

  getArt() {
    const art = game8_scraped_art["Paintings"].concat(game8_scraped_art["Statues"]);
    const localed = art.map((c, i) => {
      const validated = c.name.replaceAll(" ", "_").toLowerCase();
      c.image = require(`../img/art/${validated}.jpg`); 
      return c;
    });

    const sorted = localed.sort((a1, a2) => {
      return a1.name.toLowerCase().localeCompare(a2.name.toLowerCase());
    })

    return sorted;
  }

}

SHARED_LEAF_DATA_MANAGER = new LeafDataManager();

export default LeafDataManager;