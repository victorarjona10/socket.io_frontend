import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;    
    Profile: {user: { id: number; name: string; email: string; phone: string; website: string }};
    };

export type screenProps = NativeStackScreenProps<RootStackParamList>;