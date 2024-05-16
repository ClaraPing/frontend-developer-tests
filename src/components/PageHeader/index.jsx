import * as React from 'react';
import { Breadcrumb, Box, Typography ,Button} from '@alifd/next';
import styles from './index.module.css';

const PageHeader = (props) => {
  const { breadcrumbs, title, description, operationButton, ...others } = props;
  /** 操作按钮点击事件 **/
  function handleOnClick(type, interfaceUrl){
    /** 清除报告页的点击click **/
    props.handleExport();
    // console.log('type:',type)
    // console.log('interfaceUrl: ',interfaceUrl)
  }

  return (
    <Box spacing={8} className={styles.pageHeader} {...others}>
      {
        title && <Typography.Text className={styles.title}>{title}</Typography.Text>
      }

      {
        breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumb className={styles.breadcrumbs} separator=" / ">
            {breadcrumbs.map((item, idx) => (
              <Breadcrumb.Item key={idx} link={item.path}>
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        ) : null
      }

      {
        description &&
        <Typography.Text className={styles.description}>{description}</Typography.Text>
      }

      {
        operationButton &&
        <Box direction="row" justify="flex-end" spacing={0}>
          <Button onClick={handleOnClick} className={styles.operationButton} type="primary">
            { operationButton }
          </Button>
        </Box>
      }
    </Box>
  );
};

export default PageHeader;
