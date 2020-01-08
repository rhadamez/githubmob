import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './Main/index'
import Header from './Header/index'

const Routes = createAppContainer(
    createStackNavigator({
        Header,
        Main
    }, {
        defaultNavigationOptions: {
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7159c1'
            },
            headerTintColor: '#FFF'
        }
    })
)

export default Routes