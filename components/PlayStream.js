import * as React from 'react';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

const PlayStream = () => {
  let playIcon = 'play';
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState();
  const [playerIcon, setPlayerIcon] = React.useState('play');

  async function play() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'https://radio.burgstudio.co.za/radio/8000/radio.mp3' },
      { shouldPlay: true }
    );
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function pause() {
    sound.stopAsync();
    setIsPlaying(false);
  }

  function playOrPause() {
    if (isPlaying == true) {
      pause();
      setPlayerIcon('play');
    } else {
      play();
      setPlayerIcon('pause');
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.stopAsync();
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
