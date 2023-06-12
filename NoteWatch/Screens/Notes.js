import React, {useState, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {View, Text, SafeAreaView, Button, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"

const Notes = () => {
    const navigation = useNavigation();

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [tableDate, settableDate] = useState (date.toDateString());
    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    }
    const onChange = ({type}, selectedDate) => {
        if (type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate);
            //get info from Database
            //toggleDatepicker();
        }else{
            toggleDatepicker();
        }
    } 

    const confirmDate = () => {
        settableDate(date.toDateString());
        toggleDatepicker();
    }

    return (
        <View style={style.main}>
            <View style={style.Top}>
                 <TouchableOpacity onPress={() => navigation.navigate("Stopwatch")}>
                    <View>
                        <Text style={style.button1}>Stop</Text>
                    </View>
                </TouchableOpacity> 


                <View>
                    {showPicker &&(
                        <DateTimePicker mode="date" display="spinner" value={date} onChange={onChange} style ={style.buttonDate}/>
                    )}
                    {showPicker &&(
                        <View style={{flexDirection:"row", justifyContent: "space-around"}}>
                            <TouchableOpacity onPress={toggleDatepicker}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmDate}>
                                <Text>Confirm</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                    {!showPicker &&(
                        <TouchableOpacity onPress={toggleDatepicker}>
                            <TextInput style={style.calender1} placeholder="date" onChangeText={settableDate} value={tableDate} editable={false} onPressIn={toggleDatepicker}/>
                        </TouchableOpacity>
                    )}
                </View>
            
{/*                 {showPicker &&(
                    <DateTimePicker mode="date" value ={date} display="spinner" onChange={onChange}/>
                )} 

                {showPicker &&(
                    <TouchableOpacity onPress={toggleDatepicker}>
                        <TextInput style={style.calender1} placeholder={date} value={date} editable={false} />
                    </TouchableOpacity> 
                )} */}
                {/* <Text style={style.calender}>calender</Text> */}
            </View>


            <View style={style.runBox}>
                {/* <FlatList
                    data = {}
                    renderItem={({ }) => (
                        <TouchableOpacity style={style.list}>
                            <Text></Text>
                        </TouchableOpacity>
                    )}
                /> */}
            </View>

            <View style={style.noteContainer}>
                <ScrollView style={style.noteBox}>
                    <TextInput multiline={true}> Type here
                    </TextInput>
                </ScrollView>
       
            </View> 
        </View>
    )
}
const style = StyleSheet.create({
    main:{
        flex:10,
        fontSize: 40,
        borderRadius: 30,
    },
    
    Top:{
        flex:1,
        flexDirection: "row",
        padding: 20,
        alignItem: 'center',
        justifyContent: 'space-between',
    },
    button1:{
        flex:1,
        marginTop: 50,
        padding: 20,
        backgroundColor: 'red',
    },
    calender1:{
        marginTop: 50,
    },
    buttonDate:{
        height: 120,
        marginTop: 10,
    },
    date:{
        flex:3,
        borderWidth: 1,
        fontSize: 35,
        marginTop: 50,
        padding: 10,
        //backgroundColor: 'blue',
        textAlign: 'center',
    },
    calender:{
        textAlign: 'right',
        flex:1,
        marginTop: 50,
        padding: 20,
        //backgroundColor: 'green',
    },

    runBox:{
        flex: 2,
        padding: 10,
        backgroundColor: 'blue',
    },
    list:{

    },
    noteContainer:
    {
        flex:2,
    },
    noteBox:{
        flex:1,
        borderWidth: 5,
        borderColor: "red",
    }
})

export default Notes