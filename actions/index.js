import fetch from 'isomorphic-fetch';
import superagent from 'superagent';
import _ from 'lodash';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_LOGIN = "RECEIVE_LOGIN";

export const REQUEST_TRAVELLERS = "REQUEST_TRAVELLERS";
export const RECEIVE_TRAVELLERS = "RECEIVE_TRAVELLERS"

export const REQUEST_PATCH_DESTINATIONS = "REQUEST_PATCH_DESTINATIONS";
export const RECEIVE_PATCH_DESTINATIONS = "RECEIVE_PATCH_DESTINATIONS"

/**
 * requestLogin
 *
 * @public
 * @param username
 * @return {Object}
 */
function requestLogin(username) {
  return {
    type: REQUEST_LOGIN,
    username
  }
}

/**
 * receiveLogin
 *
 * @param username
 * @param data
 * @return {Object}
 */
function receiveLogin(data, err) {
  return {
    type: RECEIVE_LOGIN,
    data: data,
    err: err
  }
}

function _makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function callLogin(username) {
  return dispatch => {
    dispatch(requestLogin(username));
    return superagent
    .post('https://young-beyond-8772.herokuapp.com/auth')
    .type("form")
    .send({name: username})
    .end((err, response) => {
      dispatch(receiveLogin(response.body, err))
    })
  };
}

function shouldCallLogin(state, username) {
  if(!_.get(state, "currentUser.token")) {
    return true;
  }

  return false;
}

export function loginIfNeeded(username) {
  return (dispatch, getState) => {
    if (shouldCallLogin(getState(), username)) {
      return dispatch(callLogin(username));
    }
  };
}

/**
 *
 * ==================================================
 * ==================================================
 * ==================================================
 *
 */

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit));
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)));
  };
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
}
