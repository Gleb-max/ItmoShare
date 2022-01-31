import { store } from 'redux/store';
import API from '../../api/server';

export const register = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: 'LOADING',
    });
    const formData = new FormData();
    formData.append('isuId', payload.isuId);
    formData.append('name', payload.name);
    formData.append('password', payload.password);

    // const body = {
    //   isuId: payload.isuId,
    //   name: payload.name,
    //   password: payload.password,
    // }

    API.post('api/v2/register', formData, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        // store.dispatch(login({
        //   isuId: payload.isuId,
        //   name: payload.name,
        //   password: payload.password,
        // }));

        const responseData = response.data;

        dispatch({
          type: 'LOADING_CANCEL',
        });
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: responseData.token,
          userData: responseData.data,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        let message;

        if (error.response == undefined) {
          message = 'Проверьте подключение к интернету';
        }
        else if (error.response && error.response.data.message != undefined) {
          message = error.response.data.message;
        }
        else if (error.response.status == 400) {
          message = 'Не все поля заполнены!';
        } 
        else message = 'Неизвестная ошибка';
        
        dispatch({
          type: 'LOADING_CANCEL',
        });
        dispatch({
          type: 'ERROR',
          errorMessage: message,
        });
      });
  };
};

export const login = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: 'LOADING',
    });
    const formData = new FormData();
    formData.append('isuId', payload.isuId);
    formData.append('password', payload.password);

    // const params = {
    //   isuId: payload.isuId,
    //   password: payload.password,
    // }

    API.post('api/v2/login', formData, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        const responseData = response.data;

        dispatch({
          type: 'LOADING_CANCEL',
        });
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: responseData.token,
          userData: responseData.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        let message;

        if (error.response == undefined) {
          message = 'Проверьте подключение к интернету';
        }
        else if (error.response && error.response.data.message != undefined) {
          message = error.response.data.message;
        }
        else if (error.response.status == 400) {
          message = 'Не все поля заполнены!';
        }
        else message = 'Неизвестная ошибка';

        dispatch({
          type: 'LOADING_CANCEL',
        });
        dispatch({
          type: 'ERROR',
          errorMessage: message,
        });
      });
  };
};

export const restore = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: 'LOADING',
    });
    const formData = new FormData();
    formData.append('isuId', payload.isuId);

    API.post('api/v2/restore', formData, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        dispatch({
          type: 'LOADING_CANCEL',
        });
      })
      .catch((error) => {
        let message;

        console.log(error);
        if (error.response == undefined) {
          message = 'Проверьте подключение к интернету';
        }
        else if (error.response && error.response.data.message != undefined) {
          message = error.response.data.message;
        }
        else if (error.response.status == 400) {
          message = 'Не все поля заполнены!';
        }
        else message = 'Неизвестная ошибка';

        dispatch({
          type: 'LOADING_CANCEL',
        });
        dispatch({
          type: 'ERROR',
          errorMessage: message,
        });
      });
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    dispatch({
      type: 'USER_LOGGED_OUT_SUCCESS',
    });
  };
};
