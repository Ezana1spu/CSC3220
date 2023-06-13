import  React, {Component} from 'react';
import {useNavigation} from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button} from 'react-native';
import ListComponent from "./list.component";
import * as SQLite from 'expo-sqlite'
import { useState, useEffect} from 'react';

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

class StopwatchContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            min: 0,
            sec: 0,
            msec: 0
        }

        this.newRun = 0;
        this.runID = null;

        this.lapArr = [];
        this.interval = null;
    }

    handleToggle = () => {

        if (this.newRun == 0) {
            this.newRun = 1;
        
            this.interval = null;
        }

        this.setState(
            {
                start: !this.state.start
            },
            () => this.handleStart()
        );
    };

    handleLap = (min, sec, msec) => {
        this.lapArr = [
            ...this.lapArr,
            {min, sec, msec}
        ]

    };

    handleStart = () => {
        if (this.state.start) {
            this.interval = setInterval(() => {
                if (this.state.msec !== 99) {
                    this.setState({
                        msec: this.state.msec + 1
                    });
                } else if (this.state.sec !== 59) {
                    this.setState({
                        msec: 0,
                        sec: ++this.state.sec
                    });
                } else {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: ++this.state.min
                    });
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
        marginLeft: 20,
        display: "flex",
        flexDirection: "row",
        color: '#0A66F5',
        backgroundColor: '#black',
        //paddingLeft: "3%",
        //paddingRight: "0%",
        paddingTop: "1%",
        paddingBottom: "1%",
        //maxWidth: "70%"
    },

    child: {
      fontSize: 60,
      fontWeight: "bold",
      color: "#0A66F5",
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "20%",
        marginBottom: "10%"
    },

    button: {
        backgroundColor: '#0A66F5',
        paddingTop: "4%",
        paddingLeft: "5%",
        paddingRight: "5%",
        display: "flex",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#0A66F5',
        height: 60,
    },

    buttonText: {
        color: "#fff",
        fontSize: 20,
        alignSelf: "center"
    },
});

export default StopwatchContainer;