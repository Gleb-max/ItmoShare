import { Helpers } from 'library/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		marginTop: 23,
		marginBottom: 7,
		...Helpers.boxShadow('rgba(0, 0, 0, 0.04)', { x: 10, y: 20 }, 100, 0.1, 4),
	},
	contentContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	moreButton: {
		marginTop: 27,
	},
	header: {
		color: '#1A1D5B',
		marginStart: 10,
	},
	image: {
		height: undefined,
		width: 100,
		alignSelf: 'center',
		aspectRatio: 1,
	},
	dateText: {
		alignSelf: 'flex-end',
		marginEnd: 10,
		color: '#4647ed',
	},
});

export default styles;
