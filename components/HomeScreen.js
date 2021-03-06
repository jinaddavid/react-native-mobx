import React from 'react';
import { ScrollView, StyleSheet, StatusBar, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { inject, observer } from 'mobx-react';

const Home = ({ navigation, homeStore }) => {
    const { refreshing, setValue } = homeStore;
    const handleRefresh = () => {
        setValue('refreshing', true);
        setTimeout(()=> {
            setValue('refreshing', false);
        }, 1000);
    }
    return (
        <React.Fragment>
            <StatusBar
                backgroundColor="#EC414D"
                barStyle="light-content"
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        title={"拼命加载中..."}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />} >
                <List containerStyle={styles.listStyle}>
                    {
                        homeStore.listData.map((item) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: item.avatar_url }}
                                subtitle={item.subtitle}
                                key={item.name}
                                title={item.name}
                                onPress={() => { navigation.navigate('DetailScreen') }}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    listStyle: {
        marginTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default inject('homeStore')(observer(Home));