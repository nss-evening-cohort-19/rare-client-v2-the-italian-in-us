import React, { useEffect, useState } from 'react';
import {
  Popover, OverlayTrigger, Button, Image,
} from 'react-bootstrap';
import { getReactions } from '../utils/data/reactions';
import { useAuth } from '../utils/context/authContext';

function Reactions() {
  const [reactions, setReactions] = useState([]);
  const { user } = useAuth();

  const getTheContent = () => {
    getReactions().then(setReactions);
  };

  const handleClick = (e) => {
    console.warn(e.target.id);
    console.warn(user.id);
  };

  useEffect(() => {
    getTheContent();
  }, []);
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={(
          <Popover>
            <Popover.Body className="reactions-container">
              {reactions.map((reaction) => (
                <Image className="reactions" type="button" onClick={handleClick} id={reaction.id} src={reaction.imageUrl} />
              ))}

            </Popover.Body>
          </Popover>
            )}
      >
        <Button variant="secondary">Reactions</Button>
      </OverlayTrigger>
    </>
  );
}

export default Reactions;
