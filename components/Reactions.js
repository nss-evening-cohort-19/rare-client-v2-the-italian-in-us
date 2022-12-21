/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import {
  Popover, OverlayTrigger, Button,
} from 'react-bootstrap';
import {
  createPostReaction, deletePostReaction, getPrForDelete, getReactions,
} from '../utils/data/reactions';
import { useAuth } from '../utils/context/authContext';

function Reactions() {
  const [reactions, setReactions] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getReactions(1, 1).then(setReactions);
  };

  const handleClick = (e) => {
    const { value, id } = e.target;
    if (value === 'true') {
      getPrForDelete(id, 1, user.id).then((postReaction) => {
        deletePostReaction(postReaction[0].id).then(() => getTheContent());
      });
    } else {
      const postReaction = {
        postId: 1,
        userId: user.id,
        reactionId: id,
      };
      createPostReaction(postReaction).then(() => getTheContent());
    }
  };

  useEffect(() => {
    getTheContent();
  }, []);

  return (
    <div className="reactions-container">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={(
          <Popover>
            <Popover.Body className="reactions-dropdown">
              {reactions.map((reaction) => (
                <input className="reactions" type="image" key={reaction.id} onClick={handleClick} value={reaction.clicked} id={reaction.id} src={reaction.imageUrl} />
              ))}

            </Popover.Body>
          </Popover>
            )}
      >
        <Button variant="secondary">Reactions</Button>
      </OverlayTrigger>
      <div className="reactions-display">
        {reactions.map((reaction) => (
          <><input className={`display-reactions ${reaction.count === 0 ? 'no-show' : ''}`} type="image" onClick={handleClick} key={reaction.id} id={reaction.id} src={reaction.imageUrl} value={reaction.clicked} /><span className={`reaction-counter ${reaction.count === 0 ? 'no-show' : ''}`}>{reaction.count}</span></>
        ))}
      </div>
    </div>
  );
}

export default Reactions;
