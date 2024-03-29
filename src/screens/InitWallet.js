/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hathorLib from '@hathor/wallet-lib';

import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {t} from 'ttag';
import NewHathorButton from '../components/NewHathorButton';
import HathorHeader from '../components/HathorHeader';
import TextFmt from '../components/TextFmt';

import baseStyle from '../styles/init';
import {Link, str2jsx} from '../utils';

//import {PRIMARY_COLOR} from '../constants';

class WelcomeScreen extends React.Component {
  state = {switchValue: false};

  style = Object.assign(
    {},
    baseStyle,
    StyleSheet.create({
      switchView: {
        flexDirection: 'row',
      },
      switchText: {
        paddingLeft: 16,
        fontSize: 14,
        lineHeight: 18,
        flex: 1,
        color: '#E39B14',
      },
    }),
  );

  toggleSwitch = value => {
    this.setState({switchValue: value});
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#202020', paddingTop: 25}}>
        <HathorHeader withLogo />
        <View style={this.style.container}>
          <Text style={this.style.title}>{`Bem vindo a Profito Club!`}</Text>
          <View>
            <Text style={this.style.text}>
              {`Durante os próximos passos vamos criar sua carteira digital.`}
            </Text>
            <TextFmt style={this.style.text}>
              {`**Relaxe** enquanto configuramos tudo pra você!`}
            </TextFmt>
            <Text style={this.style.text}>
              {str2jsx(
                `Para maiores informações, acesse o nosso site |link:https://profitoclub.com|.`,
                {
                  link: (x, i) => (
                    <Link
                      key={i}
                      href="https://www.instagram.com/profitoclub//">
                      {x}
                    </Link>
                  ),
                },
              )}
            </Text>
          </View>
          <View style={this.style.switchView}>
            <Switch
              onValueChange={this.toggleSwitch}
              trackColor={{false: '#767577', true: '#E19B41'}}
              value={this.state.switchValue}
            />
            <Text style={this.style.switchText}>
              {`Entendo e aceito os termos`}
            </Text>
          </View>
          <View style={this.style.buttonView}>
            <NewHathorButton
              disabled={!this.state.switchValue}
              onPress={() => this.props.navigation.navigate('InitialScreen')}
              title={`Começar`}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

class InitialScreen extends React.Component {
  style = Object.assign({}, baseStyle);

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#202020'}}>        
          <HathorHeader withLogo />
          <View style={this.style.container}>
            <Text style={this.style.title}>{`Pronto.`}</Text>
            <TextFmt style={this.style.text}>
              {`Bem vindo à  **Profito Club**.`}
            </TextFmt>
            <TextFmt style={this.style.text}>
              {`Já estamos com tudo **configurado e seguro**.`}
            </TextFmt>
            <Text style={this.style.text}>
              {`A seguir exibiremos a sua frase de recuperação e iniciaremos a sua carteira.`}
            </Text>
            <View style={this.style.buttonView}>
              <NewHathorButton
                onPress={() =>
                  this.props.navigation.navigate('LoadWordsScreen')
                }
                title={t`Importar carteira`}
                style={{marginBottom: 16}}
                secondary
              />
              <NewHathorButton
                onPress={() => this.props.navigation.navigate('NewWordsScreen')}
                title={t`New Wallet`}
              />
            </View>
          </View>       
      </SafeAreaView>
    );
  }
}

class NewWordsScreen extends React.Component {
  state = {
    words: hathorLib.wallet.generateWalletWords(
      hathorLib.constants.HD_WALLET_ENTROPY,
    ),
  };

  style = Object.assign(
    {},
    baseStyle,
    StyleSheet.create({
      row: {
        flexDirection: 'row',
        flex: 0.5,
      },
      item: {
        flex: 1,
      },
      itemNumber: {
        color: '#fda800',
        fontSize: 14,
      },
      itemText: {
        color: '#fda800',
        fontSize: 15,
      },
    }),
  );

  render() {
    const wordsArr = this.state.words ? this.state.words.split(' ') : [];
    const wordsPerRow = 2;

    const renderWords = () => {
      const data = [];

      for (let i = 0; i < wordsArr.length / wordsPerRow; i += 1) {
        data.push(renderWordsRow(i));
      }
      return data;
    };

    const renderWordsRow = index => {
      const startIndex = index * wordsPerRow;
      const wordsToRender = wordsArr.slice(
        startIndex,
        startIndex + wordsPerRow,
      );

      const rows = wordsToRender.map((word, idx) => {
        const realIndex = startIndex + idx + 1;
        return (
          <View key={`word-${realIndex}`} style={this.style.item}>
            <Text>
              <Text style={this.style.itemNumber}>{realIndex}.</Text>
              <Text style={this.style.itemText}> {word}</Text>
            </Text>
          </View>
        );
      });

      return (
        <View key={`row-${index}`} style={this.style.row}>
          {rows}
        </View>
      );
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#202020'}}>
        <HathorHeader
          withLogo
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={this.style.container}>
          <View>
            <Text
              style={this.style.title}>{`Sua carteira foi criada!`}</Text>
            <TextFmt style={this.style.text}>
              {`Recomendamos **guardar as palavras** em um local **seguro**.`}
            </TextFmt>
          </View>
          {renderWords()}
          <View style={this.style.buttonView}>
            <NewHathorButton
              onPress={() =>
                this.props.navigation.navigate('BackupWords', {
                  words: this.state.words,
                })
              }
              title={`Avançar`}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

class LoadWordsScreen extends React.Component {
  state = {
    words: '',
    errorMessage: '',
    isValid: false,
  };

  numberOfWords = 24;

  style = Object.assign(
    {},
    baseStyle,
    StyleSheet.create({
      inputView: {
        marginTop: 16,
        marginBottom: 16,
      },
      label: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.5)',
        marginTop: 8,
        marginBottom: 8,
      },
      input: {
        fontSize: 16,
        lineHeight: 24,
        borderColor: '#EEEEEE',
        borderBottomWidth: 1,
      },
    }),
  );

  onChangeText = (text) => {
    const words = text.trim(/\s+/);
    let errorMessage = '';
    let isValid = false;
    if (words) {
      try {
        hathorLib.walletUtils.wordsValid(words);
        isValid = true;
      } catch (e) {
        if (e instanceof hathorLib.errors.InvalidWords) {
          errorMessage = e.message;
          if (e.invalidWords && e.invalidWords.length > 0) {
            errorMessage = `${errorMessage} List of invalid words: ${e.invalidWords.join(' ')}.`;
          }
        } else {
          throw e;
        }
      }
    }

    const wordsArr = words.split(/\s+/);
    const nonEmptyWords = wordsArr.filter(value => value.length !== 0);
    const nonEmptyWordsLowerCase = nonEmptyWords.map(value =>
      value.toLowerCase(),
    );
    this.setState({
      words: nonEmptyWordsLowerCase,
      errorMessage,
      isValid,
    });
  };

  loadClicked = () => {
    Keyboard.dismiss();
    const words = this.state.words.join(' ');
    this.setState({errorMessage: ''});
    const result = hathorLib.wallet.wordsValid(words);
    if (result.valid) {
      this.props.navigation.navigate('ChoosePinScreen', {words});
    } else {
      this.setState({errorMessage: result.message});
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, backgroundColor:'#202020'}}>
          <HathorHeader
            withLogo
            onBackPress={() => this.props.navigation.goBack()}
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={this.style.container}>
              <Text style={this.style.title}>{`Faça seu backcup`}</Text>
              <TextFmt style={this.style.text}>
                {`A seguir você pode ver as **${this.numberOfWords} palavras** que dão acesso à sua carteira.`}
              </TextFmt>
              <View style={this.style.inputView}>
                <Text style={this.style.label}>{t`Words`}</Text>
                <TextInput
                  style={this.style.input}
                  textAlignVertical="top"
                  onChangeText={this.onChangeText}
                  //placeholder={`chat impose eight usage kitten surround crumble antique hint reflect actual alley mutual fiscal quality shine quit thumb mouse trigger transfer item buddy poet`}
                  multiline
                  maxHeight="80%"
                  keyboardAppearance="dark"
                  returnKeyType="done"
                  enablesReturnKeyAutomatically
                  autoFocus
                  //onSubmitEditing={this.loadClicked}
                  blurOnSubmit                  
                />
                <Text style={this.style.label}>
                  {this.state.words.length}/{this.numberOfWords}
                </Text>
                <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
              </View>
              <View style={this.style.buttonView}>
                <NewHathorButton
                  onPress={this.loadClicked}
                  disabled={!this.state.isValid}
                  title={t`Next`}
                  style={{marginTop: 8}}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export {WelcomeScreen, InitialScreen, LoadWordsScreen, NewWordsScreen};
