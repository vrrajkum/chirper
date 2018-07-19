import React from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline';
import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';

const Tweet = props => {
  const { tweet } = props;

  if (!tweet) {
    return <p>"This tweet does not exist!"</p>;
  };

  const {
    name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
  } = tweet;

  const toParent = (e, id) => {
    e.preventDefault();
    // todo: redirect to parent tweet
  }

  const handleClick = (e) => {

  }

  return (
    <div className="tweet">
      <img
        src={avatar}
        className="avatar"
        title={name}
        alt={`Avatar of ${name}`}
      />
      <div className="tweet-info">
        <span>{name}</span>
        <div>{formatDate(timestamp)}</div>
        {parent && (
          <button className="replying-to" onClick={handleClick}>
            Replying to @{parent.author}
          </button>
        )}
        <p>{text}</p>
      </div>
      <div className="tweet-icons">
        <TiArrowBackOutline className="tweet-icon"/>
        <span>{replies !== 0 && replies}</span>
        <button className="heart-icon">
          {hasLiked
            ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
            : <TiHeartOutline className="tweet-icon" />}
        </button>
        <span>{likes !== 0 && likes}</span>
      </div>
    </div>
  );
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet ?
    formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    : null
  };
};

export default connect(mapStateToProps)(Tweet);
