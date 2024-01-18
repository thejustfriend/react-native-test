// Score.js
import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

const Score = ({navigation, route}) => {
  const [score, setscore] = useState(route.params?.score);
  let data =  [
    { name: 'Player 1', score: 15 },
    { name: 'Player 2', score: 10 },
    { name: 'Player 3', score: 14 },
  ];
  useEffect( () => {
      data.push({name: 'your score', score: score || 0})
      data.sort((a, b) => b.score - a.score)
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text>{item.name}</Text>
            <Text>{item.score} points</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rank: {
    fontWeight: 'bold',
  },
});

export default Score;
