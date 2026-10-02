import type { ImageMetadata } from 'astro';
import fifa22 from '../assets/brands/fifa22.svg';
import google from '../assets/brands/google.svg';
import samsung from '../assets/brands/samsung.svg';
import adidas from '../assets/brands/adidas.svg';
import redbull from '../assets/brands/redbull.svg';
import youtube from '../assets/brands/youtube.svg';
import gemini from '../assets/brands/gemini.svg';
import gillette from '../assets/brands/gillette.svg';
import lenovo from '../assets/brands/lenovo.svg';
import oppo from '../assets/brands/oppo.svg';
import rexona from '../assets/brands/rexona.svg';
import clear from '../assets/brands/clear.svg';
import emaar from '../assets/brands/emaar.svg';
import talabat from '../assets/brands/talabat.svg';
import indrive from '../assets/brands/indrive.svg';
import gea from '../assets/brands/gea.svg';
import btech from '../assets/brands/btech.png';
import palmhills from '../assets/brands/palmhills.svg';
import fury from '../assets/brands/fury.svg';
import owest from '../assets/brands/owest.svg';
import tornado from '../assets/brands/tornado.svg';

export interface Brand {
  name: string;
  /** Official logo (dark-theme version, see scripts/recolor-logos.py). Without one, the name is typeset. */
  logo?: ImageMetadata;
  /** Max logo height as a share of the tile, for optical balance between wide and compact marks. */
  h?: number;
}

// Mohanad's list, shown A–Z.
export const brands: Brand[] = [
  { name: 'adidas', logo: adidas, h: 46 },
  { name: 'B.TECH', logo: btech, h: 50 },
  { name: 'Clear', logo: clear, h: 30 },
  { name: 'Emaar', logo: emaar, h: 28 },
  { name: 'FIFA World Cup Qatar 2022', logo: fifa22, h: 40 },
  { name: 'Fury', logo: fury, h: 66 },
  { name: 'Gemini', logo: gemini, h: 30 },
  { name: 'General Entertainment Authority', logo: gea, h: 56 },
  { name: 'Gillette', logo: gillette, h: 30 },
  { name: 'Google', logo: google, h: 36 },
  { name: 'inDrive', logo: indrive, h: 34 },
  { name: 'Lenovo', logo: lenovo, h: 30 },
  { name: 'O West', logo: owest, h: 58 },
  { name: 'OPPO', logo: oppo, h: 28 },
  { name: 'Palm Hills', logo: palmhills, h: 40 },
  { name: 'Red Bull', logo: redbull, h: 34 },
  { name: 'Rexona', logo: rexona, h: 50 },
  { name: 'Samsung', logo: samsung, h: 28 },
  { name: 'talabat', logo: talabat, h: 32 },
  { name: 'Tornado', logo: tornado, h: 26 },
  { name: 'YouTube', logo: youtube, h: 30 },
].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
