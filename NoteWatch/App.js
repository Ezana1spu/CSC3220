import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from "./StackNavigator";
import * as SQLite from 'expo-sqlite'
import { useState, useEffect} from 'react';

export default function App() {

  this.db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Day (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, note TEXT)'
    ); // Create the Day table if it doesn't exist
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Run (id INTEGER PRIMARY KEY AUTOINCREMENT, dayId INTEGER, min INTEGER, sec INTEGER, msec INTEGER)'
    ); // Create the Run table if it doesn't exist
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Lap (id INTEGER PRIMARY KEY AUTOINCREMENT, runId INTEGER, min INTEGER, sec INTEGER, msec INTEGER)'
    ); // Create the Lap table if it doesn't exist
  });

  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
