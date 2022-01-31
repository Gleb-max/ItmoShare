import { useRoute } from '@react-navigation/native';
import { Item } from 'library/types/Item.interface';
import React from 'react';
import { connect } from 'react-redux';
import { error, errorCancel, loading, loadingCancel } from 'redux/actions';
import { store } from 'redux/store';

//views
import {ItemDetailsView} from './ItemDetails.view';

type ItemDetailsScreenProps = {
  token?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const ItemDetailsScreen: React.FC<ItemDetailsScreenProps> = ({
  token = '', 
  isLoading = false, 
  isError = false,
  errorMessage = '',
}) => {
  //navigation
	const route = useRoute();
	const params = route?.params as {item: Item};
	const item = params.item as Item;

  console.log(item);
  
  return <ItemDetailsView 
    token={token} 
    isLoading={isLoading}
    isError={isError} 
    errorMessage={errorMessage} 
    hideError={() => store.dispatch(errorCancel())}
    item={item} 
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

export default connect(mapStateToProps)(ItemDetailsScreen);
