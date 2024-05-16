import * as React from 'react';
import { history } from 'ice';
import auth from '@/utils/auth';
import { Avatar, Overlay, Menu, Icon } from '@alifd/next';
import styles from './index.module.css';
import defaultAvatar from '@/assets/imgs/default.png'


const { Item } = Menu;
const { Popup } = Overlay;


const UserProfile = ({ username, avatar, orgName }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={defaultAvatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{username}</h4>
        <span>{orgName}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props) => {
  const { userInfo } = props;

  function handleLogout(){
    localStorage.clear();
    auth.removeAutoLogin();
    auth.removeToken();
    history.push('/iClean');
  }

  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <span style={{ marginLeft: 10 }}>

          </span>
        </div>
      }
      triggerType="click">
      <div className={styles.avatarPopup}>
        <Menu className={styles.menu}>
          <Item onClick={ ()=> { handleLogout() } }>
            <Icon size="small" type="exit" />
            退出
          </Item>
        </Menu>
      </div>
    </Popup>
  );
};

export default HeaderAvatar;
