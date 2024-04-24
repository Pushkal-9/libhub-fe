import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
// Ensure the components below exist and are properly imported
import CustomBarChart from '../CustomBarChart';
import PopularBooksPieChart from '../PopularBooksPieChart';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const ManageBooks = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const menuItems = [
    { key: '1', label: 'Add Book', content: <AddBook /> },
    { key: '2', label: 'Update Book', content: <UpdateBook /> },
    { key: '3', label: 'Delete Book', content: <DeleteBook /> },
    { key: '4', label: 'Add Item', content: <AddItem /> },
    { key: '5', label: 'Update Item', content: <UpdateBook /> },
    { key: '6', label: 'Delete Item', content: <DeleteItem /> }
  ];

  const chartItems = {
    key: 'charts',
    label: 'Charts',
    children: [
      { key: '7', label: 'Checkouts/Day', content: <CustomBarChart /> },
      { key: '8', label: 'Popular Books', content: <PopularBooksPieChart /> },
    ],
  };

  const onMenuChange = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    const item = [...menuItems, ...chartItems.children].find(
      (item) => item.key === selectedKey
    );
    return item ? item.content : null;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={onMenuChange}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
          <SubMenu key={chartItems.key} title={chartItems.label}>
            {chartItems.children.map((chartItem) => (
              <Menu.Item key={chartItem.key}>{chartItem.label}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{renderContent()}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageBooks;