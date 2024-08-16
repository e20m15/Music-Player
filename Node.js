const fs = require('fs');
const path = require('path');

const musicDirectory = path.join(__dirname, 'music');
const outputFile = path.join(__dirname, 'songs.json');

fs.readdir(musicDirectory, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory:', err);
    }

    const songs = files
        .filter(file => file.endsWith('.mp3'))
        .map((file, index) => {
            const title = file.replace(/\.mp3$/, '').replace(/_/g, ' ');
            return {
                "src": `music/${file}`,
                "title": title,
                "imgId": `img-${index + 1}`
            };
        });

    fs.writeFileSync(outputFile, JSON.stringify(songs, null, 2));
    console.log('songs.json has been generated');
});
