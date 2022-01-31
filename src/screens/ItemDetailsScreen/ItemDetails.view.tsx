import React from 'react';
import {View, StatusBar, ScrollView, Image} from 'react-native';

//styles
import styles from './ItemDetails.styles';

import { ErrorAlert, GilroyText, LoaderOverlay, StandardButton, RalewayText } from 'library/components';
import { Item } from 'library/types/Item.interface';
import { error, loading, loadingCancel } from 'redux/actions';
import { store } from 'redux/store';
import { apiConfig } from 'api/config';

type ItemDetailsViewProps = {
  	token: string,
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
	hideError: () => void;
	item: Item;
};

export const ItemDetailsView: React.FC<ItemDetailsViewProps> = ({token, isLoading, isError, errorMessage, hideError, item}) => {
  //state
	const [page, setPage] = React.useState(0);
	const [_item, setItem] = React.useState(item);

  
  //effect
	React.useEffect(() => {
		loadDetails();
	}, []);

  	const loadDetails = () => {
		store.dispatch(loading());

		fetch(`${apiConfig.baseUrl}api/v2/items/${item.id}`, {headers: {Authorization: `Bearer ${token}`}})
			.then(response => response.json())
			.then(responseJson => {
				setItem(responseJson);
				store.dispatch(loadingCancel());
			})
			.catch(err => {
				console.log(err)
				store.dispatch(loadingCancel());
				store.dispatch(error({message: 'Ошибка при загрузке'}));
		});
	}

	const getImageUri = (imageName: string) => {
		return {uri: `${apiConfig.baseUrl}static/img/${imageName}`}
	}

	const renderItem = React.useCallback(() => {
		return (
			<>
				<Image source={getImageUri(_item.image)} style={styles.image} />
				<View style={styles.contentContainer}>
					<GilroyText size={'g7'} type={'Semibold'} styleText={styles.header}>{_item.name}</GilroyText>
					<RalewayText size={'r5'} type={'Regular'}>{_item.description}</RalewayText>
					<StandardButton
						text={'Забронировать'}
						onPress={() => {}}
						style={styles.purchaseButton}
						reverse={true}
					/>
				</View>
			</>
		);
	}, [_item]);

  return (
    <ScrollView
		showsVerticalScrollIndicator={false}
		contentContainerStyle={styles.scrollContent}>
		{isLoading && <LoaderOverlay color={'#4647ed'} isTransparent={true} size={'large'} />}
		<ErrorAlert isShow={isError} onHide={hideError} message={errorMessage} />
		<View style={styles.container}>
			<StatusBar
				barStyle={'dark-content'}
				backgroundColor={'transparent'}
				translucent
			/>

		{renderItem()}

		</View>
	</ScrollView>
  );
};
