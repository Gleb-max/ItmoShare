import React from 'react';
import { Image, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

//components
import { GilroyText, MontserratText, SMIcons } from 'library/components/atoms';

//styles
import styles from './ItemCard.styles';
import { apiConfig } from 'api/config';
import { Item } from 'library/types/Item.interface';

//types
type ItemCardProps = {
	item: Item;
	onPress: (item: Item) => void;
	style?: StyleProp<ViewStyle>
};

export const ItemCard: React.FC<ItemCardProps> = ({
	item,
	onPress,
	style,
}) => {
	const getImageUri = (imageName: string) => {
		return {uri: `${apiConfig.baseUrl}static/img/${imageName}`}
	}

	return (
		<TouchableOpacity
			style={[styles.container, style]}
			onPress={() => onPress(item)}
		>
			<View style={styles.contentContainer}>
				<Image source={getImageUri(item.image)} style={styles.image} />
				<GilroyText size={'g5'} type={'Semibold'} numberOfLines={1} ellipsizeMode={'tail'} styleText={styles.header}>{item.name}</GilroyText>
			</View>
		</TouchableOpacity>
	);
};
