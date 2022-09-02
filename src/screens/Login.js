import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import React, { Component } from 'react'
import HathorHeader from '../components/HathorHeader';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HathorHeader withLogo />
        <TextInput
          style={styles.textInput}          
          placeholder='E-mail ou Celular'
          placeholderTextColor='white'
          underlineColorAndroid='white'         
        />
        <TextInput
          style={styles.textInput}          
          placeholder='Senha'
          placeholderTextColor='white'
          underlineColorAndroid='white'         
        />
        <Button
        style={styles.button}
        color={'#fda800'}        
        title={`Login`}
        onPress={() => this.props.navigation.navigate('MainScreen')}
        />
        <Text style={styles.text}>Ainda não tem uma conta?</Text>
        <Text style={styles.link}>Cadastre-se</Text>
        <Text style={styles.info}>profito.club</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',    
  }, 
  textInput: {
    width: 200,
    color: 'white',      
  },
  text: {
    color: 'white'
  },
  info: {
    color: 'white'
  },
  link: {
    color: '#fda800'
  }
})