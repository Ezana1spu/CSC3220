import {useNavigation} from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button} from 'react-native';
import ListComponent from "./list.component";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect, Component} from 'react';

let padToTwo = (number) => (number <= 9 ? `0${number}` : number);

function openDatabase() {
  const db = SQLite.openDatabase("myDB.db");
  return db;
}

const db = openDatabase();

class StopwatchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      sec: 0,
      msec: 0,
      start: false
    };

    this.newRun = 0;
    this.runID = null;
    this.lapArr = [];

    this.interval = null;
  }

  componentDidMount() {
    this.initializeDatabase();
  }

  initializeDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Day (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, note TEXT)',
        [],
        () => console.log('Day table created successfully'),
        (error) => console.log('Day table creation error:', error)
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Run (id INTEGER PRIMARY KEY AUTOINCREMENT, dayId INTEGER, min INTEGER, sec INTEGER, msec INTEGER)',
        [],
        () => console.log('Run table created successfully'),
        (error) => console.log('Run table creation error:', error)
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Lap (id INTEGER PRIMARY KEY AUTOINCREMENT, runId INTEGER, min INTEGER, sec INTEGER, msec INTEGER)',
        [],
        () => console.log('Lap table created successfully'),
        (error) => console.log('Lap table creation error:', error)
      );
    });
  };

  handleToggle = () => {
    if (this.newRun === 0) {
      this.newRun = 1;
      this.insertRun();
      this.interval = null;
    }

    this.setState(
      (prevState) => ({
        start: !prevState.start
      }),
      () => this.handleStart()
    );
  };

  handleLap = () => {
    const { min, sec, msec } = this.state;
    this.insertLap(min, sec, msec);
  };

  handleStart = () => {
    if (this.state.start) {
      this.interval = setInterval(() => {
        if (this.state.msec !== 99) {
          this.setState((prevState) => ({
            msec: prevState.msec + 1
          }));
        } else if (this.state.sec !== 59) {
          this.setState((prevState) => ({
            msec: 0,
            sec: prevState.sec + 1
          }));
        } else {
          this.setState((prevState) => ({
            msec: 0,
            sec: 0,
            min: prevState.min + 1
          }));
        }
      }, 1);
    } else {
      clearInterval(this.interval);
    }
  };

  handleReset = () => {
    this.setState({
      min: 0,
      sec: 0,
      msec: 0,
      start: false
    });

    clearInterval(this.interval);

    this.lapArr = [];

    if (this.newRun === 1) {
      this.newRun = 0;
      this.insertRun();
    }
  };

  insertRun = () => {
    const { min, sec, msec } = this.state;

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Run (dayId, min, sec, msec) VALUES (?, ?, ?, ?)',
        [this.runID, min, sec, msec],
        (txObj, resultSet) => {
          console.log('Run inserted successfully');
          this.runID = resultSet.insertId;
        },
        (error) => console.log('Run insertion error:', error)
      );
    });
  };

  insertLap = (min, sec, msec) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Lap (runId, min, sec, msec) VALUES (?, ?, ?, ?)',
        [this.runID, min, sec, msec],
        (txObj, resultSet) => console.log('Lap inserted successfully'),
        (error) => console.log('Lap insertion error:', error)
      );
    });
  };

    render(){
        return(
            <View style={styles.container}>

                <View style={styles.parent}>
                    <Text style={styles.child}>{'  '+ padToTwo(this.state.min) + ' : '}</Text>
                    <Text style={styles.child}>{padToTwo(this.state.sec) + ' : '}</Text>
                    <Text style={styles.child}>{padToTwo(this.state.msec)}</Text>
                </View>



                <View style={styles.buttonParent}>
                    <TouchableOpacity style={styles.button} onPress={this.handleReset}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleToggle}>
                        <Text style={styles.buttonText}>{!this.state.start? 'Start': 'Stop'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>this.handleLap(this.state.min, this.state.sec, this.state.msec)} disabled={!this.state.start}>
                        <Text style={styles.buttonText}>Lap</Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.list}>
                <ListComponent lap={this.lapArr} />
            </View>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    list:{
        flex:0,
        marginBottom: 80,
    },
    button1:{
        marginTop: 80,
        marginBottom: 0,
        marginLeft: 90,
        marginRight: 90,
        borderWidth: 10,
        textAlign: 'center',
        fontSize: 40,
        backgroundColor: 'red',
        borderColor: 'red',
    },
    button2:{
        flex: 0,
    },
    parent: {
        marginTop: 50,
        marginLeft: 40,
        marginRight: 40,
        display: "flex",
        flexDirection: "row",
        borderColor: "#000",
        backgroundColor: 'black',
        //paddingLeft: "3%",
        //paddingRight: "0%",
        paddingTop: "1%",
        paddingBottom: "1%",
        //maxWidth: "70%"
    },

    child: {
      fontSize: 56,
      color: "white",
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "20%",
        marginBottom: "10%"
    },

    button: {
        backgroundColor: "#111",
        paddingTop: "4%",
        paddingLeft: "5%",
        paddingRight: "5%",
        display: "flex",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#fff",
        height: 60,
    },

    buttonText: {
        color: "#fff",
        fontSize: 20,
        alignSelf: "center"
    },
});

export default StopwatchContainer;