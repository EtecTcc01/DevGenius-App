import { StyleSheet} from 'react-native';

//IMPORT DOS COMPONENTS A SEREM RENDERIZADOS
import { LogInForm } from '../../components/Forms/Logon';
import { SignInForm } from '../../components/Forms/Sign';
import { InfoForm } from '../../components/Forms/Info';

export function BeginForms({ route }) {
    const operation = route.params.operation //PASSANDO UM PARAMETRO RECEBIDO PELA ROTA

    //SWITCH P/DETERMINAR O TIPO DE OPERAÇÃO QUE REQUER UM FORM
    switch (operation) {
        case "Login":
            return <LogInForm />
        case "Register":
            return <SignInForm />
        case "Info":
            return <InfoForm user={route.params.user}/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});