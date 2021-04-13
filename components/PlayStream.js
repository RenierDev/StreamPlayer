import * as React from 'react';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

const PlayStream = () => {
  let playIcon = 'play';
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState();
  const [playerIcon, setPlayerIcon] = React.useState('play');

  async function playStream() {
    // console.log("Loading Stream");
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'https://radio.burgstudio.co.za/radio/8000/radio.mp3' },
      { shouldPlay: true }
    );
    setSound(sound);
    setIsPlaying('playing');
    // console.log("Playing Stream");
    await sound.playAsync();
  }

  async function pauseStream() {
    // console.log("Pausing Stream");
    sound.stopAsync();
    sound.unloadAsync();
    setIsPlaying('paused');
  }

  function playOrPause() {
    if (isPlaying == 'playing') {
      pauseStream();
      setPlayerIcon('play');
    } else {
      playStream();
      setPlayerIcon('pause');
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <FontAwesome
      size={60}
      name={playerIcon}
      color="#ff1818"
      onPress={playOrPause}
      style={{
        alignItems: 'center',
        marginVertical: 80,
      }}
    />
  );
};

export default PlayStream;
