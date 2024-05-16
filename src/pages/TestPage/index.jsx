/** test page **/
import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import TestPage from './components/Test'

const { Cell } = ResponsiveGrid;

const TestPages = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="Clara test"
        />
      </Cell>

      <Cell colSpan={12}>
        <TestPage/>
      </Cell>
    </ResponsiveGrid>
  )
}

export default TestPages;

