import React from 'react';
import { Keyboard, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'

import {
    Container, Form, Input,
    SubmitButton, List, User, Avatar,
    Name, Bio, ProfileButton, ProfileButtonText
} from './styles'

export default class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            newUser: '',
            users: [],
            loading: false
        }

        this.handleNavigate = this.handleNavigate.bind(this)
        this.handleAddUser = this.handleAddUser.bind(this)
    }

    async componentDidMount() {
        const users = await AsyncStorage.getItem('users')

        if (users) {
            this.setState({ users: JSON.parse(users) })
        }
    }

    componentDidUpdate(_, prevState) {
        const { users } = this.state

        if (prevState.users !== users) {
            AsyncStorage.setItem('users', JSON.stringify(users))
        }
    }

    async handleAddUser() {
        const { users, newUser } = this.state
        this.setState({ loading: true })
        const response = await api.get(`/users/${newUser}`)

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url
        }

        this.setState({
            users: [...users, data],
            newUser: '',
            loading: false
        })

        Keyboard.dismiss()
    }

    handleNavigate(user) {
        const { navigation } = this.props

        navigation.navigate('User', { user })
    }

    render() {

        const { users, newUser, loading } = this.state

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton loading={loading} onPress={this.handleAddUser}>
                        {loading ? (<ActivityIndicator color="#FFF" />)
                            : (<Icon name="add" size={20} color="#FFF" />)}
                    </SubmitButton>
                </Form>
                <List
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({ item }) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => this.handleNavigate(item)}>
                                <ProfileButtonText>Ver perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )} />

            </Container>
        )
    }

};

Main.navigationOptions = {
    title: 'Usuários'
}