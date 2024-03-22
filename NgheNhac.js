import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default function NgheNhac() {
  const [sound, setSound] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songs = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  ];

  async function play() {
    const { sound } = await Audio.Sound.createAsync({
      uri: songs[currentSongIndex],
    });
    setSound(sound);
    await sound.playAsync();
  }

  async function pause() {
    if (sound) {
      await sound.stopAsync();
    }
  }

  function playNextSong() {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  }

  function playPreviousSong() {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Nghe Nhạc</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={playPreviousSong}>
          <Text style={styles.buttonText}>Lùi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.pauseButton]}onPress={play}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.pauseButton]}
          onPress={pause}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={playNextSong}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: "#FF5722",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});