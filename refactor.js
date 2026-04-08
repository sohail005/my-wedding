import fs from 'fs';
import path from 'path';

const srcDir = 'd:/Vite/my-wedding/src';

const dbPath = path.join(srcDir, 'database/db.json');
let dbContent = fs.readFileSync(dbPath, 'utf8');

// Replace db.json keys
dbContent = dbContent
  .replace(/"akad":/g, '"ceremony":')
  .replace(/"resepsi":/g, '"reception":')
  .replace(/"tanggal":/g, '"date":')
  .replace(/"jam":/g, '"time":')
  .replace(/"lokasi":/g, '"location":')
  .replace(/"alamat":/g, '"address":')
  .replace(/"mempelai":/g, '"couple":')
  .replace(/"pria":/g, '"groom":')
  .replace(/"wanita":/g, '"bride":')
  .replace(/"namaDepan":/g, '"firstName":')
  .replace(/"namaBelakang":/g, '"lastName":')
  .replace(/"namaPanggilan":/g, '"nickname":')
  .replace(/"orangTua":/g, '"parents":')
  .replace(/"keterangan":/g, '"description":')
  .replace(/"foto":/g, '"photo":')
  .replace(/"galeri":/g, '"gallery":')
  .replace(/\/assets\/images\/mempelai\/pria\.webp/g, '/assets/images/couple/groom.webp')
  .replace(/\/assets\/images\/mempelai\/wanita\.webp/g, '/assets/images/couple/bride.webp')
  .replace(/\/assets\/images\/galeri\/galeri-/g, '/assets/images/gallery/gallery-');

fs.writeFileSync(dbPath, dbContent);

// A helper to walk through all files and replace contents
function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacements = [
  { from: /import Tanggal from "@\/components\/Tanggal";/g, to: 'import EventDate from "@/components/Date";' },
  { from: /import Mempelai from "@\/components\/Mempelai";/g, to: 'import Couple from "@/components/Couple";' },
  { from: /import Lokasi from "@\/components\/Lokasi";/g, to: 'import Location from "@/components/Location";' },
  { from: /import Galeri from "@\/components\/Galeri";/g, to: 'import Gallery from "@/components/Gallery";' },
  { from: /<Tanggal \/>/g, to: '<EventDate />' },
  { from: /<Mempelai \/>/g, to: '<Couple />' },
  { from: /<Lokasi \/>/g, to: '<Location />' },
  { from: /<Galeri \/>/g, to: '<Gallery />' },
  { from: /id="tanggal"/g, to: 'id="date"' },
  { from: /id="mempelai"/g, to: 'id="couple"' },
  { from: /id="lokasi"/g, to: 'id="location"' },
  { from: /id="galeri"/g, to: 'id="gallery"' },
  { from: /elementId: "tanggal"/g, to: 'elementId: "date"' },
  { from: /elementId: "mempelai"/g, to: 'elementId: "couple"' },
  { from: /elementId: "lokasi"/g, to: 'elementId: "location"' },
  { from: /elementId: "galeri"/g, to: 'elementId: "gallery"' },
  { from: /import CardTanggal from "\.\/CardTanggal";/g, to: 'import CardDate from "./CardDate";' },
  { from: /<CardTanggal/g, to: '<CardDate' },
  
  // Footer changes
  { from: /import KeluargaBesar from "\.\/KeluargaBesar";/g, to: 'import BigFamily from "./BigFamily";' },
  { from: /<KeluargaBesar/g, to: '<BigFamily' },
  
  // Prop usages in components
  { from: /db\.wedding\.mempelai/g, to: 'db.wedding.couple' },
  { from: /db\.wedding/g, to: 'db.wedding' }, // noop
  { from: /db\.galeri/g, to: 'db.gallery' },
  { from: /const { akad, resepsi }/g, to: 'const { ceremony, reception }' },
  { from: /akad\./g, to: 'ceremony.' },
  { from: /resepsi\./g, to: 'reception.' },
  { from: /tanggal={/g, to: 'date={' },
  { from: /jam={/g, to: 'time={' },
  { from: /lokasi={/g, to: 'location={' },
  { from: /alamat={/g, to: 'address={' },
  { from: /const { wanita, pria }/g, to: 'const { bride, groom }' },
  { from: /const { pria, wanita }/g, to: 'const { groom, bride }' },
  { from: /mempelai={/g, to: 'couple={' },
  { from: /mempelai\.foto/g, to: 'couple.photo' },
  { from: /mempelai\.bg/g, to: 'couple.bg' },
  { from: /const { namaDepan, namaBelakang, orangTua }/g, to: 'const { firstName, lastName, parents }' },
  { from: /namaDepan}/g, to: 'firstName}' },
  { from: /namaBelakang}/g, to: 'lastName}' },
  { from: /orangTua\.pria/g, to: 'parents.father' },
  { from: /orangTua\.wanita/g, to: 'parents.mother' },
  { from: /orangTua\.keterangan/g, to: 'parents.description' },
  { from: /orangTuaPria/g, to: 'fatherName' },
  { from: /orangTuaWanita/g, to: 'motherName' },
  
  // CardDate signature changes
  { from: /const CardTanggal = \({ title, tanggal, jam, lokasi, alamat, link }\) /g, to: 'const CardDate = ({ title, date, time, location, address, link }) ' },
  { from: /{tanggal\.split/g, to: '{date.split' },
  { from: /{jam\.split/g, to: '{time.split' },
  { from: /{lokasi\.split/g, to: '{location.split' },
  { from: /{alamat\.split/g, to: '{address.split' },
  { from: /CardTanggal\.propTypes/g, to: 'CardDate.propTypes' },
  { from: /export default React\.memo\(CardTanggal\);/g, to: 'export default React.memo(CardDate);' },
  
  // Date/index.jsx
  { from: /const Tanggal = \(\) =>/g, to: 'const EventDate = () =>' },
  { from: /export default Tanggal;/g, to: 'export default EventDate;' },
  
  // Couple/index.jsx
  { from: /import ProfilMempelai from "\.\/ProfilMempelai";/g, to: 'import ProfileCouple from "./ProfileCouple";' },
  { from: /<ProfilMempelai mempelai={groom} \/>/g, to: '<ProfileCouple couple={groom} />' },
  { from: /<ProfilMempelai mempelai={bride} \/>/g, to: '<ProfileCouple couple={bride} />' },
  { from: /const Mempelai = \(\) =>/g, to: 'const Couple = () =>' },
  { from: /export default Mempelai;/g, to: 'export default Couple;' },
  
  // ProfileCouple.jsx
  { from: /const ProfilMempelai = \({ mempelai }\) =>/g, to: 'const ProfileCouple = ({ couple }) =>' },
  { from: /const ProfilMempelai = \({ couple }\) =>/g, to: 'const ProfileCouple = ({ couple }) =>' },
  { from: /ProfilMempelai\.propTypes/g, to: 'ProfileCouple.propTypes' },
  { from: /export default React\.memo\(ProfilMempelai\);/g, to: 'export default React.memo(ProfileCouple);' },
  
  // BigFamily.jsx
  { from: /const KeluargaBesar =/g, to: 'const BigFamily =' },
  { from: /KeluargaBesar\.propTypes/g, to: 'BigFamily.propTypes' },
  { from: /export default KeluargaBesar;/g, to: 'export default BigFamily;' }
];

walk(srcDir, (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let oldContent = content;
    replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });
    if (content !== oldContent) {
      fs.writeFileSync(filePath, content);
      console.log('Updated:', filePath);
    }
  }
});
