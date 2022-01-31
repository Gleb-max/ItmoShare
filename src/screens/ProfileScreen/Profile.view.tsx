import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  processColor,
} from 'react-native';

//components
import {
  StandardButton,
  FunctionButtonItem,
  GilroyText,
  SMIcons,
} from 'library/components';

import {launchCamera, launchImageLibrary, MediaType} from 'react-native-image-picker';

//styles
import styles from './Profile.styles';
import { RadarChart } from 'react-native-charts-wrapper';
import { apiConfig } from 'api/config';

//types
type ProfileViewProps = {
  userData: {
    id: string;
    isuid: string;
    name: string;
    photo: string;
    role: string;
  };
  token: string;
  onAchievements: () => void;
  onPurchases: () => void;
  onNotification: () => void;
  onLogout: () => void;
  setProfilePhoto: (value: string) => void;
};

export const ProfileView: React.FC<ProfileViewProps> = ({
  userData,
  token,
  onLogout,
  onAchievements,
  setProfilePhoto,
  onNotification,
  onPurchases,
}) => {
  //state

  //callbacks
  const pickImageCallBack = (image: any) => {
    if (!image.didCancel) {
      console.log(image);
      setProfilePhoto(image.assets.uri);
    }
  }

  const addImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
    }, pickImageCallBack)
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHead}>
          <TouchableOpacity onPress={addImage}>
            <Image source={{ uri: userData.photo }} style={styles.photo} />
          </TouchableOpacity>

          <GilroyText size="g15" styleText={styles.name} type="Semibold">
            {userData.name}
          </GilroyText>

          <TouchableOpacity onPress={() => {}} style={styles.notificationButton}>
            <SMIcons name={'ic_notification'} size={30} color={'#1A1D5B'} />
          </TouchableOpacity>
        </View>
        <View>
          <FunctionButtonItem
            header={'История аренды'}
            iconName={'ic_flag'}
            iconColor={'#fe7062'}
            onPress={() => {}}
            style={styles.functionButton}
          />

          {/* <FunctionButtonItem
            header={'Покупки'}
            iconName={'ic_purchases'}
            iconColor={'#fe7062'}
            onPress={onPurchases}
            style={styles.functionButton}
          /> */}
        </View>

        {/* <RadarChart
          style={styles.chart}
          data={_data}
          xAxis={xAxis}
          highlights={[]}
          yAxis={{ enabled: false }}
          chartDescription={{ text: '' }}
          legend={legend}
          drawWeb={true}
          marker={{enabled: false}}
          webLineWidth={5}
          webLineWidthInner={5}
          webAlpha={255}
          webColor={processColor("#1A1D5B")}
          webColorInner={processColor("#1A1D5B")}
          onSelect={() => {}}
        /> */}
      
        <StandardButton
          text={'Выйти'}
          reverse={true}
          onPress={onLogout}
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
};
