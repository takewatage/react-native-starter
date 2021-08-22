import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Avatar, Button, Divider, ListItem, Icon} from 'react-native-elements';
import Colors from '../../constants/Colors';
import mypageList, {Mypage, MypageItem} from "../../config/mypageList";
import Ripple from 'react-native-material-ripple'


export default function MyPageScreen () {

    const list:Mypage[] = mypageList

    const ListVieItem = (item: MypageItem, index: number) => {
            return (
                <Ripple onPressIn={() => console.log("press")}>
                    <ListItem key={index+1} bottomDivider
                              style={{paddingHorizontal: 10}}
                              containerStyle={{paddingHorizontal: 0, paddingVertical: 23}}>
                        <Icon type={item.iconType} name={item.icon} color={'#3E3E3E'} size={18}/>
                        <ListItem.Content>
                            <ListItem.Title style={{fontSize: 15, color: '#3E3E3E'}}>{item.title}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Ripple>
            )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'column'}}>
                <View style={styles.secProfile}>
                    <View style={{flexDirection: "row", marginBottom: 26}}>
                        <View style={{marginRight: 25}}>
                            <Avatar
                                size="xlarge"
                                rounded
                                containerStyle={styles.avatar}
                                source={{
                                    uri:
                                        'https://placehold.jp/90x90.png',
                                }}
                            />
                        </View>
                        <View style={{justifyContent:"center", flex:1}}>
                            <View>
                                <Text numberOfLines={1} style={[styles.myNameKana]}>タケウチ サキ</Text>
                            </View>
                            <Text numberOfLines={1} style={styles.myName}>竹内 咲</Text>
                            <View style={{flexDirection: 'row', alignItems: "center"}}>
                                <Image style={{width:14,height:14, marginRight:5}} resizeMode={'contain'}
                                       source={require('../../../assets/images/birthday-cake.png')} />
                                <Text style={styles.myBirth}>1995年2月12日 (26)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:"center"}}>
                        <Button
                            buttonStyle={{borderColor: '#8C8C8C', borderWidth: 1}}
                            style={{width: 156}}
                            titleStyle={{fontSize: 12, color:'#8C8C8C'}}
                            title="プロフィールを編集する"
                            type="outline"
                        />
                    </View>
                </View>

                <View style={{padding: 30}}>
                    <Divider />
                </View>

                <View style={styles.secNum}>
                    <View>
                        <Text style={styles.Num}>100%</Text>
                        <Text style={styles.NumTitle}>顧客満足度</Text>
                    </View>
                    <View style={{paddingHorizontal: 35}}>
                        <Text numberOfLines={1} style={styles.Num}>100000</Text>
                        <Text style={[styles.NumTitle]}>案件数</Text>
                    </View>
                    <View>
                        <Text style={styles.Num}>9999</Text>
                        <Text style={styles.NumTitle}>ペナルティ</Text>
                    </View>
                </View>

                <View style={styles.secPoint}>
                    <Text style={{fontWeight: 'bold', marginBottom: 21}}>換金可能なポイント</Text>
                    <Text numberOfLines={1} style={{fontSize: 31, fontWeight: 'bold', letterSpacing: 2, marginBottom: 20, maxWidth: 200 }}>
                        1,9999<Text style={{fontSize:12}}>ポイント</Text>
                    </Text>

                    <Button
                        buttonStyle={{borderColor: '#323232', borderWidth: 1}}
                        style={{width: 73}}
                        titleStyle={{fontSize: 12, color:'#323232'}}
                        title="換金する"
                        type="outline"
                    />
                </View>

                <View style={{paddingHorizontal: 30}}>
                    {
                        list.map((x: Mypage, i: any) => {

                            return (
                                <View key={i.toString()}>
                                    <Text style={styles.listTitle}>{x.title}</Text>
                                    {
                                        x.items.map((item: MypageItem) => {
                                            return ListVieItem(item, i)
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>

            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    secProfile: {
        justifyContent: 'center',
        paddingTop: 35,
        paddingLeft: 40,
        paddingRight: 15,
    },

    avatar: {
        /* preview */
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#fff",

        /* shadow */
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },

    myNameKana: {
        color: Colors.textSC,
        letterSpacing: 1.5,
        fontSize: 13,
        marginBottom: 5
    },

    myName: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 17
    },

    myBirth: {
        color: Colors.textSC,
        fontSize: 13,
    },

    secNum: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30
    },

    Num: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 16,
        letterSpacing: 2,
    },

    NumTitle: {
        fontSize: 13,
        color: Colors.textSC,
        textAlign: 'center',
    },

    secPoint: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#D2D2D2',
        backgroundColor: '#B0FFFA',
        paddingVertical: 30,
        paddingHorizontal: 60,
        flexDirection: 'column',
        alignItems: 'center'
    },

    listTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 25,
        marginTop: 43
    }

});
