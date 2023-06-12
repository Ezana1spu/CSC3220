import React from "react"
import {useNavigation} from "@react-navigation/native";
import {View, Text, SafeAreaView, Button, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView} from "react-native";

const Notes = () => {
    const navigation = useNavigation();
    return (
        <View style={style.main}>
            <View style={style.Top}>
                 <TouchableOpacity onPress={() => navigation.navigate("Stopwatch")}>
                    <View>
                        <Text style={style.button1}>Stop</Text>
                    </View>
                </TouchableOpacity> 

                <Text style={style.date} >00/00/00</Text>

                <Text style={style.calender}>calender</Text>
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
        flex:5,
    },
    noteBox:{
        flex:1,
        borderWidth: 5,
        borderColor: "red",
    }
})

export default Notes