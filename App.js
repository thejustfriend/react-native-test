import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionnaireScreen from './QuestionnaireScreen';
import Score from './Score';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="score">
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Score" component={Score} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
