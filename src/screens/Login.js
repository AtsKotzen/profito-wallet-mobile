import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import React, {Component} from 'react';
import HathorHeader from '../components/HathorHeader';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HathorHeader withLogo />
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail ou Celular"
            placeholderTextColor="white"
            underlineColorAndroid="white"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="white"
            underlineColorAndroid="white"
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            color={'#fda800'}
            title={`Login`}
            onPress={login}
          />
          <Text style={styles.text}>Ainda não tem uma conta?</Text>
          <Text style={styles.link}>Cadastre-se</Text>
          <Text style={styles.profitoClub}>profito.club</Text>
        </View>
      </View>
    );
  }
}

const login = () => {
  alert('Botão Login clicado!')
  //this.props.navigation.navigate('MainScreen')
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    paddingTop: 50,
  },
  inputView: {
    paddingTop: 45,
  },
  textInput: {
    width: 200,
    color: 'white',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    paddingTop: 10,
  },
  profitoClub: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    alignSelf: 'center',    
    paddingTop: 30,
  },
  link: {
    color: '#fda800',
    alignSelf: 'center',
  },
  buttonView: {
    alignSelf: 'center',
    paddingTop: 5,
    width: 200
  },
});
