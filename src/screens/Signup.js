import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import React, {Component} from 'react';
import HathorHeader from '../components/HathorHeader';
import NavigationService from '../NavigationService';

export default class Signup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HathorHeader withLogo />
        <Text style={styles.text}>Este é seu primeiro acesso.</Text>
        <Text style={styles.text}>Cadastre-se para continuar</Text>
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
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            color={'#fda800'}
            title={`Criar conta`}
            onPress={signup}
          />
          <Text style={styles.text}>Ainda não tem uma conta?</Text>
          <Text style={styles.link}>Cadastre-se</Text>
          
        </View>
      </View>
    );
  }
}

const signup = () => {
  NavigationService.navigate('WelcomeScreen')
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',    
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
    color: '#fda800',
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
