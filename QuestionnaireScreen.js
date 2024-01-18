import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import data from './data';
import React, { useState, useEffect } from 'react';
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export default function QuestionnaireScreen({ navigation }) {
  const [answers, setAnswers] = useState();
  const [listQuestion, setListQuestion] = useState([]);
  const answersHandle = (key, value) => {
    let _answer = {}
    _answer[key] = value
    if (!answers) {
      setAnswers(_answer);
    } else {
      setAnswers({ ...answers, ..._answer });
    }

  }
  const checkAnswer = () => {
    let total = 0
    if (Object.keys(answers).length === data.length) {
       Object.keys(answers).forEach((key) => {
        if (answers[key] === data.find(item => item.question === key).answer) {
          total++
        }
      })
      navigation.navigate('Score', { score: total })
    }
  }
  useEffect(() => {
    let randomQuestion = shuffleArray(data);
    randomQuestion = randomQuestion.map(question => {
      question.chioces = shuffleArray(question.chioces)
      return question
    })
    setListQuestion(randomQuestion)
  }, [])

  const Viewlist = (props) => {
    if (!props?.questions) return <></>
    let listQuestion = props.questions.map((question,index) => {
      return (
        <View style={styles.question} key={index}>
          <Text >{question.question}</Text>
          {question.chioces.map((choice,index) => {
            return <View style={styles.chioces} key={index}>
              <Button
                onPress={() => answersHandle(question.question, choice)}
                title={choice}
              />
            </View>
          })}
        </View>
      )
    });
    return listQuestion
  }

  return (
    <View style={styles.container}>{
      listQuestion.length && <Viewlist questions={listQuestion} />
    }
      <View style={styles.submit}>
        <Button
          onPress={() => checkAnswer()}
          title={"Submit"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    marginTop: '20px'
  },
  chioces: {
    marginTop: '5px'
  },
  submit: {
    marginTop: '30px',
    marginBottom: '30px',
  }

});
