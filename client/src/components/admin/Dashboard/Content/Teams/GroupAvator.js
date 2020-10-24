import React from 'react';
import {Avatar,Tooltip} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function GroupAvator() {
  return (
    <AvatarGroup max={4}>
      <Tooltip title="Name">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Tooltip>
      <Tooltip title="Name">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </Tooltip>
      <Tooltip title="Name">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
      </Tooltip>
      <Tooltip title="Name">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />
      </Tooltip>
      <Tooltip title="Name">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />
      </Tooltip>
    </AvatarGroup>
  );
}
