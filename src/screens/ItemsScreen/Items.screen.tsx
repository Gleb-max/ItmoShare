import { useNavigation } from '@react-navigation/native';
import { Item } from 'library/types/Item.interface';
import React from 'react';
import { connect } from 'react-redux';
import { errorCancel } from 'redux/actions';
import { store } from 'redux/store';

//views
import {ItemsView} from './Items.view';

type ItemsScreenProps = {
  token?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const ItemsScreen: React.FC<ItemsScreenProps> = ({
  token = '', 
  isLoading = false, 
  isError = false,
  errorMessage = '',
}) => {
  //navigation
	const navigation = useNavigation();

	const onPressItem = React.useCallback((item: Item) => {
		navigation.navigate('item_details', {
			item: item,
		});
	}, [navigation]);

  return <ItemsView 
    token={token} 
    isLoading={isLoading}
    isError={isError} 
    errorMessage={errorMessage} 
    hideError={() => store.dispatch(errorCancel())} 
    onPressItem={onPressItem}
  />;
};

const mapStateToProps = (state: any) => {
  return {
    token: state.authReducer.authData.token || '',
    isLoading: state.loadingReducer.isLoading || false,
    isError: state.errorReducer.isError || false,
    errorMessage: state.errorReducer.errorMessage || '',
  };
};

export default connect(mapStateToProps)(ItemsScreen);
