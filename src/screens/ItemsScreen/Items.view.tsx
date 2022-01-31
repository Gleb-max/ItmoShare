import React from 'react';
import {View, StatusBar, ScrollView, Text, FlatList} from 'react-native';

//styles
import styles from './Items.styles';

import { ErrorAlert, ItemCard, LoaderOverlay } from 'library/components';
import { Item } from 'library/types/Item.interface';
import { error, loading, loadingCancel } from 'redux/actions';
import { store } from 'redux/store';
import { apiConfig } from 'api/config';

type ItemsViewProps = {
  token: string,
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
	hideError: () => void;
	onPressItem: (item: Item) => void,
};

export const ItemsView: React.FC<ItemsViewProps> = ({token, isLoading, isError, errorMessage, hideError, onPressItem}) => {
  //state
	const [page, setPage] = React.useState(1);
	const [data, setData] = React.useState([]);

	//effect
	React.useEffect(() => {
		loadData();
	}, []);

  const loadData = () => {
		store.dispatch(loading());

		loadItems();
	}

  const loadItems = () => {
    fetch(`${apiConfig.baseUrl}api/v2/items?page=${page}`, {headers: {Authorization: `Bearer ${token}`}})
          .then(response => response.json())
          .then(responseJson => {
			  console.log(responseJson);
			  setData([...data, ...responseJson.items]);
			  if (responseJson.items.length !== 0) setPage(page + 1)
			  store.dispatch(loadingCancel());
          })
          .catch(err => {
			      store.dispatch(loadingCancel());
			      store.dispatch(error({message: 'Ошибка при загрузке'}));
          });
  }

  //renders
	const _renderListItem = React.useCallback(({ item, index }) => {
		return (
			<ItemCard
				item={item}
				onPress={() => onPressItem(item)}
				key={index}
				style={styles.card} />
		);
	}, [data]);

  return (
    <>
	{isLoading && <LoaderOverlay isTransparent={true} size={'large'} />}
	<ErrorAlert isShow={isError} onHide={hideError} message={errorMessage} />
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <FlatList<Item>
		data={data}
		renderItem={_renderListItem}
		keyExtractor={(item: Item, index: number) => item.id}
		showsVerticalScrollIndicator={false}
		contentContainerStyle={styles.flatListContainer}
		onEndReached={loadData}
        onEndReachedThreshold ={0.5} />
    </View>
	</>
  );
};
