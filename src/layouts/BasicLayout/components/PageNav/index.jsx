import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'ice';
import { Nav } from '@alifd/next';
import { asideMenuConfig } from '../../menuConfig';

const { SubNav } = Nav;
const NavItem = Nav.Item;

const AUTH_CONFIG = {
  admin: true,
  guest: false,
};

function getNavMenuItems(menusData, initIndex, auth) {
  if (!menusData) {
    return [];
  }

  return menusData.filter((item) => {
    let roleAuth = true;

    if (auth && item.auth && item.auth instanceof Array) {
      if (item.auth.length) {
        roleAuth = item.auth.some((key) => auth[key]);
      }
    }

      return item.name && !item.hideInMenu && roleAuth;
    }).map((item, index) => {
      return getSubMenuOrItem(item, `${initIndex}-${index}`, auth);
    });
}

function getSubMenuOrItem(item, index, auth) {
  if (item.children && item.children.some((child) => child.name)) {
    const childrenItems = getNavMenuItems(item.children, index, auth);

    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav key={item.name} icon={item.icon} label={item.name}>
          {childrenItems}
        </SubNav>
      );
      return subNav;
    }

    return null;
  }

  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>{item.name}</Link>
    </NavItem>
  );
  return navItem;
}

const Navigation = (props, context) => {
  const [openKeys, setOpenKeys] = useState([]);
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  useEffect(() => {
    const curSubNav = asideMenuConfig.find((menuConfig) => {
      return menuConfig.children && checkChildPathExists(menuConfig);
    });

    function checkChildPathExists(menuConfig) {
      return menuConfig.children.some((child) => {
        return child.children ? checkChildPathExists(child) : child.path === pathname;
      });
    }

    if (curSubNav && !openKeys.includes(curSubNav.name)) {
      // console.log('...openKeys', ...openKeys)
      setOpenKeys([...openKeys, curSubNav.name]);
    }
  }, [pathname]);

  return (
    <Nav
      type="normal"
      openKeys={openKeys}
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      embeddable
      activeDirection="right"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
      onOpen={(keys) => {
        setOpenKeys(keys);
      }}
    >
      {getNavMenuItems(asideMenuConfig, 0, AUTH_CONFIG)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};
const PageNav = withRouter(Navigation);
export default PageNav;
